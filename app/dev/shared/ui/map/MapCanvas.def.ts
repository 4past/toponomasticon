import { MapLibreCore } from "$map-libre-gl$";
import type {
  MapOptions, StyleSpecification, LngLatLike, ProjectionSpecification, LngLatBoundsLike, RequestParameters,
  AttributionControlOptions, AroundCenterOptions, DragPanOptions, GestureOptions, FitBoundsOptions,
  ControlPosition, CameraUpdateTransformFunction, WebGLContextAttributesWithType
} from "$map-libre-gl$";
import type {  ComponentChildren } from "$tsx-preact";


// --- Definicje typów dla pogrupowanych opcji ---

export interface MapCanvasPropsPosition {
  /** Punkt geograficzny [długość, szerokość], na którym mapa zostanie początkowo wyśrodkowana. */
  center?: LngLatLike;
  /** Początkowy poziom przybliżenia mapy. */
  zoom?: number;
  /** Początkowa rotacja mapy w stopniach (0-360). */
  bearing?: number;
  /** Początkowe nachylenie mapy w stopniach (0-85), tworzące perspektywę 3D. */
  pitch?: number;
  /** Początkowy kąt obrotu kamery wokół jej osi. */
  roll?: number;
  /** Początkowa elewacja (wysokość) środka mapy w metrach. */
  elevation?: number;
  /** Czy środek mapy ma być "przyklejony" do terenu? */
  centerClampedToGround?: boolean;
  /** Definiuje projekcję mapy, np. {type: 'globe'} lub {type: 'mercator'}. */
  projection?: ProjectionSpecification;
}

export interface MapCanvasPropsControls {
  /** Czy mapa ma reagować na interakcje (mysz, dotyk)? */
  interactive?: boolean;
  /** Czy można przybliżać mapę kółkiem myszy? Można podać obiekt z opcjami. */
  scrollZoom?: boolean | AroundCenterOptions;
  /** Czy można przybliżać do zaznaczonego obszaru (Shift + przeciągnięcie)? */
  boxZoom?: boolean;
  /** Czy można obracać i pochylać mapę (prawy przycisk myszy lub Ctrl + przeciągnięcie)? */
  dragRotate?: boolean;
  /** Czy można przesuwać mapę (lewy przycisk myszy)? Można podać obiekt z opcjami. */
  dragPan?: boolean | DragPanOptions;
  /** Czy można nawigować po mapie za pomocą klawiatury? */
  keyboard?: boolean;
  /** Czy podwójne kliknięcie przybliża mapę? */
  doubleClickZoom?: boolean;
  /** Czy można przybliżać i obracać mapę gestami dotykowymi? */
  touchZoomRotate?: boolean | AroundCenterOptions;
  /** Czy można pochylać mapę gestem dwóch palców? */
  touchPitch?: boolean | AroundCenterOptions;
  /** Czy włączyć gesty kooperacyjne (np. wymagające Ctrl do zoomu)? */
  cooperativeGestures?: GestureOptions;
  /** Czy pochylanie mapy jest połączone z jej obracaniem? */
  pitchWithRotate?: boolean;
  /** Czy włączyć obracanie kamery wokół jej osi (roll)? */
  rollEnabled?: boolean;
  /** Próg w stopniach, przy którym rotacja mapy "przyciąga" do północy. */
  bearingSnap?: number;
  /** Tolerancja kliknięcia w pikselach (odróżnienie od przeciągnięcia). */
  clickTolerance?: number;
  /** Opcje kontrolki atrybucji (stopki). Ustaw na `false`, aby ją wyłączyć. */
  attributionControl?: false | AttributionControlOptions;
  /** Czy pokazywać logo MapLibre? */
  maplibreLogo?: boolean;
  /** Pozycja logo MapLibre na mapie. */
  logoPosition?: ControlPosition;
  /** Pokazuje standardowe kontrolki nawigacji (zoom, kompas). Można podać pozycję. */
  showNavigation?: boolean | ControlPosition;
  /** Pokazuje kontrolkę do włączania/wyłączania terenu 3D. Można podać pozycję. */
  showTerrainControl?: boolean | ControlPosition;
}

