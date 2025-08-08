/**
 * @file Ten plik re-eksportuje wszystkie potrzebne typy i funkcje z biblioteki MapLibre GL JS.
 * Działa jako centralny punkt dostępu, co upraszcza importy w całej aplikacji
 * i ułatwia zarządzanie wersją biblioteki.
 * * Dokumentacja API: https://maplibre.org/maplibre-gl-js/docs/API/
 * Specyfikacja stylów: https://maplibre.org/maplibre-style-spec/
 */

// --- GŁÓWNE RE-EKSPORTY ---

export {
  // --- Kontrolki UI ---
  type IControl,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  GlobeControl,
  LogoControl,
  NavigationControl,
  ScaleControl,
  TerrainControl,

  // --- Handlery Interakcji ---
  BoxZoomHandler,
  CooperativeGesturesHandler,
  DoubleClickZoomHandler,
  DragPanHandler,
  DragRotateHandler,
  KeyboardHandler,
  ScrollZoomHandler,
  TwoFingersTouchPitchHandler, TwoFingersTouchRotateHandler, TwoFingersTouchZoomHandler,
  TwoFingersTouchZoomRotateHandler,

  // --- Główne Objekty UI ---
  Map,
  Hash,
  Popup,
  Marker,
  type PointLike,
  MapWheelEvent, MapTouchEvent, MapMouseEvent,
  type MapContextEvent, type MapDataEvent, type MapEventType, type MapLayerEventType, type MapLayerMouseEvent,
  type MapLayerTouchEvent, type MapLibreEvent, type MapLibreZoomEvent, type MapSourceDataEvent,
  type MapStyleDataEvent, type MapStyleImageMissingEvent, type MapTerrainEvent,

  // --- Style ---
  Style,
  type CustomLayerInterface,

  // --- Objekty Geograficzne ---
  EdgeInsets,
  LngLat,
  LngLatBounds,
  MercatorCoordinate,
  type LngLatBoundsLike,
  type LngLatLike,
  type PaddingOptions,

  // --- Narzędzia i Klasy Pomocnicze ---
  AJAXError,
  Event,
  Evented,
  MessageType,
  config,
  createTileMesh,
  type ErrorEvent,
  type GeoJSONFeature,
  prewarm, clearPrewarmedResources,

  // --- Źródła Danych (Sources) ---
  addProtocol, removeProtocol,
  addSourceType,
  CanvasSource,
  GeoJSONSource,
  ImageSource,
  RasterDEMTileSource,
  RasterTileSource,
  VectorTileSource,
  VideoSource,
  type CanvasSourceSpecification,
  type Source,

  // --- Funkcje Globalne ---
  getMaxParallelImageRequests,
  getRTLTextPluginStatus,
  getVersion,
  getWorkerCount,
  getWorkerUrl,
  importScriptInWorkers,
  setMaxParallelImageRequests,
  setRTLTextPlugin,
  setWorkerCount,
  setWorkerUrl,

  // --- Inne ---
  Point,
  default,

  // --- Typy Podstawowe i Pomocnicze ---
  Color, ColorArray,
  Formatted, FormattedSection,
  IntersectionResult,
  NumberArray,
  Padding,
  ResolvedImage,
  ResourceType,
  VariableAnchorOffsetCollection,

  // --- Wszystkie pozostałe typy (Pogrupowane) ---

  // ** Opcje Konfiguracyjne **
  type AddProtocolAction, type Alignment, type AnimationOptions, type AroundCenterOptions, type AttributionControlOptions,
  type CameraOptions, type ControlPosition, type DragPanOptions, type DragRotateHandlerOptions, type EaseToHandlerOptions,
  type EaseToOptions, type FitBoundsOptions, type FlyToHandlerOptions, type FlyToOptions, type FullscreenControlOptions,
  type GeolocateControlOptions, type GestureOptions, type JumpToOptions, type LogoControlOptions, type MapOptions,
  type CompleteMapOptions, type MarkerOptions, type NavigationControlOptions, type PopupOptions, type RenderOptions,
  type ScaleControlOptions, type StyleOptions, type StyleSetterOptions, type StyleSwapOptions, type UpdateImageOptions,

  // ** Typy Warstw (Layers) **
  type AddLayerObject, type BackgroundLayerSpecification, type CircleLayerSpecification, type ColorReliefLayerSpecification,
  type FillExtrusionLayerSpecification, type FillLayerSpecification, type HeatmapLayerSpecification, type HillshadeLayerSpecification,
  type LayerSpecification, type LightPosition, type LightSpecification, type LineLayerSpecification,
  type RasterLayerSpecification, type SkySpecification, type SymbolLayerSpecification, type TerrainSpecification, type TypedStyleLayer,

  // ** Typy Właściwości Wyglądu (Paint & Layout) **
  type CircleGranularity, type CircleLayoutProps, type CircleLayoutPropsPossiblyEvaluated, type CirclePaintProps, type CirclePaintPropsPossiblyEvaluated,
  type ColorReliefPaintProps, type ColorReliefPaintPropsPossiblyEvaluated, type DashEntry,
  type FillExtrusionPaintProps, type FillExtrusionPaintPropsPossiblyEvaluated,
  type FillLayoutProps, type FillLayoutPropsPossiblyEvaluated, type FillPaintProps, type FillPaintPropsPossiblyEvaluated,
  type HeatmapPaintProps, type HeatmapPaintPropsPossiblyEvaluated,
  type HillshadePaintProps, type HillshadePaintPropsPossiblyEvaluated,
  type LightProps, type LightPropsPossiblyEvaluated,
  type LineLayoutProps, type LineLayoutPropsPossiblyEvaluated, type LinePaintProps, type LinePaintPropsPossiblyEvaluated,
  type Offset, type OverlapMode, type PaddingSpecification, type PositionAnchor, type Property, type PropertyCallback,
  type PossiblyEvaluatedValue, type SkyProps, type SkyPropsPossiblyEvaluated, type Stops,
  type SymbolLayoutProps, type SymbolLayoutPropsPossiblyEvaluated, type SymbolPaintProps, type SymbolPaintPropsPossiblyEvaluated,
  type TextAnchor, type TextAnchorOffset, type TextFit, type VariableOffset, type VerticalAlign,

  // ** Typy Źródeł (Sources) **
  type GeoJSONFeatureDiff, type GeoJSONSourceDiff, type GeoJSONSourceInternalOptions, type GeoJSONSourceOptions, type GeoJSONSourceSpecification,
  type ImageSourceSpecification, type LoadGeoJSONParameters, type PromoteIdSpecification, type RasterDEMSourceSpecification,
  type RasterSourceSpecification, type RemoveSourceParams, type SetClusterOptions, type SourceClass, type SourceExpression,
  type SourceFunctionSpecification, type SourceSpecification, type VectorSourceSpecification, type VectorTileSourceOptions,
  type VideoSourceSpecification,

  // ** Typy Wyrażeń i Filtrów (Expressions & Filters) **
  type BooleanTypeT, type CameraExpression, type CameraFunctionSpecification, type CollatorExpressionSpecification,
  type CollatorOptions, type CollatorTypeT, type ColorArraySpecification, type ColorArrayTypeT, type ColorSpecification,
  type ColorTypeT, type CompositeExpression, type CompositeFunctionSpecification, type ConstantExpression,
  type DataDrivenPropertyValueSpecification, type Expression, type ExpressionFilterSpecification, type ExpressionInputType,
  type ExpressionParameters, type ExpressionParser, type ExpressionRegistration, type ExpressionRegistry,
  type ExpressionSpecification, type ExpressionSpecificationDefinition, type ExpressionType, type FeatureFilter,
  type FilterExpression, type FilterSpecification, type FormattedSectionExpression, type FormattedSpecification,
  type FormattedTypeT, type InterpolationColorSpace, type InterpolationSpecification, type InterpolationType,
  type LegacyFilterSpecification, type NullTypeT, type NumberArraySpecification, type NumberArrayTypeT,
  type NumberTypeT, type ObjectTypeT, type PaddingTypeT, type PropertyValueSpecification, 
  type StateSpecification, type StringTypeT, type StylePropertyExpression, type StylePropertySpecification,
  type ValueTypeT, type VariableAnchorOffsetCollectionSpecification, type VariableAnchorOffsetCollectionTypeT,

  // ** Typy Kamery i Projekcji (Camera & Projection) **
  type CalculateTileZoomFunction, type CameraForBoundsOptions, type CameraForBoxAndBearingHandlerResult, type CameraUpdateTransformFunction,
  type CenterZoomBearing, type MapControlsDeltas, type MapProjectionEvent, type Projection, type ProjectionCache,
  type ProjectionData, type ProjectionDataParams, type ProjectionDefinitionSpecification, type ProjectionDefinitionT,
  type ProjectionDefinitionTypeT, type ProjectionGPUContext, type ProjectionPreludeUniformsType, type ProjectionSpecification,
  type TerrainPreludeUniformsType, type ViewType, type ViewportType,

  // ** Typy Obiektów i Geometrii (Features & Geometry) **
  type ClusterIDAndSource, type Feature, type FeatureIdentifier, type FeatureKey, type FeaturePosition, type FeatureState,
  type FeatureStates, type GeoJSONFeatureId, type GetClusterLeavesParams, type GlobalProperties, type GlyphMetrics,
  type GlyphPosition, type GlyphPositions, type HCLColor, type IBoundingVolume, type ICameraHelper, type ICanonicalTileID,
  type ILngLat, type ILngLatLike, type IMercatorCoordinate, type IndexedFeature, type LABColor, type LayerFeatureStates,
  type LineClips, type MapGeoJSONFeature, type PlacedBox, type PlacedCircles, type Point2D, type PointProjection,
  type RGBColor, type Rect, type RingWithArea, type Segment, type SingleCollisionBox, type Size, type SizeData,
  type SymbolFeature, type SymbolInstance, type SymbolProjectionContext, type SymbolQuad, type SymbolsByKeyEntry,

  // ** Typy Zdarzeń i Handlerów (Events & Handlers) **
  type Delegate, type DelegatedListener, type DragMoveHandler, type DragMovementResult, type DragPanResult, type DragPitchResult,
  type DragRollResult, type DragRotateResult, type EaseToHandlerResult, type EventInProgress, type EventsInProgress,
  type FlyToHandlerResult, type Handler, type HandlerResult, type Listener, type Listeners, type MapSourceDataType,
  type MessageHandler, type MousePanHandler, type MousePitchHandler, type MouseRollHandler, type MouseRotateHandler,
  type Subscription,

  // ** Typy Wewnętrzne i dla Workerów (Internal & Worker) **
  type ActorMessage, type ActorTarget, type ArrayType, type Bucket, type BucketFeature, type BucketParameters,
  type BucketPart, type CanonicalTileRange, type CollisionArrays, type CollisionGroup, type CoveringTilesDetailsProvider,
  type CoveringTilesOptions, type CoveringZoomOptions, type CrossTileID, type DiffCommand, type DiffOperations,
  type DiffOperationsMap, type GeoJSONWorkerOptions, type GeoJSONWorkerSourceLoadDataResult, type GridKey,
  type IActor, type IndexToPointCache, type MessageData, type PluginState, type PoolObject, type PopulateParameters,
  type RequestResponseMessageMap, type SchemaSpecification, type Serialized, type SerializedFeaturePositionMap,
  type SerializedGrid, type SerializedObject, type SerializedStructArray, type Signature, type SortKeyRange,
  type StructArrayMember, type StyleGlyph, type Task, type TaskID, type TerrainData, type TileLayerParameters, type TileMesh,
  type TileMeshUsage, type TileParameters, type TileResult, type TileState, type TimePoint, type UpdateLayersParameters,
  type WorkerDEMTileParameters, type WorkerTileParameters, type WorkerTileResult,

  // ** Typy Renderowania i WebGL (Rendering & WebGL) **
  type AttributeBinder, type BinderUniform, type BlendEquationType, type BlendFuncConstant, type BlendFuncType,
  type ClearArgs, type ColorMaskType, type ColorRamp, type ColorRampTextures, type CompareFuncType,
  type CreateTileMeshOptions, type CrossFaded, type CrossfadeParameters, type CullFaceModeType,
  type CustomRenderMethod, type CustomRenderMethodInput, type DEMEncoding, type DataTextureImage,
  type DepthFuncType, type DepthMaskType, type DepthRangeType, type DrawMode, type EmptyImage, type Entry,
  type FrontFaceType, type GradientTexture, type IndicesType, type InterpolatedValueType, type PainterOptions,
  type Pattern, type PreparedShader, type RenderPass, type StencilFuncType, type StencilOpConstant,
  type StencilOpType, type StencilTestGL, type TextureFilter, type TextureFormat, type TextureImage,
  type TextureUnitType, type TextureWrap, type UniformBinder, type UniformBindings, type UniformLocations,
  type UniformValues, type WebGLContextAttributesWithType, type WebGLSupportedVersions,

  // ** Typy Generyczne i Narzędziowe **
  type $ObjMap, type Complete, type Config, type Coordinates, type Definition,
  type DistributiveKeys, type DistributiveOmit, type ErrorLike, type ErrorTypeT, type Evaluate, type EvaluationKind,
  type ExpectedTypes, type ExpiryData, type GetGlyphsParameters, type GetGlyphsResponse, type GetImagesParameters,
  type GetImagesResponse, type GetResourceResponse, type IReadonlyTransform, type ITransform,
  type ITransformGetters, type ITransformMutators, type IValue, type QueryIntersectsFeatureParams,
  type QueryParameters, type QueryRenderedFeaturesOptions, type QueryRenderedFeaturesOptionsStrict,
  type QueryRenderedFeaturesResults, type QueryRenderedFeaturesResultsItem, type QueryResult,
  type QueryResults, type QueryResultsItem, type QuerySourceFeatureOptions, type RTLPluginStatus,
  type RequestParameters, type RequestTransformFunction, type RequireAtLeastOne, type ResolveReject,
  type ResolvedImageOptions, type ResolvedImageSpecification, type ResolvedImageTypeT, type Result,
  type SpriteOnDemandStyleImage, type SpriteSpecification, type StyleImage, type StyleImageData,
  type StyleImageInterface, type StyleImageMetadata, type StyleSpecification, type TransformStyleFunction,
  type TransitionParameters, type TransitionSpecification, type Type, type Unit, type ValidationError,
  type Validator, type Value, type Varargs,

  // --- Typy z modułu @maplibre/maplibre-gl-style-spec ---
  type ColorType, type CompoundExpression, type EvaluationContext, type FormatExpression,
  type FormattedType, type Interpolate, type Literal, type NullType, type ParsingError, type ProjectionDefinition,
  type ProjectionDefinitionType, type Step, type StyleExpression, type StylePropertyFunction, type ZoomConstantExpression,
  type ZoomDependentExpression, type classifyRings, type convertFilter, type convertFunction, type createExpression,
  type createFunction, type createPropertyExpression, type derefLayers, type diff, type emptyStyle, type expression,
  type expressions, type featureFilter, type format, type function, type groupByLayout, type interpolates,
  type isExpression, type isFunction, type isZoomExpression, type latest, type migrate, type normalizePropertyExpression,
  type supportsPropertyExpression, type toString, type typeOf, type v8, type validate, type validateStyleMin, type visit
} from "https://esm.sh/maplibre-gl@5.6.2";

