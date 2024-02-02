import React, {useContext} from 'react';
import AppHeader from "./AppHeader.jsx";
import {Layout, Spin} from "antd";
import AppSider from "./AppSider.jsx";
import AppContent from "./AppContent.jsx";
import CryptoContext from "../../context/crypto-context.jsx";

const AppLayout = () => {
    const {loading} = useContext(CryptoContext)

    //Отображаем спиннер, если идет загрузка
    if (loading) {
        return <Spin fullscreen />
    }

    return (
        <div>
            <Layout>
                <AppHeader/>
                <Layout>
                    <AppSider/>
                    <AppContent/>
                </Layout>
            </Layout>
        </div>
    );
};

export default AppLayout;
