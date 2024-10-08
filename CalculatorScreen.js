import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalculatorScreen({ navigation }) {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [masse, setMasse] = useState('');
  const [ref, setRef] = useState('');
  const [V, setV] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = async () => {
    const num1 = parseFloat(v1);
    const num2 = parseFloat(v2);
    const m = parseFloat(masse);
    if (!isNaN(num1) && !isNaN(num2) && !isNaN(m) && num1<num2) {
      const calculatedV = num2 - num1;
      const calculatedResult = m / calculatedV;
      setV(calculatedV.toFixed(4));
      setResult(calculatedResult.toFixed(4));

      // Sauvegarder le calcul dans l'historique
      try {
        const history = await AsyncStorage.getItem('calculationHistory');
        const parsedHistory = history ? JSON.parse(history) : [];
        const currentDate = new Date();
        const formattedDate = String(currentDate.getDate()) + '-' + String(currentDate.getMonth() + 1) + '-' + String(currentDate.getFullYear());
        const newCalculation = {
          id: Date.now(),
          Date: formattedDate,
          Reference: ref,
          masse: m,
          v1: num1,
          v2: num2,
          V: calculatedV,
          result: calculatedResult,
        };
        await AsyncStorage.setItem('calculationHistory', JSON.stringify([newCalculation, ...parsedHistory]));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du calcul:', error);
      }
    } else {
      setV('Erreur');
      setResult('Erreur');
    }
  };

  const clearInputs = () => {
    setV1('');
    setV2('');
    setMasse('');
    setRef('');
    setV('');
    setResult('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Calculer la densité</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Reference: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setRef}
              value={ref}
              keyboardType="numeric"
              placeholder="Entrer l'echentillent"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Masse:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setMasse}
              value={masse}
              keyboardType="numeric"
              placeholder="Entrer la masse"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>V1:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setV1}
              value={v1}
              keyboardType="numeric"
              placeholder="Entrer V1"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>V2:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setV2}
              value={v2}
              keyboardType="numeric"
              placeholder="Entrer V2"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={calculateResult}>
              <Text style={styles.buttonText}>Calculer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearInputs}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>V: <Text style={styles.resultText}>{V}</Text></Text>
            <Text style={styles.resultLabel}>Résultats: <Text style={styles.resultText}>{result}</Text></Text>
          </View>
          <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('History')}>
            <Text style={styles.historyButtonText}>Voir l'historique</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      gradient: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
      },
      card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
      },
      inputContainer: {
        marginBottom: 15,
      },
      label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
      },
      input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      button: {
        backgroundColor: '#4c669f',
        padding: 15,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
      },
      clearButton: {
        backgroundColor: '#192f6a',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      resultContainer: {
        marginTop: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
      },
      resultLabel: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
      },
      resultText: {
        fontWeight: 'bold',
        color: '#4c669f',
      },
  historyButton: {
    backgroundColor: '#192f6a',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  historyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});