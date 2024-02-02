import {cryptoAssets, cryptoData} from "./data.js";

//Так как данные о крпипте у нас уже есть, новые запросы с сервера делать не будем
export function fakeFetchCrypto() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1)
    })
}

export function fetchAssets() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
    })
}