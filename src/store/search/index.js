import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
}
// 计算属性
// 项目当中getters主要的作用：简化仓库中的数据(简化数据而生)
// 【讲啦组件在获取数据的时候方便】
const getters = {
    // 当前形参state，当前仓库中的state,并非大仓库中的那个state
    goodsList(state){
        // 如果服务器回来，没问题是一个数组
        // 网络不给力|没有网 state.searchList.goodsList返回的式undefined
        // 计算新的属性的属性值至少是一个数组
       return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}