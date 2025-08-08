import type { MapLibreStyle, StyleSpecification } from "$map-libre-gl$";
import { KEY_OF_MAP_TILER } from "./_KEY.ts";

const STYLE_MIERUNE: {[_:string]:StyleSpecification} = {
  COLOR:{
        version: 8,
        sources: {
            m_color: {
                type: 'raster',
                tiles: [
                    'https://tile.mierune.co.jp/mierune/{z}/{x}/{y}@2x.png',
                    //'https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png',
                ],             
                // tileSize: 256,   
                attribution:
                    "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
                }
            },
          layers: [
              {
                  id: 'm_color',
                  type: 'raster',
                  source: 'm_color',
                  minzoom: 0,
                  maxzoom: 18,
              },
          ],
    },
    MONO:{
        version: 8,
        sources: {
            m_mono: {
                type: 'raster',
                tiles: [
                    'https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}@2x.png',
                    //'https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png',
                ],             
                // tileSize: 256,   
                attribution:
                    "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
            }
        },
        layers: [
            {
                id: 'm_mono',
                type: 'raster',
                source: 'm_mono',
                minzoom: 0,
                maxzoom: 18,
            },
        ],
    }
};


// Definiujemy listę dostępnych stylów, które nasz przełącznik będzie wyświetlał.
export const AVAILABLE_STYLES: MapLibreStyle[] = [  
  {
    name: "Toner Lite [Stamen]",
    url: `https://tiles.stadiamaps.com/styles/stamen_toner_lite.json`
  },
  {
    name: "Toner [Stamen]",
    url: `https://tiles.stadiamaps.com/styles/stamen_toner.json`
  },
  {
    name: "Terrain [Stamen]",
    url: `https://tiles.stadiamaps.com/styles/stamen_terrain.json`
  },
  {
    name: "Watercolor [Stamen]",
    url: `https://tiles.stadiamaps.com/styles/stamen_watercolor.json`
  },
  {
    name: "MIERUNE COLOR" ,
    url: STYLE_MIERUNE.COLOR
  },
  {
    name: "MIERUNE MONO" ,
    url: STYLE_MIERUNE.MONO
  },
  {
    name: "Satelita [MapTiler]",
    url: `https://api.maptiler.com/maps/satellite/style.json?key=${KEY_OF_MAP_TILER}`
  },
  {
    name: "ArcGIS Hybrid",
    url: `https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/arcgis_hybrid.json`
  },
  {
    name: "Satelita [Alidade]",
    url: `https://tiles.stadiamaps.com/styles/alidade_satellite.json`
  },
  {
    name: "Ulice (Ciemne) [MapTiler]",
    url: `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${KEY_OF_MAP_TILER}`
  },
  {
    name: "Ulice (Ciemne) [Carto,text]",
    url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
  },
  {
    name: "Ulice (Ciemne) [Carto]",
    url: 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'
  },
  {
    name: "Ulice (Jasne) [MapTiler]",
    url: `https://api.maptiler.com/maps/streets-v2/style.json?key=${KEY_OF_MAP_TILER}`
  },
  {
    name: "Ulice (Jasne) [Carto,text]",
    url: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
  },
  {
    name: "Ulice (Jasne) [Carto]",
    url: 'https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json'
  },
  {
    name: "Ulice (Blade) [Carto,text]",
    url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
  },
  {
    name: "Ulice (Blade) [Carto]",
    url: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'
  },
  {
    name: "Outdoors",
    url: `https://tiles.stadiamaps.com/styles/outdoors.json`
  },
  {
    name: "Bright [Alidade]",
    url: `https://tiles.stadiamaps.com/styles/alidade_bright.json`
  },
  {
    name: "Smooth [Alidade]",
    url: `https://tiles.stadiamaps.com/styles/alidade_smooth.json`
  },
  {
    name: "Smooth Dark [Alidade]",
    url: `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json`
  },
  {
    name: "OSM bright",
    url: `https://tiles.stadiamaps.com/styles/osm_bright.json`
  },
  {
    name: "Demo MapLibre",
    url: "https://demotiles.maplibre.org/style.json"
  },
  
  { 
    name: 'icgc', 
    url: "https://geoserveis.icgc.cat/contextmaps/icgc.json"
  },
  { 
    name: 'icgc_mapa_base_fosc', 
    url: "https://geoserveis.icgc.cat/contextmaps/icgc_mapa_base_fosc.json"
  },
  { 
    name: 'icgc_ombra_hipsometria_corbes', 
    url: "https://geoserveis.icgc.cat/contextmaps/icgc_ombra_hipsometria_corbes.json"
  },
  { 
    name: 'icgc_ombra_fosca', 
    url: "https://geoserveis.icgc.cat/contextmaps/icgc_ombra_fosca.json"
  },
  { 
    name: 'icgc_orto_estandard', 
    url: "https://geoserveis.icgc.cat/contextmaps/icgc_orto_estandard.json"
  },
  { 
    name: 'icgc_orto_estandard_gris', 
    url: "https://geoserveis.icgc.cat/contextmaps/icgc_orto_estandard_gris.json"
  },
  { 
    name: 'icgc_orto_hibrida', 
    url: "https://geoserveis.icgc.cat/contextmaps/icgc_orto_hibrida.json"
  },
  { 
    name: 'icgc_geologic_riscos', 
    url: "https://geoserveis.icgc.cat/contextmaps/icgc_geologic_riscos.json"
  }
];
