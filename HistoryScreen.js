import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('calculationHistory');
      if (savedHistory !== null) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('calculationHistory');
      setHistory([]);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>Reference: {item.Reference}</Text>
      {/* <Text style={styles.historyText}>Date: {item.Date}</Text> */}
      <Text style={styles.historyText}>Masse: {item.masse}</Text>
      <Text style={styles.historyText}>V1: {item.v1}</Text>
      <Text style={styles.historyText}>V2: {item.v2}</Text>
      <Text style={styles.historyText}>V: {item.V.toFixed(4)}</Text>
      <Text style={styles.historyText}>Résultat: {item.result.toFixed(4)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Historique des calculs</Text>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Text style={styles.menuButton}>...</Text>
        </TouchableOpacity>
        {showMenu && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.menuItem}>Effacer l'historique</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucun calcul enregistré</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    fontSize: 24,
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  menuItem: {
    padding: 15,
    fontSize: 16,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  historyText: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});