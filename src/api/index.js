// 当前这个模块：API进行统一管理
import requests from './request'

import mockRequest from './mockAjax'
// 三级联动接口
// /api/product/getBaseCategoryList GET 无参数

// 发请求:axios请求返回结果Promise对象
export const reqCategoryList = ()=>{  
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequest.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

// 获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要带参数
// 当前这个函数需要接收外部传递参数
// 当前这个接口，给服务器传递参数params，至少是一个对象
export const reqGetSearchInfo = (params) => requests({url:"/list", method:"post",data:params})

// 获取产品详情信息的接口 URL:/api/item/{ skuId } 请求方式：get 
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`, method:'get'})

// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

// 获取购物车信息
export const reqCartList = () => requests({url:"/cart/cartList", method:"get"})

// 删除购物产品的接口
// /cart/deleteCart/{skuId} 
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})

// 修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'})  

// 获取验证码
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`, method:'get'})

// 注册
export const reqUserRegister = (data) => requests({url:'/user/passport/register', data, method:'post'})

// 登录
export const reqUserLogin = (data) => requests({url:'/user/passport/login', data, method:'post'})

// 获取用户信息【需要带着用户的token向服务器要用户信息】
// /user/passport/auth/getUserInfo   method: GET  无需带参
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo', method:'get'})

// 退出登录
// /api/user/passport/logout
export const reqLogout = () => requests({url:'/user/passport/logout', method:'get'})

// 获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList', method:'get'})

// 获取商品清单
// /api/order/auth/trade
export const reqOrderInfo = () => requests({url:'/order/auth/trade', method:'get'})

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'})

// 获取支付信息
// /payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
