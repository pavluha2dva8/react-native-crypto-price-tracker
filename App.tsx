import 'react-native-gesture-handler'
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {ListItem} from "./components/ListItem";
import {Chart} from "./components/Chart";
import {getMarketData} from "./services/cryptoService";

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-US');
}

export default function App() {
  const [data, setData] = useState<any>([])
  const [selectedCoinData, setSelectedCoinData] = useState<any>(null)

  console.log(data[0])

  useEffect(() => {
    (async function() {
      const marketData = await getMarketData()
      setData(marketData)
    })()
  }, [])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['45%'], []);
  const openModal = useCallback((item) => {
    setSelectedCoinData(item)
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Markets</Text>
        <View style={styles.divider}/>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChange={item.price_change_percentage_24h}
              image={item.image}
              openModal={() => openModal(item)}/>
          )}
          keyExtractor={item => item.id}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          {selectedCoinData &&
              <Chart
                  name={selectedCoinData.name}
                  symbol={selectedCoinData.symbol}
                  currentPrice={selectedCoinData.current_price}
                  priceChange={selectedCoinData.price_change_percentage_24h}
                  image={selectedCoinData.image}
                  sparkline={selectedCoinData.sparkline_in_7d.price}
              />
          }
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 40,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#A9ABB1',
    marginTop: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
  },
});
