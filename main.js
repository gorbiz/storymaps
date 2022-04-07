import './style.css'
import GeoJSON from 'ol/format/GeoJSON'
import { Map, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'

import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text
} from 'ol/style'
import { OSM, XYZ, Vector as VectorSource } from 'ol/source'

const image = new CircleStyle({
  radius: 5,
  fill: null,
  stroke: new Stroke({ color: 'red', width: 1 })
})

const styles = {
  Point: new Style({ image })
}

const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()]
}

const geojsonObject = {
  type: 'FeatureCollection',
  crs: {
    type: 'name',
    properties: {
      name: 'EPSG:3857'
    }
  },
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        // name: 'Çatalhöyük'
        // Founded: Approximately 7100 BC
        // Abandoned: Approximately 5700 BC
        // Population: around 10,000
        // 37°40′00″N 32°49′41″E
        // coordinates: [4e5, -5e6]
        // Found here: http://epsg.io/map#srs=3857&x=4138256.012305&y=4493515.820440&z=19&layer=satellite
        coordinates: [4138265.134433, 4493530.679212]
      }
    }
  ]
}

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject)
})

// vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction
})

const map = new Map({
  layers: [
    new TileLayer({
      source: new XYZ({
        // Some satelite data...
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 19
      })
    }),
    vectorLayer
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
})
