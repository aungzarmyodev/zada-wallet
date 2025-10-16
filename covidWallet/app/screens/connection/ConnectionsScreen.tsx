import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  RefreshControl,
  Dimensions,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTranslation } from 'react-i18next';
import FlatCard from '../../components/FlatCard';
import OverlayLoader from '../../components/OverlayLoader';
import { themeStyles } from '../../theme/Styles';
import { AppColors, RED_COLOR, SECONDARY_COLOR } from '../../theme/Colors';
import { useAppSelector } from '../../store';
import { selectConnectionsStatus } from '../../store/connections/selectors';
import { showAskDialog } from '../../helpers/Toast';
import { selectDevelopmentMode } from '../../store/app/selectors';
import { IConnectionObject } from '../../store/connections/interface';
import SelectModal from '../../components/Modal/SelectModal';
import useConnections from '../../hooks/useConnections';
import FloatingActionButton from '../../components/Buttons/FloatingActionButton';
import EmptyConnections from './EmptyConnection';

const { height } = Dimensions.get('window');
function ConnectionsScreen() {
  // Selectors
  const { t } = useTranslation();
  const {
    connections,
    connectionlist,
    onAcceptConnection,
    onDeleteConnection,
    refreshConnections,
  } = useConnections();
  const connectionStatus = useAppSelector(selectConnectionsStatus);
  const developmentMode = useAppSelector(selectDevelopmentMode);

  // States
  const [isVisible, setVisible] = useState(false);

  async function handleAddButton() {
    setVisible(true);
  }

  const onConnectionSelect = (label: string, value: string) => {
    onAcceptConnection(value);
    setVisible(false);
  };

  async function onSuccessPress(connection: IConnectionObject) {
    onDeleteConnection(connection.connectionId);
  }

  function onDeletePressed(item: IConnectionObject) {
    showAskDialog(
      'Are you sure you want to delete this connection?',
      'This will also delete all certificates issued by this connection.',
      () => onSuccessPress(item),
      () => {}
    );
  }

  const refreshHandler = () => {
    refreshConnections();
  };

  // Render Item
  const renderItem = (rowData: { item: IConnectionObject }) => {
    let imgURI = rowData.item.imageUrl;
    let header = rowData.item.name != undefined ? rowData.item.name : '';
    return <FlatCard onPress={() => {}} imageURL={imgURI} heading={header} text={''} />;
  };

  const renderHiddenItem = ({ item, index }: { item: IConnectionObject; index: number }) => {
    return (
      <View key={index + item.connectionId} style={styles.rowBack}>
        <Animated.View>
          <TouchableOpacity
            onPress={() => onDeletePressed(item)}
            activeOpacity={0.8}
            style={[styles.swipeableViewStyle]}>
            <MaterialCommunityIcons size={20} name="delete" color={RED_COLOR} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <>
      <View style={themeStyles.mainContainer}>
        {connectionStatus === 'pending' && <OverlayLoader text="Deleting connection..." />}
        {connectionStatus === 'accepting_connection' && (
          <OverlayLoader text="Creating Connection..." />
        )}
        {connections.length > 0 && (
          <View style={styles.row}>
            <MaterialCommunityIcons name="lock" size={16} color={AppColors.BLACK} />
            <Text style={styles.message}>{t('EmptyConnections.secure_message')}</Text>
          </View>
        )}

        <View
          style={styles.viewStyle}
          pointerEvents={connectionStatus === 'pending' ? 'none' : 'auto'}>
          <SwipeListView
            showsVerticalScrollIndicator={false}
            refreshControl={
              connections.length > 0 ? (
                <RefreshControl
                  tintColor={'#7e7e7e'}
                  refreshing={connectionStatus === 'loading'}
                  onRefresh={refreshHandler}
                />
              ) : undefined
            }
            useFlatList
            disableRightSwipe
            disableLeftSwipe={!developmentMode}
            ListEmptyComponent={EmptyConnections}
            data={connections}
            style={styles.flatListStyle}
            contentContainerStyle={styles.flatListStyle}
            keyExtractor={(rowData, index) => {
              return index + rowData.connectionId;
            }}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </View>
      </View>

      <>
        <View style={{ bottom: 10 }}>
          <FloatingActionButton buttonColor={AppColors.PRIMARY} onPress={handleAddButton} />
        </View>

        <SelectModal
          title={t('ConnectionsScreen.select_connections')}
          subTitle="Select a connection to add"
          isVisible={isVisible}
          data={connectionlist}
          onSelect={onConnectionSelect}
          onClose={() => setVisible(false)}
        />
      </>
    </>
  );
}

const styles = StyleSheet.create({
  viewStyle: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  EmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  message: {
    color: AppColors.TEXT_LABEL_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 8,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  flatListStyle: {
    flexGrow: 1,
  },
  swipeableViewStyle: {
    width: 40,
    height: 40,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.BACKGROUND,
    borderRadius: 30,
    shadowColor: SECONDARY_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    marginBottom: 8,
  },
});

export default ConnectionsScreen;
