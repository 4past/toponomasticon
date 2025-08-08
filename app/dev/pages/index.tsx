/** @jsxRuntime automatic */
/** @jsxImportSource $tsx-preact */

import { useState } from "$tsx-preact/hooks";
import { VNode } from "$tsx-preact";
import { MapCanvas } from "$$app-ui/map/MapCanvas.tsx";
import { StyleSwitcher } from "$$app-ui/map/StyleSwitcher.tsx";
import { AVAILABLE_STYLES } from "../shared/ui/map/MapStyles.data.ts";
import type {
  MapCanvasPropsControls,
  MapCanvasPropsPosition,
  MapCanvasPropsLimitsPosition,
  MapCanvasPropsFetchData,
  MapCanvasPropsRenderSettings,
  MapCanvasPropsOtherOptions
} from "$$app-ui/map/MapCanvas.def.ts";

// Definiujemy konfigurację mapy w jednym miejscu.
// To są dokładnie te same ustawienia, co w Twoim przykładzie HTML.
const mapTilerKey: string = `PHg2cj8QL4Svf3Wdjgsh`;
  //style: "https://demotiles.maplibre.org/style.json",
  

export function PageIndex(): VNode {
  // Używamy stanu (useState) do przechowywania aktualnie wybranego stylu.
  // Domyślnie ustawiamy pierwszy styl z naszej listy.
  const [currentStyle, setCurrentStyle] = useState(AVAILABLE_STYLES[0].url);
  // Dodajemy stan do dynamicznego włączania/wyłączania terenu
  const [terrainEnabled, setTerrainEnabled] = useState(true);

  return (
    <div style="width: 100vw; height: 100vh;">
      <p class="pp">
        Pozwólcie, Waćpaństwo, że przedstawię niniejsze instrumentarium.
        Aplikacja ta, zrodzona z miłości do porządku i klarowności, służy do ...
      </p>
      <hr />
      <p>
        Pozwólcie, Waćpaństwo, że przedstawię niniejsze instrumentarium.
        Aplikacja ta, zrodzona z miłości do porządku i klarowności, służy do ...
      </p>
      {/* Przekazujemy naszą konfigurację do komponentu mapy */}
      <div style="width: 100vw; height: 80vh;">
        <MapCanvas           
          // --- Wygląd ---
          // Definiuje wygląd całej mapy (URL do stylu lub obiekt stylu).          
          renderStyle={currentStyle}

          // --- Pozycja Startowa ---
          // Opcje definiujące początkowy widok mapy.
          positionAtStart={{
            center: [20, 50],
            zoom: 3,
            bearing: 180,
            projection: { type: 'globe' }
          }}

          // --- Kontrola Użytkownika ---
          // Opcje kontrolujące interakcję użytkownika z mapą.
          controlViewMap={{
            // Wyłączmy stopkę z atrybucją
            attributionControl: false, 
            // Włączmy kontrolki nawigacji i umieśćmy je w lewym górnym rogu
            showNavigation: 'top-left',
            showTerrainControl: 'top-left'
          }}

          // --- Ustawienia Renderowania ---
          // Opcje wpływające na jakość i sposób renderowania.
          renderSettings={{
            canvasContextAttributes: {
              antialias: true,
            },
            
            // Włączamy renderowanie terenu 3D
            showTerrain: terrainEnabled,            
            exaggeration: 2.1
          }}

          // --- Ograniczenia Widoku ---
          // Opcje ograniczające widok i nawigację.
          positionLimits={{
            minZoom: 3, 
            maxZoom: 18, 
            hash: true
          }}
        >
          {/* Umieszczamy nasz przełącznik jako dziecko MapCanvas. */}
          {/* Przekazujemy mu listę stylów i funkcję do aktualizacji stanu. */}
          <StyleSwitcher
            styles={AVAILABLE_STYLES}
            activeStyleUrl={currentStyle}
            onStyleChange={setCurrentStyle}
          />
          {/* Prosty przycisk do testowania dynamicznego włączania/wyłączania terenu */}
        {/* <button 
          style={{ position: 'absolute', top: '10px', left: '50px', zIndex: 10 }}
          onClick={() => setTerrainEnabled(!terrainEnabled)}
        >
          Teren: {terrainEnabled ? 'WŁ' : 'WYŁ'}
        </button> */}
          {/* Miejsce na przyszłe komponenty, np. <Marker /> */}
        </MapCanvas>
      </div>
    </div>
  );
}
