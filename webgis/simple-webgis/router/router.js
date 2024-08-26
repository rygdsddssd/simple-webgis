import Vue from 'vue';
import VueRouter from 'vue-router';
import DataVisval from './../pages/DataVisual.vue'
import OneMap from './../pages/OneMap.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: DataVisval
        },
        {
            path: '/onemap',
            component: OneMap
        },
    ],
    mode: 'history'
})
