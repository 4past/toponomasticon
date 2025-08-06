import { serveDir } from "$deno-http/file-server";
import { join, relative } from "$deno-path";
import { exists } from "$deno-fs";
import logBox from "$$lib/log-box.ts";
import { TimeSnap } from "$$lib/time-snap.ts";

// --- GŁÓWNA KONFIGURACJA ---
const PORT = 8008;
const SERVE_ROOT = "app/out";
const WATCH_ROOT = "app/dev";
const WEBSOCKET_PATH = "/__live_reload_ws";
const COOLDOWN_MS = 90000;

// --- LOGIKA SERWERA ---
const sockets = new Set<WebSocket>();
let lastBuildTimestamp = 0;
let isBuilding = false;

function broadcastReload() {
  console.log("✅ Build zakończony, wysyłanie sygnału odświeżenia...");
  for (const socket of sockets) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send("reload");
    }
  }
}

async function triggerBuildAndReload() {
  if (isBuilding) {
    console.log("⏳ Budowanie jest już w toku. Pomijanie...");
    return;
  }

  const timeSinceLastBuild = Date.now() - lastBuildTimestamp;

  if (timeSinceLastBuild < COOLDOWN_MS) {
    console.log(`🧊 Wykryto zmianę, ale obowiązuje okres wyciszenia. Następne budowanie możliwe za ${( (COOLDOWN_MS - timeSinceLastBuild) / 1000).toFixed(1)}s.`);
    return;
  }

  isBuilding = true;
  lastBuildTimestamp = Date.now();
  console.log("🚀 Rozpoczynanie procesu budowania...");

  const command = new Deno.Command("deno", {
    args: ["task", "build"],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await command.output();

  if (code === 0) {
    console.log(new TextDecoder().decode(stdout));
    broadcastReload();
  } else {
    console.error("❌ Błąd podczas budowania:");
    console.error(new TextDecoder().decode(stderr));
  }

  isBuilding = false;
}

async function initializeLastBuildTimestamp(fsRoot: string): Promise<number> {
  const mjsPath = join(fsRoot, "gen", "main.mjs.snapVERSION.txt");
  const cssPath = join(fsRoot, "gen", "main.css.snapVERSION.txt");
  
  const readFileTimestamp = async (path: string): Promise<number> => {
    try {
      const content = await Deno.readTextFile(path);
      const date = TimeSnap.toDate(TimeSnap.stampPARSE('-', content));
      return date.getTime();
    } catch {
      return 0;
    }
  };

  const mjsTimestamp = await readFileTimestamp(mjsPath);
  const cssTimestamp = await readFileTimestamp(cssPath);
  const latestTimestamp = Math.max(mjsTimestamp, cssTimestamp);

  const infoColor = { color: 0xAAAA00, bgColor: 0x2d2d2d };
  if (latestTimestamp > 0) {
    logBox(`INFO: Ostatnie znane budowanie: ${new Date(latestTimestamp).toLocaleString()}`, infoColor);
  } else {
    logBox("INFO: Nie znaleziono poprzednich plików budowania.", infoColor);
  }

  return latestTimestamp;
}

async function handleRequest(req: Request, fsRoot: string): Promise<Response> {
  const url = new URL(req.url);

  if (url.pathname === WEBSOCKET_PATH && req.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.onopen = () => sockets.add(socket);
    socket.onclose = () => sockets.delete(socket);
    socket.onerror = (e) => console.error("Błąd WebSocket:", e);
    return response;
  }

  let response = await serveDir(req, { fsRoot, quiet: true });
  console.log(`[${req.method}] ${url.pathname} - ${response.status}`);

  // Obsługa fallbacku dla SPA (Single Page Application)
  if (response.status === 404) {
      try {
        const indexPath = join(fsRoot, "index.html");
        const indexFile = await Deno.open(indexPath, { read: true });
        response = new Response(indexFile.readable, {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      } catch {
        return new Response("Not Found", { status: 404 });
      }
  }

  // Jeśli plik został znaleziony (lub użyliśmy fallbacku), przetwarzamy go dalej
  if (response.ok) {
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");
    let body = response.body;

    // Jeśli to plik HTML, wstrzykujemy skrypt live-reload
    if (headers.get("content-type")?.includes("text/html")) {
        const originalHtml = await response.text();
        body = originalHtml.replace("</body>", LIVE_RELOAD_SCRIPT + "</body>");
        headers.delete("content-length"); // Długość się zmieniła
    }
    
    // Zwracamy nową odpowiedź z oryginalną treścią, ale ze zmodyfikowanymi nagłówkami
    return new Response(body, {
        status: response.status,
        headers: headers
    });
  }

  return response; // Zwróć oryginalną odpowiedź, jeśli nie była 'ok' (np. błąd 500)
}

const LIVE_RELOAD_SCRIPT = `
<script>
  const socket = new WebSocket(\`ws://\${window.location.host}${WEBSOCKET_PATH}\`);
  socket.addEventListener('message', (event) => {
    if (event.data === 'reload') {
      console.log('🔄 Otrzymano sygnał odświeżenia z serwera...');
      window.location.reload();
    }
  });
  socket.addEventListener('open', () => console.log('✅ Połączono z serwerem Live-Reload.'));
  socket.addEventListener('close', () => console.warn('Połączenie Live-Reload zerwane.'));
</script>`;

async function startServer() {
  const pathRoot = Deno.cwd();
  const pathServe = join(pathRoot, SERVE_ROOT);
  const pathWatch = join(pathRoot, WATCH_ROOT);
  const pathGen = join(pathServe, "gen");  

  

  // KROK 1: Sprawdź, czy katalog 'gen' istnieje.
  if (!await exists(pathGen)) {
    logBox("INFO: Katalog 'gen' nie istnieje. Uruchamianie pierwszego budowania...", { color: 0xFFFF00, bgColor: 0x3d3d2d });
    
    const command = new Deno.Command("deno", { args: ["task", "build"] });
    const { code, stderr } = await command.output();
    
    if (code !== 0) {
      console.error("❌ Krytyczny błąd podczas pierwszego budowania. Serwer nie może wystartować.");
      console.error(new TextDecoder().decode(stderr));
      Deno.exit(1);
    }
    console.log("✅ Pierwsze budowanie zakończone pomyślnie.");
  }

  // KROK 2: Kontynuuj normalne uruchamianie serwera
  lastBuildTimestamp = await initializeLastBuildTimestamp(pathServe);

  (async () => {
    console.log(`👀 Obserwator plików uruchomiony na katalogu: ${pathWatch}`);
    const watcher = Deno.watchFs(pathWatch);
    for await (const event of watcher) {
        console.log(`📝 Wykryto zmianę w pliku: ${relative(pathRoot, event.paths[0])}`);
        triggerBuildAndReload();
    }
  })().catch(err => console.error("🔥 Błąd krytyczny obserwatora plików:", err));

  const color = { color: 0x94C0C0, bgColor: 0x30535D, boxColor: 0x213940 };
  logBox(`🚀 Serwer deweloperski uruchomiony na http://localhost:${PORT}`, color);
  logBox(`📂 Serwowanie plików z katalogu: ${pathServe}`, color);
  logBox(`🔥 Budowanie będzie uruchamiane automatycznie po zmianach w '${WATCH_ROOT}'`, color);

  await Deno.serve({ port: PORT }, (req) => handleRequest(req, pathServe));
}

startServer().catch((err) => {
  if (err instanceof Error) {
    console.error(`\n❌ Krytyczny błąd serwera: `, err.message);
  } else {
    console.error(`\n❌ Wystąpił nieznany błąd serwera: `, err);
  }
  Deno.exit(1);
});
