import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../../theme/Colors';
import CredentialItem from './components/CredentialItem';
import EmptyCredentialList from './components/EmptyCredentialList';
import { useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import NoInternetScreen from '../../Utils/NoInternetScreen';

const WALLET_DATA = [
  { id: '1', title: 'Main Wallet', balance: '$1,200' },
  { id: '2', title: 'Savings Wallet', balance: '$3,450' },
  { id: '3', title: 'Crypto Wallet', balance: '$980' },
  { id: '4', title: 'Travel Wallet', balance: '$560' },

  { id: '5', title: 'Main Wallet', balance: '$1,200' },
  { id: '6', title: 'Savings Wallet', balance: '$3,450' },
  { id: '7', title: 'Crypto Wallet', balance: '$980' },
  { id: '8', title: 'Travel Wallet', balance: '$560' },

  { id: '9', title: 'Main Wallet', balance: '$1,200' },
  { id: '10', title: 'Savings Wallet', balance: '$3,450' },
  { id: '11', title: 'Crypto Wallet', balance: '$980' },
  { id: '12', title: 'Travel Wallet', balance: '$560' },
];

const WalletScreen = () => {
  const networkStatus = useAppSelector(selectNetworkStatus);
  console.log('Network status', networkStatus);

  const [searchText, setSearchText] = useState('');

  const filteredData = WALLET_DATA.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const onItemClick = useCallback((item: any) => {
    Alert.alert('Item clicked', `You clicked item: ${item.type}`, [{ text: 'OK' }]);
  }, []);

  const credentialItem = useCallback(({ item }: { item: any }) => {
    return (
      <CredentialItem
        item={item}
        onItemClick={() => {
          onItemClick(item);
        }}
      />
    );
  }, []);

  const emtpyList = () => {
    return <EmptyCredentialList />;
  };

  if (networkStatus === 'disconnected') {
    return <NoInternetScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <TextInput
          placeholder="Search wallet..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        <FlatList
          data={[]}
          style={styles.credentailList}
          keyExtractor={item => item.id}
          renderItem={credentialItem}
          ListEmptyComponent={emtpyList}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.PRIMARY,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: AppColors.WHITE,
    marginVertical: 16,
  },
  credentailList: {
    backgroundColor: AppColors.BACKGROUND,
  },
});

export default WalletScreen;
