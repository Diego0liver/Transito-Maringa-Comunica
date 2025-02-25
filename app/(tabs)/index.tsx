import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/catedral-maringa.png')}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Bem vindo!</ThemedText>
            <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Seja bem vindo ao aplicativo</ThemedText>
          <ThemedText type="subtitle">Transito Maringá Comunica</ThemedText>
        </ThemedView>
        <TouchableOpacity onPress={() => router.push('/(tabs)/listaAvisos')} style={styles.buttonHome}>
          <Text style={styles.textButton}>Lista de avisos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/criarAviso')} style={styles.buttonHome}>
          <Text style={styles.textButton}>Criar aviso</Text>
        </TouchableOpacity>
        <ThemedView>
          <Text style={styles.tituloEmergencia}>Emergencias</Text>
          <View style={styles.containerEmergencia}>
            <Text style={styles.txtEmergencia}>Policia: 191</Text>
            <Text style={styles.txtEmergencia}>Bombeiro: 193</Text>
          </View>
          <View style={styles.containerEmergencia}>
            <Text style={styles.txtEmergencia}>Samu: 192</Text>
            <Text style={styles.txtEmergencia}>SEMOB: (44) 3127-7300</Text>
          </View>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonHome: {
    backgroundColor: "#4B89BF",
    alignItems: 'center', 
    justifyContent: 'center',
    height: 80,
    width: 250,
    borderRadius: 19,
    marginTop: 20
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  tituloEmergencia: {
    color: '#fff',
    marginTop: 30,
    fontSize: 20
  },
  txtEmergencia: {
    color: '#fff'
  },
  containerEmergencia: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300
  }
});
