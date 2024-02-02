import {createContext, useEffect, useState} from "react";
import {fakeFetchCrypto, fetchAssets} from "../api.js";
import {percentDifference} from "../utils.js";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
     loading: false,
})

export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        //Делаем запрос при загрузке
        async function preload() {
            //Обозначаем, что идет загрузка
            setLoading(true)

            //Делаем запросы
            const { result } = await fakeFetchCrypto()
            const assets = await fetchAssets()

            //Назначаем в стейт запрошенную информацию
            setAssets(assets.map(asset => {
                //Ищем монету по id
                const coin = result.find(c => c.id === asset.id)
                return {
                    grow: asset.price < coin.price, //Сравниваем цену на монету с момента покупки и текущей цены, boolean
                    growPercent: percentDifference(asset.price, coin.price), //На сколько процентов разница с момента покупки и актуальной стоимости
                    totalAmount: asset.amount * coin.price, //Сколько в деньгах у нас монета
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price, // Сравниваем, по чем покупали и сколько сейчас по курсу
                    ... asset,
                }
            }))
            setCrypto(result)

            //Завершаем загрузку
            setLoading(false)
        }

        preload()
    }, []);

    //Любой компонент сможет иметь доступ к этим данным
    return <CryptoContext.Provider value={{loading, crypto, assets}}>{children}</CryptoContext.Provider>
}

export default CryptoContext