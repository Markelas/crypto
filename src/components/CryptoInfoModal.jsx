import React from 'react';
import {Divider, Flex, Tag, Typography} from "antd";

const CoinInfoModal = ({coin}) => {
    return (
        <>
            <Flex align="center">
                <img src={coin.icon} alt={coin.name} style={{width: 40, marginRight: 10}}/>
                <Typography.Title level={2} style={{marginBottom: 0}}>
                    ({coin.symbol}) {coin.name}
                </Typography.Title>
            </Flex>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong>1 hour:</Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'} style={{marginLeft: 7}}>{coin.priceChange1h}%</Tag>
                <Typography.Text strong>1 day:</Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'} style={{marginLeft: 7}}>{coin.priceChange1d}%</Tag>
                <Typography.Text strong>1 week:</Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'} style={{marginLeft: 7}}>{coin.priceChange1w}%</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                {(coin.price).toFixed(8)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price to BTC: </Typography.Text>
                {(coin.priceBtc)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market cap: </Typography.Text>
                {(coin.marketCap).toFixed(8)}$
            </Typography.Paragraph>
            {coin.contractAddress && <Typography.Paragraph>
                <Typography.Text strong>Contract address: </Typography.Text>
                {coin.contractAddress}
            </Typography.Paragraph>}
            <Typography.Paragraph>
                <Typography.Text strong>Website URL: </Typography.Text>
                <a href={coin.websiteUrl}>{coin.websiteUrl}</a>
            </Typography.Paragraph>
        </>
    );
};

export default CoinInfoModal;
