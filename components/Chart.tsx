import {FC} from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {LineChart} from 'react-native-wagmi-charts';

import {numberFormat} from "../utils";

interface ChartProps {
  name: string
  symbol: string
  currentPrice: number
  priceChange: number
  image: string
  sparkline: any
}

const {width: SIZE} = Dimensions.get('window')

export const Chart: FC<ChartProps> = ({name, symbol, currentPrice, priceChange, image, sparkline}) => {
  const priceChangeColor = priceChange > 0 ? '#34C759' : '#FF3B30'

  return (
    <LineChart.Provider data={sparkline}>
      <View style={styles.chartWrapper}>

        <View style={styles.titlesWrapper}>

          <View style={styles.titles}>
            <View style={styles.upperLeftTitle}>
              <Image style={styles.logo} source={{uri: image}}/>
              <Text style={styles.title}>{name} ({symbol.toUpperCase()})</Text>
            </View>
            <Text style={styles.title}>7d</Text>
          </View>

          <View style={styles.titles}>
            <Text style={styles.price}>{numberFormat(currentPrice)}</Text>
            <Text style={[styles.priceChange, {color: priceChangeColor}]}>{priceChange.toFixed(2)}%</Text>
          </View>

        </View>

        <View style={styles.chartLineWrapper}>
          <LineChart height={SIZE / 2}>
            <LineChart.Path/>
            <LineChart.CursorCrosshair>
              <LineChart.Tooltip/>
            </LineChart.CursorCrosshair>
          </LineChart>
        </View>

      </View>
    </LineChart.Provider>
  )
}

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16
  },
  titlesWrapper: {
    marginHorizontal: 16
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  upperLeftTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  title: {
    fontSize: 14,
    color: '#A9ABB1'
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  priceChange: {
    fontSize: 18
  },
  chartLineWrapper: {
    marginTop: 20,
  },
})
