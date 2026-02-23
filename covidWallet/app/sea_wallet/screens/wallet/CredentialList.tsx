import React, { useCallback, useRef, useState } from 'react';

import { View, StyleSheet, TextInput, FlatList, Alert, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { AppColors } from '../../../theme/Colors';

import CredentialItem from './components/CredentialItem';
import EmptyCredentialList from './components/EmptyCredentialList';
import NoInternetScreen from '../../common/NoInternetScreen';
import { AppRoutes, useAppNavigation } from '../../navigation/Types';

import { RootState, useAppDispatch, useAppSelector } from '../../../store';
import { selectNetworkStatus } from '../../../store/app/selectors';
import {
  fetchCredentialsStatus,
  selectSearchedCredentials,
} from '../../../store/credentials/selectors';
import { fetchCredentials } from '../../../store/credentials/thunk';

import { _showAlert } from '../../../helpers/Toast';
import { ICredentialObject, ICredentialObjectValues } from '../../../store/credentials/interface';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getCredentialTemplate,
  replacePlaceHolders,
  sharePDF,
} from '../../../screens/credential/utils';
import { parse_date_time } from '../../../helpers';
import ViewShot from 'react-native-view-shot';
import OverlayLoader from '../../../components/OverlayLoader';
import QRCode from 'react-native-qrcode-svg';

const CredentialList = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const networkStatus = useAppSelector(selectNetworkStatus);
  const viewShotRef = useRef<ViewShot>(null);

  const dispatch = useAppDispatch();
  const { initial, loading } = useAppSelector(fetchCredentialsStatus);

  const [searchKeyword, setSearchKeyword] = useState('');
  const credentialList = useAppSelector((state: RootState) =>
    selectSearchedCredentials(state, searchKeyword)
  );

  const [selectedCredential, setSelectedCredential] = useState<ICredentialObject | null>(null);
  const [isGeneratingPDF, setGeneratingPDF] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (networkStatus !== 'connected') {
        _showAlert(t('errors.no_internet_title'), t('errors.no_internet_message'));
        return;
      }
      if (initial) {
        dispatch(fetchCredentials() as any);
      }
    }, [initial, networkStatus])
  );

  const onItemClick = useCallback((item: ICredentialObject) => {
    navigation.navigate(AppRoutes.CredentialDetail, { credentialId: item.credentialId });
  }, []);

  const shareCredential = async (item: ICredentialObject) => {
    setSelectedCredential(item);
    if (networkStatus === 'disconnected') {
      _showAlert(t('errors.no_internet_title'), t('errors.no_internet_message'));
      return;
    }
    setGeneratingPDF(true);
    try {
      // Ordering data
      const orderedData = (Object.keys(item.values) as (keyof ICredentialObjectValues)[])
        .sort()
        .reduce((obj: any, key) => {
          obj[key] = item.values[key];
          return obj;
        }, {});
      // Making html to be injected later as {key: value} pair.
      let credentialDetails = Object.keys(orderedData).map((key, index) => {
        let value = orderedData[key];
        value = parse_date_time(value);
        if (index % 3 === 0) {
          return `
              <tr>
              <td class="tds">
                <p class="pt">${key}: <strong>${value}</strong></p>
              </td>`;
        } else if ((index - 1) % 3 === 2) {
          return `</tr>`;
        } else {
          return `
              <td class="tds">
                <p class="pt">${key}: <strong>${value}</strong></p>
              </td>`;
        }
      });
      // Getting template
      let template = await getCredentialTemplate(item.schemaId, item.definitionId);

      // Capturing QR image using viewshot library.
      if (!viewShotRef.current || !viewShotRef.current.capture) {
        console.warn('ViewShot ref or capture method not ready');
        return;
      }
      const qrUrl = await viewShotRef.current.capture();

      // Injecting data into template
      let htmlStr = template.file;
      htmlStr = replacePlaceHolders(
        htmlStr,
        {
          ...orderedData,
          qrUrl,
          logo: item.imageUrl,
          type: item.type,
          organizationName: item.organizationName,
        },
        credentialDetails
      );

      await sharePDF(htmlStr, item.type ?? 'Credential');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const credentialItem = useCallback(
    ({ item }: { item: ICredentialObject }) => {
      return (
        <CredentialItem
          item={item}
          onItemClick={() => onItemClick(item)}
          shareItem={() => shareCredential(item)}
        />
      );
    },
    [onItemClick]
  );

  const emtpyList = () => {
    return <EmptyCredentialList />;
  };

  if (networkStatus === 'disconnected') {
    return <NoInternetScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />

        <TextInput
          placeholder={t('Search')}
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>
      <FlatList
        data={credentialList}
        style={styles.credentailList}
        keyExtractor={item => item.credentialId}
        renderItem={credentialItem}
        ListEmptyComponent={emtpyList}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
      />
      {isGeneratingPDF && <OverlayLoader text={t('messages.generating_new_pdf')} />}
      {/* qr code  */}
      <View style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
        <ViewShot ref={viewShotRef} options={{ fileName: 'QRCode', format: 'png', quality: 0.9 }}>
          <QRCode
            value={JSON.stringify(selectedCredential?.qrCode)}
            backgroundColor={AppColors.BACKGROUND}
            size={Dimensions.get('window').width * 0.7}
            ecl="L"
          />
        </ViewShot>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  credentailList: {
    backgroundColor: AppColors.BACKGROUND,
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 12,
  },

  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    backgroundColor: AppColors.WHITE,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: AppColors.LIGHT_GRAY,
  },
});

export default CredentialList;
