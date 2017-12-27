import axios from 'axios'

const qs = require('qs')

// 这是
axios.defaults.baseURL = ['production', 'staging'].indexOf(process.env.NODE_ENV) > -1 ?
    '/naked' : '/ecreditpal/rest'

// post 数据加上phone和token
axios.interceptors.request.use((config) => {
    // console.log(11)
    // console.log(config)
    return config
}, (error) => {
    console.log(error)
    return Promise.reject('正在更新维护中')
})

axios.interceptors.response.use((response) => {
    // 首页不拦截错误，以防止首页登出
    if (window.location.hash === '#/' && localStorage.getItem('homeActive') === 'borrow') {
        return response ? response.data : {}
    }
    // 拦截code转中文描述
    if (response.data && response.data.members) {
        switch (response.data.members.code) {
            case 100:
                return Promise.reject('验证码输入有误')
            case 101:
                return Promise.reject('发送验证码失败')
            case 102:
                return Promise.reject('用户不存在')
            case 111:
                return Promise.reject('用户不匹配')
            case 112:
                return Promise.reject('进件条件未满足，请检查')
            case 113:
                return Promise.reject('进件失败')
            case 114:
                return Promise.reject('无法重复进件')
            case 115:
                return Promise.reject('不支持的银行卡')
            case 116:
                return Promise.reject('银行卡填写有误')
            case 117:
                return Promise.reject('信息填写(收入范围)有误')
            case 118:
                return Promise.reject('审核中无法修改银行卡')
            case 119:
                return Promise.reject('你有未处理的订单')
            case 120:   // auth接口
                return Promise.reject('系统繁忙，请稍后再试')
            // case 121:  // action接口
            //     return Promise.reject('未找到运营商信息')
            // 不捕获
            // case 121:
            //     return Promise.reject('未找到运营商信息')
            // case 122:
            //     return Promise.reject('服务密码错误，请重新输入')
            case 123:  // validation接口
                return Promise.reject('系统繁忙，请稍后再进行认证')
            // case 124:
            //     return Promise.reject('验证码输入超时，请重新获取')
            case 126:   // status
                return Promise.reject('未知错误，请重新认证')
            // case 129:
            //     return Promise.reject('请求过于频繁，请一分钟后再试')
            // case 1200:
            //     return Promise.reject('服务密码错误，请重新输入')
            // 不捕获
            // case 127:
            //     return Promise.reject('等待中')
            // case 128:
            //     return Promise.reject('短信验证码已发送，请注意查收')

            case 130:
                return Promise.reject('芝麻认证失败')
            case 131:
                return Promise.reject('芝麻分获取失败')
            case 140:
                return Promise.reject('证件照上传失败')
            case 141:
                return Promise.reject('下载失败')
            case 142:
                return Promise.reject('请上传本人手持身份证照片')
            case 150:
                return Promise.reject('下载失败')
            case 170:
                return Promise.reject('微信授权失败')
            case 500:
                return Promise.reject('正在更新维护中')
            case 501:
                let msg = '请求参数错误'
                if (/bankCard/.test(response.data.members.desc)) {
                    msg = '银行卡格式有误'
                }
                return Promise.reject(msg)
            case 502:
                localStorage.clear()
                window.location.href = `${window.location.pathname}#/login`
                return Promise.reject('登录已过期，请重新登录')
            default:
        }
        switch (response.data.members.desc) {
            case 'Invalid Parameters->token':
                localStorage.clear()
                window.location.href = `${window.location.pathname}#/login`
                return Promise.reject('登录已过期，请重新登录')
            default:
            // Promise.reject('正在更新维护中')
        }
    }
    return response ? response.data : {}
}, (error) => {
    console.log(error)
    return Promise.reject('正在更新维护中')
})

axios.formPost = (url, params, config) => {
    const dataStr = qs.stringify(params, {
        arrayFormat: 'brackets'
    })
    return axios.post(url, dataStr, config)
}

export default axios
