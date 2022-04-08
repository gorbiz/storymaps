<script setup>
import { ref, onMounted } from 'vue' // vue Related methods
import { Map, View } from 'ol' // Map instance method 、 View method,
import Tile from 'ol/layer/Tile' // Tile rendering method
import OSM from 'ol/source/OSM' // OSM tiles 【OSM Cannot be used in actual development , because OSM There's something wrong with the border of China map in ！！！！】
import 'ol/ol.css' // Map style

import settlements from '../settlements'
console.log({ settlements })

defineProps({
  msg: String
})

const count = ref(0)

const map = ref(null) // Store map instances
function initMap() {
  // Examples of maps
  map.value = new Map({
    target: 'map', // In the corresponding page id by map The elements of
    layers: [ // Layers
      new Tile({ // Using tile rendering methods
        source: new OSM() // Layer data source
      })
    ],
    view: new View({ // Map view
      projection: "EPSG:4326", // Coordinate system , Yes EPSG:4326 and EPSG:3857
      center: [114.064839, 22.548857], // Shenzhen coordinates
      minZoom: 10, // Map zoom minimum level
      zoom: 12 // Map zoom level （ The default level when opening a page ）
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
.map__x {
  width: 600px;
  height: 600px;
  border: 1px solid #eee;
}
</style>