export interface MapCanvasPropsRenderSettings {
  /** Zaawansowane atrybuty kontekstu WebGL, np. { antialias: true }. */
  canvasContextAttributes?: WebGLContextAttributesWithType;
  /** Czas w ms, przez który etykiety płynnie pojawiają się i znikają. */
  fadeDuration?: number;
  /** Czy renderować "kopie" świata obok siebie na niższych poziomach zoomu? */
  renderWorldCopies?: boolean;
  /** Czy zachować bufor rysowania? Potrzebne do robienia zrzutów ekranu mapy. */
  preserveDrawingBuffer?: boolean;
  /** Czy inicjalizacja ma się nie udać, jeśli wydajność może być niska? */
  failIfMajorPerformanceCaveat?: boolean;
  /** Stosunek pikseli urządzenia do pikseli CSS. Domyślnie `window.devicePixelRatio`. */
  pixelRatio?: number;
  /** Maksymalny rozmiar płótna (canvas) w pikselach: [szerokość, wysokość]. */
  maxCanvasSize?: [number, number];
  /** Włącza lub wyłącza renderowanie terenu 3D. */
  showTerrain?: boolean;
  /** Współczynnik przeskalowania wysokości terenu 3D. Wartość 1 to realna wysokość. */
  exaggeration?: number;
}

export interface MapCanvasPropsLimitsPosition {
  /** Ogranicza widok mapy do podanego prostokąta geograficznego. */
  bounds?: LngLatBoundsLike;
  /** Opcje dopasowania widoku przy pierwszym renderowaniu `bounds`. */
  fitBoundsOptions?: FitBoundsOptions;
  /** Minimalny dozwolony poziom oddalenia. */
  minZoom?: number | null;
  /** Maksymalny dozwolony poziom przybliżenia. */
  maxZoom?: number | null;
  /** Minimalne dozwolone nachylenie mapy. */
  minPitch?: number | null;
  /** Maksymalne dozwolone nachylenie mapy. */
  maxPitch?: number | null;
  /** Czy synchronizować pozycję mapy z hashem w adresie URL? */
  hash?: boolean | string;
}

export interface MapCanvasPropsFetchData {
    /** Funkcja do modyfikacji żądań o zasoby (np. w celu dodania nagłówków autoryzacji). */
    transformRequest?: (url: string, resourceType?: string) => RequestParameters;
    /** Maksymalna liczba obrazków (np. kafelków) ładowanych równocześnie. */
    maxParallelImageRequests?: number;
    /** Domyślna czcionka dla znaków azjatyckich. Ustaw na `false`, aby użyć czcionek ze stylu. */
    localIdeographFontFamily?: string | false;
    /** Czy odświeżać kafelki, gdy wygaśnie ich nagłówek HTTP cache? */
    refreshExpiredTiles?: boolean;
    /** Czy anulować ładowanie kafelków z niższych zoomów podczas przybliżania? */
    cancelPendingTileRequestsWhileZooming?: boolean;
}

// --- Automatyczne tworzenie typu "OtherOptions" ---

type ExtractedKeys =
  | keyof MapCanvasPropsPosition
  | keyof MapCanvasPropsControls
  | keyof MapCanvasPropsRenderSettings
  | keyof MapCanvasPropsLimitsPosition
  | keyof MapCanvasPropsFetchData
  | 'style'
  | 'container';

export type MapCanvasPropsOtherOptions = Omit<MapOptions, ExtractedKeys>;


// --- Główny interfejs propsów dla naszego komponentu ---

export interface MapCanvasProps {
  /** Definiuje wygląd całej mapy (URL do stylu lub obiekt stylu). */
  renderStyle: string | StyleSpecification;
  /** Opcje definiujące początkowy widok mapy. */
  positionAtStart?: MapCanvasPropsPosition;
  /** Opcje kontrolujące interakcję użytkownika z mapą. */
  controlViewMap?: MapCanvasPropsControls;
  /** Opcje wpływające na jakość i sposób renderowania. */
  renderSettings?: MapCanvasPropsRenderSettings;
  /** Opcje ograniczające widok i nawigację. */
  positionLimits?: MapCanvasPropsLimitsPosition;
  /** Opcje związane z pobieraniem danych i zasobów. */
  fetchData?: MapCanvasPropsFetchData;
  /** Pozostałe, rzadziej używane opcje z MapOptions. */
  otherOptions?: MapCanvasPropsOtherOptions;
  children?: ComponentChildren;
}
