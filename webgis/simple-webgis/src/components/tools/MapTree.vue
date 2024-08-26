<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
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
    name: 'MapTree',
    data() {
      return {
        data: [
          {
            label: '捷泰天域服务',
            children: [
              {
                label: '英文底图',
                children: [
                  {
                    label: '彩色英文底图',
                    layerid: 'layerid',
                    layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/WMTS/1.0.0/WMTSCapabilities.xml',
                  },
                ],
              },
              {
                label: '中文底图',
                children: [
                  {
                    label: '暖色中文底图(不可用)',
                    layerid: 'layerid',
                    layerurl: 'https://t1.tianditu.gov.cn/img_w/wmts?request=GetCapabilities&service=wmts',
                  },
                ],
              },
            ],
          },
          {
            label: 'ArcGIS REST Services',
            children: [
              {
                label: '有文字',
                children: [
                  {
                    label: 'NatGeo_World_Map',
                    layerid:'layerid',
                    layerurl:'https://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer',
                  },                  
                  {
                    label: 'World_Street_Map',
                    layerid:'layerid',
                    layerurl:'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
                  },
                  {
                    label: 'World_Topo_Map',
                    layerid:'layerid',
                    layerurl:'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer',
                  },

                ],
              },
              {
                label: '无文字',
                children: [
                  {
                    label: 'World_Terrain_Base',
                    layerid:'layerid',
                    layerurl:'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
                  },
                  {
                    label: 'World_Physical_Map',
                    layerid:'layerid',
                    layerurl:'https://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer',
                  },
                  {
                    label: 'World_Shaded_Relief',
                    layerid:'layerid',
                    layerurl:'https://services.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer',
                  },
                  {
                    label: 'World_Imagery',
                    layerid:'layerid',
                    layerurl:'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
                  },
                  {
                    label: 'USA_Topo_Maps',
                    layerid:'layerid',
                    layerurl:'https://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer',
                  },
                ],
              },
            ],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
      };
    },
    methods: {
      async handleNodeClick(data) {
        if (data.layerurl) {
          //删除已添加的图层
          const view = this.$store.getters._getDefaultMapView;
          const resultLayer = view.map.findLayerById('layerid');
          if (resultLayer) view.map.remove(resultLayer);
          //处理不同服务类型
          const [TileLayer, FeatureLayer] = await loadModules(
            ['esri/layers/TileLayer', 'esri/layers/FeatureLayer'],
            options,
          );
          const c = data.layerurl.split('/');
          const serverType = c[c.length - 1];
          let layer = '';
          switch (serverType) {
            case 'MapServer':
              layer = new TileLayer({ url: data.layerurl, id: data.layerid });
              break;
            case 'FeatureServer':
              layer = new FeatureLayer({ url: data.layerurl, id: data.layerid });
              break;
            default:
              break;
          }
          view.map.add(layer);
        }
      },
    },
  };
  </script>
  
  <style>
  .maptree-pannel {
    position: absolute;
    top: 90px;
    left: 80px;
    width: 200px;
    height: 300px;
  }
  </style>
  