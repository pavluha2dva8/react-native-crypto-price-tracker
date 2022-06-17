import {FC} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {numberFormat} from "../utils";

interface ListItemProps {
  name: string
  symbol: string
  currentPrice: number
  priceChange: number
  image: string
  openModal: () => void
}

export const ListItem: FC<ListItemProps> = ({name, symbol, currentPrice, priceChange, image, openModal}) => {
  const priceChangeColor = priceChange > 0 ? '#34C759' : '#FF3B30'

  return (
    <TouchableOpacity onPress={openModal}>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image source={{uri: image}}
                 style={styles.logo}/>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <Text style={styles.price}>{numberFormat(currentPrice)}</Text>
          <Text style={[styles.priceChange, {color: priceChangeColor}]}>{priceChange.toFixed(2)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 48,
    width: 48,
  },
  titleWrapper: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#A9ABB1',
  },
  rightWrapper: {
    alignItems: 'flex-end'
  },
  price: {
    fontSize: 18,
  },
  priceChange: {
    marginTop: 4,
    fontSize: 14,
    color: 'red',
  }
})
