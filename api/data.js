import axios from "./axios";

export const getMenu = (param) => {
    return axios.request({
        url: '/login',
        method: 'post',
        data: param,
    })
}

export const getHome = () => {
    return axios.request({
        url: '/userhome',
        method: 'post',
    })
}

export const getQuery = (param) => {
    return axios.request({
        url: '/query',
        method: 'post',
        data: param,
    })
}

export const getFeed = (param) => {
    return axios.request({
        url: '/feedback',
        method: 'post',
        data: param,
    })
}

export const getPolicy = (param) => {
    return axios.request({
        url: '/policy',
        method: 'post',
        data: param,
    })
}



export const getLks = () => {
    return axios.request({
        url: '/lks',
        method: 'get',
    })
}

export const getTst = () => {
    return axios.request({
        url: '/tst',
        method: 'get',
    })
}

export const getOnec = (param) => {
    return axios.request({
        url: '/onec',
        method: 'post',
        data: param,
    })
}


