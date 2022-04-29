<script setup>
import { ref, onMounted } from 'vue' // vue Related methods
import { Map, View } from 'ol' // Map instance method 、 View method,
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer' // Tile rendering method
import { XYZ, Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'

import 'ol/ol.css' // Map style

defineProps({
  msg: String
})

const count = ref(0)

const map = ref(null) // Store map instances
function initMap() {

  function makeVectorLayer () {
    function getStyles (feature) {
      const styles = {
        Point: new Style({
          image: new CircleStyle({
            radius: 5,
            fill: null,
            stroke: new Stroke({ color: 'red', width: 1 })
          }),
          text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({
              color: '#fff', width: 2
            }),
            // get the text from the feature - `this` is ol.Feature
            // and show only under certain resolution
            text: 'Çatalhöyük',
            // FIXME see https://stackoverflow.com/questions/39006597/openlayers-3-add-text-label-to-feature
            // text: feature.get('description'),
            offsetX: 0,
            offsetY: -12.5
          })
        })
      }
      return styles
    }
    const styleFunction = function (feature) {
      const styles = getStyles(feature)
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
          description: 'Çatalhöyük',
          geometry: {
            type: 'Point',
            description: 'Çatalhöyük',
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
      // TODO Jerico | أريحا
    }

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject)
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction
    })

    return vectorLayer
  }

  map.value = new Map({
    target: 'map', // In the corresponding page id by map The elements of
    layers: [ // Layers
      new TileLayer({ // Using tile rendering methods
        source: new XYZ({
          // Some satelite data...
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          // maxZoom: 19
        })
      }),
      makeVectorLayer()
    ],
    view: new View({ // Map view
      projection: "EPSG:3857", // Coordinate system
      center: [4138265.134433, 4493530.679212], // Çatalhöyük coordinates (EPSG:3857)
      // projection: "EPSG:4326", // Coordinate system
      // center: [114.064839, 22.548857], // Shenzhen coordinates (EPSG:4326)
      // minZoom: 10,
      zoom: 5
    })
  })
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div id="map" class="map__x"></div>
</template>

<style scoped>
/* @import "node_modules/ol/ol.css"; */
.map__x {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
