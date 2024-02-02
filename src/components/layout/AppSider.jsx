import React, {useContext, useEffect, useState} from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {Layout, Card, Statistic, List, Typography, Spin, Tag  } from "antd";
import {capitalize} from "../../utils.js";
import CryptoContext from "../../context/crypto-context.jsx";

const siderStyle = {
    padding: '1rem',
};

const AppSider = () => {

    //Получаем из контекста информацию
    const { assets} = useContext(CryptoContext);


    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                    <Statistic
                        title={capitalize(asset.id)}
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
                            {title: 'Total profit', value: asset.totalProfit, withTag: true},
                            {title: 'Asset Amount', value: asset.amount, isPlain: true},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                {/*Если параметру не нужен доп символ $, то отображаем этот спан*/}
                                <span>
                                    {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                    {item.isPlain && item.value}

                                    {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    );
};

export default AppSider;
