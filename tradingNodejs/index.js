const ccxt = require('ccxt')
const moment = require('moment')
const delay = require('delay')

const binance = new ccxt.binance({
    'apiKey': '297uNOyG7jSWmiSSh1hRgZXvVMqoiJsW6Mt8376p4ArIbscupzzueDg9fqpKISV9',
    'secret': 'YZrqLv7pWdnAEGepuHKSiRXoFxczsOJkw28Cduv2SAAbcANLtVKfXkbLy10xsyS3',
    // 'apiKey': '5rFV5BHTujXvCQTh6qi7toahWv0MEnAFnbkDz3pxz4lPOtcv2LPAimzEgYMg8Dkx',
    // 'secret': 'qblDmSs3wcTt0r4wBXY7wG6guquhZ3Bw35q3hgXL3J6EtKrvWqlOAOxhPsDLD62f',
});

binance.setSandboxMode(true)
async function printBalance(btcPrice) {
    const balance = await binance.fetchBalance();
    console.log(`Balance: BTC ${balance.total.BTC}, USDT ${balance.total.USDT}.`)
    console.log(`Balance: USDT-total ${(balance.total.BTC) * btcPrice + balance.total.USDT}. \n`)
    console.log(`Tiền lãi/Lỗ : ${ (balance.total.BTC * btcPrice + balance.total.USDT) -71741  } \n`)
}
async function getBalance() {
	return await binance.fetchBalance().total
}
async function tick() {
    const prices = await binance.fetchOHLCV('BTC/USDT', '1m', undefined, 5)
    const bPrices = prices.map(price => {
        return {
            timestamp: moment(price[0]).format(),
            open: price[1], hight: price[2], low: price[3], close: price[4], vol: price[5]
        }
    })
    const avg = bPrices.reduce((acc, price) => acc + price.close, 0) / 5
    const lastPrice = bPrices[bPrices.length - 1].close
    const direction = lastPrice > avg ? 'sell' : 'buy'
    const tradeSize = 100
    const quantity = 0.01
    if (getBalance().BTC < quantity && direction === 'sell') {
        console.log('Đã hết BTC không thể bán')
    } else if (getBalance().USDT < lastPrice && direction === 'buy') {
        console.log('Đã hết USDT không thể mua')
    } else {
        var oder = await binance.createMarketOrder('BTC/USDT', direction, quantity)
        console.log(`Giá trung bình: ${avg}. Giá cuối:${lastPrice}`)
        console.log(`${moment().format()}: ${direction} ${quantity} BTC at ${lastPrice}`)
    }
    printBalance(lastPrice)
}
async function main() {
    while (true) {
        await tick()
        await delay(60 * 1000)
    }
}
main()
