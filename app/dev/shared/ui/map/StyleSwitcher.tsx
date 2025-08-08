/** @jsxRuntime automatic */
/** @jsxImportSource $tsx-preact */

import type { VNode } from "$tsx-preact";
import type { MapLibreStyle } from "$map-libre-gl$";

interface StyleSwitcherProps {
  /** Lista dostępnych stylów do wyświetlenia. */
  styles: MapLibreStyle[];
  /** URL lub obiekt aktywnego stylu. */
  activeStyleUrl: MapLibreStyle['url'];
  /** Funkcja zwrotna wywoływana po wybraniu nowego stylu. */
  onStyleChange: (newStyleUrl: MapLibreStyle['url']) => void;
}

export function StyleSwitcher({ styles, activeStyleUrl, onStyleChange }: StyleSwitcherProps): VNode {
  return (
    <div className="style-switcher">
      {styles.map((style) => (
        <button
          key={style.name}
          // Warunkowo dodajemy klasę 'active', jeśli styl przycisku pasuje do aktywnego stylu
          className={style.url === activeStyleUrl ? 'active' : ''}
          onClick={() => onStyleChange(style.url)}
        >
          {style.name}
        </button>
      ))}
    </div>
  );
}
