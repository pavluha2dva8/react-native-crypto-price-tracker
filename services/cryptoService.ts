import axios from "axios";
import moment from "moment";

const formatSparkline = (prices: Array<number>) => {
  const sevenDaysAgo = moment().subtract(7, 'days').unix()
  return prices.map((price, index) => ({
    timestamp: sevenDaysAgo + (index + 1) * 3600,
    value: price,
  }))
}

const formatMarketData = (data: Array<any>) => {
  return data.map((item: any) => {
    return {...item, sparkline_in_7d: {
      price: formatSparkline(item.sparkline_in_7d.price)
      }}
  })
}

export const getMarketData = async () => {
  try {

    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d')
    const data = response.data
    return formatMarketData(data)

  } catch (error) {
    console.log(error.message)
  }
}
