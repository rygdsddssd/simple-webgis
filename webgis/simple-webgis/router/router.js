import Vue from 'vue';
import VueRouter from 'vue-router';
import DataVisval from './../pages/DataVisual.vue';
import OneMap from './../pages/OneMap.vue';
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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