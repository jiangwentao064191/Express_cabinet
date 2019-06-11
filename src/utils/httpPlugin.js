
import axios from 'axios';
import qs from 'qs';
axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';


//http request 拦截器
// 请求拦截器,POST传参序列化
axios.interceptors.request.use(
  config => {
    let  token = window.localStorage.getItem('token');
    // if(config.method  === 'post'){
    //   config.data = JSON.stringify(config.data);
    // }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if(token){
      config.headers['Authorization']=token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,qs.stringify(data))
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 export function posts(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,JSON.stringify(data))
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
