/** @jsxRuntime automatic */
/** @jsxImportSource $tsx-preact */

import { useEffect, useRef, useState } from "$tsx-preact/hooks";
import { createContext, type ComponentChildren, type VNode } from "$tsx-preact";
import { MapLibreCore, NavigationControl,TerrainControl } from "$map-libre-gl$";
import { MapCanvasProps } from "./MapCanvas.def.ts";
import { TERRAIN_SOURCE, HILLSHADE_LAYER } from "./MapTerrain.data.ts";

// Tworzymy i eksportujemy Kontekst.
// Komponenty-dzieci (np. <Marker>, <Layer>) będą go używać,  aby uzyskać dostęp do instancji mapy.
export const MapContext = createContext<MapLibreCore | null>(null);

export function MapCanvas({
  renderStyle,
  positionAtStart,
  controlViewMap,
  renderSettings,
  positionLimits,
  fetchData,
  otherOptions,
  children
}: MapCanvasProps): VNode {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // Używamy stanu (useState) do przechowywania instancji mapy.
  // Dzięki temu komponenty-dzieci zostaną przerenderowane, gdy mapa będzie gotowa.
  const [map, setMap] = useState<MapLibreCore | null>(null);
  // Używamy referencji, aby przechowywać instancję kontrolki między renderowaniami
  const navigationControlRef = useRef<NavigationControl | null>(null);
  const terrainControlRef = useRef<TerrainControl | null>(null);

  // Ten useEffect uruchamia się TYLKO RAZ, aby stworzyć mapę.
  useEffect(() => {
    // Sprawdzamy, czy kontener istnieje i czy mapa nie została już zainicjowana.
    if (!mapContainerRef.current) return;

    // Inicjalizujemy mapę, łącząc przekazane opcje z wymaganym kontenerem.
    const mapInstance = new MapLibreCore({
      container: mapContainerRef.current,
      style: renderStyle,
      ...positionAtStart,
      ...controlViewMap,
      ...renderSettings,
      ...positionLimits,
      ...fetchData,
      ...otherOptions,
    });

    // Ustawiamy projekcję na globus, gdy tylko styl mapy się załaduje.
    mapInstance.on('load', () => {
      if (positionAtStart?.projection) {
        mapInstance.setProjection(positionAtStart.projection);
      }
      setMap(mapInstance);
    });

    // Gdy mapa jest w pełni załadowana, zapisujemy jej instancję w stanie.
    return () => {
      mapInstance.remove();
      setMap(null);
    };
  }, [
    //renderStyle, 
    //JSON.stringify(positionAtStart), 
    //JSON.stringify(controlViewMap), 
    //JSON.stringify(renderSettings), 
    //JSON.stringify(positionLimits), 
    //JSON.stringify(fetchData), 
    //JSON.stringify(otherOptions)
  ]);
  // Ten useEffect nasłuchuje na zmiany STYLU i aktualizuje istniejącą mapę.
  useEffect(() => {
    // Jeśli mapa jeszcze nie istnieje lub nowy styl jest taki sam jak obecny, nic nie rób.
    if (!map || map.getStyle() === renderStyle) return;

    map.setStyle(renderStyle);

  }, [renderStyle, map]); // Uruchom ponownie tylko, gdy zmieni się styl lub instancja mapy.

  // useEffect do zarządzania kontrolkami nawigacji
  useEffect(() => {
    if (!map) return; // Uruchom tylko, gdy mapa jest gotowa

    // Najpierw usuń starą kontrolkę, jeśli istnieje
    if (navigationControlRef.current) {
      map.removeControl(navigationControlRef.current);
      navigationControlRef.current = null;
    }

    // Dodaj nową kontrolkę, jeśli opcja jest włączona
    if (controlViewMap?.showNavigation) {
      const position = typeof controlViewMap.showNavigation === 'string'
        ? controlViewMap.showNavigation
        : 'top-right'; // Domyślna pozycja

      const navControl = new NavigationControl();
      navigationControlRef.current = navControl;
      map.addControl(navControl, position);
    }
  }, [map, controlViewMap?.showNavigation]); // Uruchom ponownie, gdy zmieni się mapa lub opcja 'showNavigation'

  // useEffect do zarządzania terenem 3D
  useEffect(() => {
    if (!map) return; // Uruchom tylko, gdy mapa jest gotowa

    const terrainSourceId = 'terrain-data';

    // Funkcja czeka, aż styl mapy zostanie w pełni załadowany
    const handleTerrain = () => {
      // Usuń stary teren i warstwę, jeśli istnieją
      if (map.getSource(terrainSourceId)) {
        map.removeLayer('hillshade');
        map.removeSource(terrainSourceId);
        map.setTerrain(null);
      }

      // Dodaj nowy teren, jeśli opcja jest włączona
      if (renderSettings?.showTerrain) {
        map.addSource(terrainSourceId, TERRAIN_SOURCE);
        map.addLayer(HILLSHADE_LAYER);
        // Przekazujemy przeskalowanie do setTerrain
        map.setTerrain({ source: terrainSourceId, exaggeration: renderSettings.exaggeration ?? 1 });
      }
    };

    // Jeśli styl jest już załadowany, wykonaj od razu.
    // W przeciwnym razie, poczekaj na zdarzenie 'styledata'.
    if (map.isStyleLoaded()) {
      handleTerrain();
    } else {
      map.once('styledata', handleTerrain);
    }

  }, [map, renderSettings?.showTerrain, renderSettings?.exaggeration]); // Uruchom ponownie, gdy zmieni się mapa lub opcja 'showTerrain'

  // useEffect do zarządzania KONTROLKĄ terenu
  useEffect(() => {
    if (!map) return;

    if (terrainControlRef.current) {
      map.removeControl(terrainControlRef.current);
      terrainControlRef.current = null;
    }

    if (controlViewMap?.showTerrainControl) {
      const position = typeof controlViewMap.showTerrainControl === 'string' ? controlViewMap.showTerrainControl : 'top-right';
      const terrControl = new TerrainControl({
        source: 'terrain-data', // Musi pasować do ID źródła terenu
        
        // Przekazujemy przeskalowanie do kontrolki
        exaggeration: renderSettings?.exaggeration ?? 1
      });
      terrainControlRef.current = terrControl;
      map.addControl(terrControl, position);
    }
  }, [map, controlViewMap?.showTerrainControl, renderSettings?.showTerrain, renderSettings?.exaggeration]); // Reaguj też na zmianę 'showTerrain'

  // Zależność od 'options' pozwala na rekonfigurację mapy z zewnątrz.

  // return <div class="map-canvas-container" ref={mapContainerRef} />;
  return (
    // Ten div jest "płótnem" dla MapLibre
    <div class="map-canvas-container" ref={mapContainerRef}>
      {
        /* Dostawca Kontekstu udostępnia instancję mapy wszystkim dzieciom.
        Renderujemy dzieci dopiero wtedy, gdy mapa jest w pełni gotowa (map !== null),
        aby miały pewność, że mogą na niej operować.
      */
      }
      <MapContext.Provider value={map}>
        {map ? children : null}
      </MapContext.Provider>
    </div>
  );
}
