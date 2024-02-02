import React, {useEffect, useState} from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {Layout, Card, Statistic, List, Typography, Spin } from "antd";
import {fakeFetchCrypto, fetchAssets} from "../../api.js";
import {percentDifference} from "../../utils.js";

const siderStyle = {
    padding: '1rem',
};

const AppSider = () => {

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

    //Отображаем спиннер, если идет загрузка
    if (loading) {
        return <Spin fullscreen />
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                    <Statistic
                        title={asset.id}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{
                            color: asset.grow
                                ? '#3f8600'
                                : '#cf1322'
                        }}
                        prefix={asset.grow
                            ? <ArrowUpOutlined />
                            : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size="small"
                        dataSource={[
                            {title: 'Total profit', value: asset.totalProfit},
                            {title: 'Asset Amount', value: asset.amount, isPlain: true},
                            {title: 'Difference', value: asset.growPercent},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                {/*Если параметру не нужны доп символы, % или $, то отображаем этот спан*/}
                                {item.isPlain && <span>{item.value}</span>}

                                {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    );
};

export default AppSider;
