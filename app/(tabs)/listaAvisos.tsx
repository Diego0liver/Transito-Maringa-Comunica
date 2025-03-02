import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import firebase from '../config/db/firebase';
import { useEffect, useState } from 'react';
import * as Network from 'expo-network';

export default function ListaAvisos() {
    const [avisos, setAvisos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        const checkConnection = async () => {
            const networkState = await Network.getNetworkStateAsync();
            setIsConnected(networkState.isConnected);
        };

        checkConnection();
    }, []);
    
    useEffect(() => {
        const avisosData = firebase.firestore()
            .collection('Avisos')
            .orderBy('data_aviso', 'desc')
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setAvisos(data);
                setLoading(false);
            });
        return () => avisosData();
    }, []);

    const avisosData = ({ item }) => (
        <View style={styles.lista}>
            <Text style={item.tipo_aviso === 1 ? styles.bloqueio : styles.alerta}>
                {item.tipo_aviso === 1 ? 'Bloqueio' : 'Alerta'}
            </Text>
            <View style={styles.row}>
                <Text style={styles.listaTexto}>{item.rua}</Text>
                <Text style={styles.listaTexto}>{item.data_aviso}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.listaTexto}>{item.aviso_mensagem}</Text>
                <Text style={styles.listaTexto}>{item.hora_aviso}</Text>
            </View>
        </View>
    );

    return (
        <ThemedView style={styles.container}>
            {isConnected ? "" : "Sem conexão, ligue a internet ❌"}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={{color: '#fff'}}>Caregando lista de avisos...</Text>
                </View>
            ) : (
                <FlatList
                    data={avisos}
                    renderItem={avisosData}
                    keyExtractor={(item) => item.id}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    loadingContainer: {
        height: 800,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    titulo: {
        color: '#fff',
        padding: 10
    },
    lista: {
        padding: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    listaTexto: {
        color: '#fff'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    bloqueio: {
        backgroundColor: '#D9C5C5',
        color: '#715555',
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        width: 75,
        textAlign: 'center'
    },
    alerta: {
        backgroundColor: '#D8D9C5',
        color: '#6F7155',
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        width: 60,
        textAlign: 'center'
    }
});