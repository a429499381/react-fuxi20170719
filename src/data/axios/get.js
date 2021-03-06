import axios from 'axios'

import * as code from './config'
// https://bird.ioliu.cn/ 跨域代理网站

export  const getJson = (id) => {
   const url = `http://m.ximalaya.com/tracks/${id}.json`

     return axios.get(code.CODEURL + url)
}


export  const getHome = () => {
  const url = 'http://m.ximalaya.com'

  return axios.get(code.CODEURL + url)
}


export  const Search = (id) => {
  const url = 'http://m.ximalaya.com/search/' + id

  return axios.get(code.CODEURL + url).then(res => {
      if(res.status == 200) {
          return res
      }
      console.log('axios 第二次 请求')
      axios.get(code.CODEURL + url)
  })
}

export const GetId = (id) => {
    const url = 'http://m.ximalaya.com' + id
    // return axios.get(code.CODEURL + url)

    return axios.get(code.CODEURL + url).then(res => {
        if(res.status == 200) {
            return res
        }
        console.log('axios 第二次 请求')
        axios.get(code.CODEURL + url)
    })
}
