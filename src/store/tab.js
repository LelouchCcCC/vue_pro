import Cookie from 'js-cookie'
import router from "../../router";
export default {
    state:{
        isCollapse: false
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse=!state.isCollapse
        }
    },


    setMenu(state,val){
        state.menu = val
        Cookie.set('menu',JSON.stringify(val))
    },
    clearMenu(state){
        state.menu = []
        Cookie.remove('menu')
    },
    // addMenu(state,val){
    //     if (!Cookie.get('menu')){
    //         return
    //     }
    //     const menu = JSON.parse(Cookie.get('menu'))
    //     state.menu = menu
    //     const menuArray = []
    //     menu.forEach(item=>{
    //         if (item.children) {
    //             item.children = item.children.map(item => {
    //                 item.component = () => import('../../views/${item.url}')
    //                 return item
    //             })
    //             menuArray.push(...item.children)
    //         } else {
    //             item.component = () => import('../../views/${item.url}')
    //             menuArray.push(item)
    //         }
    //     });
    //     //路由的动态添加
    //     menuArray.forEach(item => {
    //         router.addRoute('Main',item)
    //     })
    // }
}