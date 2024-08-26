<template>
  <div id="mapview"></div>
</template>

<script>
//引入loadModules
import { loadModules } from 'esri-loader';
const options = {
  //引入ArcGIS API
  url: 'https://js.arcgis.com/4.18/init.js',
  css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};
export default {
  name: 'MapView',
  components: {},
  //mounted 生命周期函数，在MapView组件创建完成之后就会执行里面的函数
  mounted: function () {
    this._createMapView();
  },
  methods: {
    //   创建地图视图
    //async await是成对出现的，意思是把那些模块加载完成之后才可以执行后面的代码
    async _createMapView() {
      const [Map, MapView, Basemap, TileLayer, BasemapToggle] = await loadModules(
        ['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/TileLayer','esri/widgets/BasemapToggle'],
        options
      );
      let basemap = new Basemap({
        baseLayers: [
          new TileLayer({
            //注记
            url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
            title: 'Basemap',
          }),
          /*
            new TileLayer({//注记
              url: 'https://basemaps.geosceneonline.cn/t/cia_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cia&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL=',
              title: 'Basemap1',
            }),
            new TileLayer({//底图
              url: 'https://basemaps.geosceneonline.cn/t/img_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL=',
              title: 'Basemap2',
            }),*/
        ],
        title: 'basemap',
        id: 'basemap',
      });
      const map = new Map({
        basemap: basemap,
      });
      const view = new MapView({
        container: 'mapview',
        center: [108, 32],
        map: map,
        zoom: 5,
      });
      const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: 'hybrid',
      });
      view.ui.add(basemapToggle,{
        position: 'bottom-right',
      });
      this.$store.commit('_setDefaultMapView', view);
      console.log(this.$store.getters._getDefaultMapView);
    },
  },
};
</script>

<style>
#mapview {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
