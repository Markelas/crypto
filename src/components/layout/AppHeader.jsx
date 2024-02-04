import {Layout, Select, Space, Button} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader() {

    // Нужен чтобы реализовать программное открытие по нажатию на клавишу
    const [select, setSelect] = useState(false)

    // Из контекста, с помощью созданного там хука, берем crypto
    const {crypto} = useCrypto()

    useEffect(() => {
        // Будем отслеживать нажатие на клавишу / и передавать это событие в select, в open, для открытия, отслеживая через стейт
        const keypress = event => {
            if (event.key === '/') {
                //Отслеживаем прошлое состояние
                setSelect((prev) => !prev)
            }
        }
        //При событии нажатия на клавишу, вызываем функцию keypress
        document.addEventListener('keypress', keypress)
        // Если страницу закрываем, то очищаем
        return () => document.removeEventListener('keypress', keypress)
    }, []);


    function handleSelect(value) {
        console.log(value)
    }

    return (
        <Layout.Header style={headerStyle}><Select
            style={{ width: 250 }}
            open={select}
            onSelect={handleSelect}
            onClick={() => setSelect((prev) => !prev)}
            value="press / to open"
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
            <Button type="primary">Add Asset</Button>
        </Layout.Header>
    )
}