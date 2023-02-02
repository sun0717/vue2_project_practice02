import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout} from '@/api'
import { setToken, getToken, removeToken} from '@/utils/token'
// 登录与注册模块
const state = {
    code:"",
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEARUSERINFO(state) {
        // 清除仓库中相关用户信息
        state.token = '',
        state.userInfo = ''
        // 本地存储数据清空
        removeToken()
    }
} 
const actions = {
    // 获取验证码
    async getCode({commit}, phone) {
        // 获取验证码的接口：把验证码返回，正常情况下，后台把验证码发到用户手机上【省钱】
        let result = await reqGetCode(phone)
        // console.log(result)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({commit}, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        } 
    },
    // 用户登录
    async userLogin({commit}, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            // 用户已经登陆成功且获取到token
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            // 提交用户信息
            commit("GETUSERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出用户登录
    async userLogout({commit}) {
        let result = await reqLogout()
        if (result.code == 200) {
            // 清除state中的数据，action不能直接操作state，放到mutations中做
            commit('CLEARUSERINFO')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
}
export default {
    state,
    mutations,
    actions,
    getters
}