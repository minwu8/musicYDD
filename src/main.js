import Vue from 'vue'
import App from './App.vue'
import '@/mobile/flexible'
import '@/styles/reset.css'
import { router } from '@/router'

Vue.config.productionTip = false

// tabbar组件
import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, Icon, Search, List } from 'vant';
// 测试封装的api
import { recommendMusicAPI } from '@/api'
async function fn() {
    const res = await recommendMusicAPI()
    console.log(res);
}
fn()


Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar)
Vue.use(Col);
Vue.use(Row);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')