// --- DODATKOWE RE-EKSPORTY DLA WYGODY ---

/** Ścieżka do pliku CSS biblioteki, do użycia w dyrektywach @import. */
export const linkCSS = "https://esm.sh/maplibre-gl@5.6.2/dist/maplibre-gl.css";

// Re-eksport kluczowych klas i typów pod ich oryginalnymi nazwami
import {
    Map as MapLibreCore,
    Marker as MapLibreMarker,
    Popup as MapLibrePopup,
    StyleSpecification 
} from "https://esm.sh/maplibre-gl@5.6.2";

export {
    MapLibreCore,
    MapLibreMarker,
    MapLibrePopup
};

export interface MapLibreStyle {
  name: string;
  url: string | StyleSpecification;
}


// * ------------------------------------------------------------------------------------ *
// https://esm.sh/maplibre-gl@5.6.2 (165B)
// https://esm.sh/maplibre-gl@5.6.2/dist/maplibre-gl.d.ts (514.25KB)
// https://esm.sh/maplibre-gl@5.6.2/denonext/maplibre-gl.mjs 
// https://esm.sh/@mapbox/point-geometry@1.1.0/index.d.ts (6.72KB)
// https://esm.sh/@mapbox/tiny-sdf@2.0.7/index.d.ts (550B)
// https://esm.sh/@mapbox/vector-tile@2.0.4/index.d.ts (2.33KB)
// https://esm.sh/@mapbox/point-geometry@1.1.0/index.d.ts *
// https://esm.sh/@types/geojson@7946.0.16/index.d.ts (6.17KB)
// https://esm.sh/@types/geojson-vt@3.2.5/index.d.ts (4.4KB)
// https://esm.sh/@types/geojson@7946.0.15/index.d.ts (4.91KB)
// https://esm.sh/@types/supercluster@7.1.3/index.d.ts (5.59KB)
// https://esm.sh/@types/geojson@7946.0.15/index.d.ts *
// https://esm.sh/pbf@4.0.1/index.d.ts (5.94KB)
// https://esm.sh/@maplibre/maplibre-gl-style-spec@23.3.0/dist/index.d.ts (176.75KB)
// https://esm.sh/@maplibre/maplibre-gl-style-spec@23.3.0/dist/index.d.ts *
// https://esm.sh/gl-matrix@3.4.3/index.d.ts (119KB)
// https://esm.sh/kdbush@4.0.2/index.d.ts (2.28KB)
// https://esm.sh/potpack@2.1.0/index.d.ts (1.36KB)
// * ------------------------------------------------------------------------------------ *
// https://maplibre.org/maplibre-gl-js/docs/
// https://maplibre.org/maplibre-style-spec/
// https://maplibre.org/maplibre-gl-js/docs/plugins/
// * ------------------------------------------------------------------------------------ *
// https://maplibre.org/maputnik/?layer=2811017658%7E0#0.82/0/0
// https://martin.maplibre.org/
// https://maplibre.org/martin/
// * ----
