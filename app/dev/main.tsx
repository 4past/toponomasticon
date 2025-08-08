/** @jsxRuntime automatic */
/** @jsxImportSource $tsx-preact */

import { render } from "$tsx-preact";
import { PageIndex } from "./pages/Index.tsx";

function LayoutMain() {
  return (
    <>
      <h1>TEST1</h1>
      <PageIndex />
    </>
  );
}

// Bezpieczny montaż aplikacji
const rootElement = document.getElementById("root");

if (rootElement) {
  render(<LayoutMain />, rootElement);
} else {
  console.error(
    'Nie znaleziono elementu startowego #root. Upewnij się, że w pliku HTML istnieje element <main id="root"></main>.',
  );
}
