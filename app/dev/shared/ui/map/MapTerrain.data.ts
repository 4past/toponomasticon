import type { SourceSpecification, LayerSpecification } from "$map-libre-gl$";
import { KEY_OF_MAP_TILER } from "./_KEY.ts";

/**
 * Definicja źródła danych dla terenu 3D.
 * Używamy darmowego źródła danych o wysokości terenu od Maptiler.
 */
export const TERRAIN_SOURCE: SourceSpecification = {
    type: 'raster-dem',
    url: `https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=${KEY_OF_MAP_TILER}`,
    tileSize: 256
};

/**
 * Definicja warstwy 'hillshade', która wizualizuje cieniowanie terenu,
 * nadając mu wrażenie trójwymiarowości.
 */
export const HILLSHADE_LAYER: LayerSpecification = {
    id: 'hillshade',
    source: 'terrain-data', // Odwołuje się do ID źródła, które dodamy do mapy
    type: 'hillshade',
    paint: {
        'hillshade-illumination-direction': 285,
        'hillshade-shadow-color': '#001',
        'hillshade-highlight-color': '#002',
        'hillshade-accent-color': '#000',
    }
};
