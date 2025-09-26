import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppColors } from '../../theme/Colors';
import Icon from 'react-native-vector-icons/Feather';

type Credential = {
  id: string;
  title: string;
};

type Props = {
  data: Credential[];
  onAccept?: () => void;
  onReject?: () => void;
};

const CredentialListScreen = ({ data, onAccept, onReject }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const renderItem = ({ item }: { item: Credential }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity onPress={() => handleSelect(item.id)}>
        <View style={[styles.card, isSelected && styles.selectedCard]}>
          <View style={styles.row}>
            <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]} />
            <Image
              source={require('../../assets/images/zada_logo.png')}
              style={styles.circleLogo}
            />

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.subtitleRow}>
                <Text style={styles.cardSubtitle}>Open Detail</Text>
                <Icon
                  name="chevron-right"
                  size={24}
                  color={AppColors.BLUE}
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Verify With ZADA</Text>
      </View>

      <View style={styles.body}>
        <Image
          source={require('../../assets/images/zada_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>ZADA Verification</Text>
        <Text style={styles.label}>Please review the request below to share your information.</Text>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListFooterComponent={
            <Text style={styles.footerText}>
              Powered by ZADA • Your data is encrypted and only shared with your consent.
            </Text>
          }
        />
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.acceptButton]}
          onPress={() => selectedId && onAccept?.()}
          disabled={!selectedId}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', backgroundColor: AppColors.BACKGROUND },
  itemList: { flex: 1, backgroundColor: AppColors.WHITE },

  toolbar: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: AppColors.WHITE,
  },
  toolbarTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.BLACK },

  body: { flex: 1, padding: 16, width: '100%' },

  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 16 },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    alignSelf: 'center',
    color: AppColors.BLACK,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: AppColors.BLACK,
    opacity: 0.5,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  selectedCard: {
    borderColor: AppColors.BLUE,
    backgroundColor: AppColors.SELECTED_BACKGROUND_COLOR,
    borderWidth: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 14, color: AppColors.BLUE, fontWeight: 600 },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
  },

  radioButtonSelected: {
    borderColor: AppColors.BLUE,
    borderWidth: 5,
  },

  circleLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  rejectButton: {
    flex: 1,
    marginRight: 8,
    padding: 14,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButton: {
    flex: 1,
    marginLeft: 8,
    padding: 14,
    backgroundColor: AppColors.BRIGHT_GREEN,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: AppColors.WHITE, fontWeight: 'bold' },
  footerText: {
    fontSize: 12,
    color: AppColors.MEDIUM_GRAY,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 16,
  },
});

export default CredentialListScreen;
