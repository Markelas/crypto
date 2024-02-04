import React, {useRef, useState} from 'react';
import {Flex, Select, Space, Typography, Divider, Form, Button, DatePicker, InputNumber, Result} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import CoinInfo from "./CoinInfo.jsx";

const addAssetForm = ({ onClose }) => {
    const [form] = Form.useForm()
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false);
    // useRef не вызывает цикл рендеринга
    const assetRef = useRef();

    const validateMessages = {
        required: "${label} is required!",
        types: {
            number: "${label} in not valid number"
        },
        number: {
            range: "${label} must be between ${min} and ${max}"
        }
    };


    //Будем отображать форму, только после выбора монеты
    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
                placeholder="Select coin"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        {/* option.data это так требует оборачивать информацию библиотеку */}
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                    </Space>
                )}
            />
        )
    }


    // Функция, которая срабатывает при отправке формы
    function onFinish(values) {
        //Создаем новую информацию по купленной монете, в форме
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        console.log(newAsset);
        //Используем реф и передаем полученные значения в переменную assetRef, далее используем ее
        assetRef.current = newAsset;
        //Для отображения информации, что монета добавлена
        setSubmitted(true);
        //Добавляем информацию о купленных монетах в side bar
        addAsset(newAsset);
    }

    // Функция, которая подставляет в total сумму, которую заплатили в $
    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }

    // Показываем информацию, что форма была отправлена
    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price} $`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price.toFixed(4),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >

            <CoinInfo coin={coin}/>

            <Divider/>

            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber
                    placeholder='Enter coin amount'
                    onChange={handleAmountChange}
                    style={{width: '100%'}}
                />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
            >
                <InputNumber
                    onChange={handlePriceChange}
                    style={{width: '100%'}}
                />
            </Form.Item>

            <Form.Item
                label="Date and time"
                name="date"
            >
                <DatePicker showTime format="DD.MM.YYYY HH:mm" />
            </Form.Item>

            <Form.Item
                label="Total ($)"
                name="total"
            >
                <InputNumber disabled style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
            >
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default addAssetForm;
