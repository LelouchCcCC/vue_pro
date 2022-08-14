import Vue from 'vue'
import App from './App.vue'
import {
    Checkbox,
    Avatar,
    Button,
    Select,
    Container,
    Aside,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Card,
    Table,
    TableColumn,
    Form,
    FormItem,
    Input,
    Message,
    Pagination,
    DatePicker,
    Divider,

} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router'
import http from 'axios'
import store from '../src/store'
import 'default-passive-events'
import * as echarts from 'echarts'
import axios from "axios";
Vue.prototype.$echarts = echarts
require('echarts/extension/bmap/bmap')
import uploader from "vue-simple-uploader";

Vue.use(uploader)
import VueAxios from "vue-axios";

Vue.use(VueAxios)
Vue.use(Button);
Vue.use(Select);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Avatar);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Divider)


Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$message = Message

router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.user.token
    if (to.meta.requireAuth) {
        if (!token && to.name !== 'Login') {
            next({name: 'Login'})
        } else if (token && to.name === 'Login') {
            next({name: 'Home'})
        } else {
            next()
        }
    }
    next()
})
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
