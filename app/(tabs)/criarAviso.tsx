import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import firebase from '../config/db/firebase';
import { useState } from 'react';

export default function CriarAviso() {
    const [tipoAviso, setTipoAviso] = useState(0);
    const [rua, setRua] = useState('');
    const [mensamgeAviso, setMensagemAviso] = useState('');
    const [errorRua, setErrorRua] = useState('');
    const [errorMensagemAviso, setErrorMensagemAviso] = useState('');

    const options = [
        { id: 0, label: "Alerta", mensagem: 'Alerta para reduzir a velocidade' },
        { id: 1, label: "Bloqueio", mensagem: 'Via bloqueiada' },
    ];

    const validarFormulario = () => {
        let error = false;
        if(rua == '') {
            setErrorRua("Preencha o nome da rua ou av.")
            error = true;
        }
        if(mensamgeAviso == ''){
            setErrorMensagemAviso("Preencha o campo de mensagem.")
            error = true;
        }
        return !error;
    }

    const submitAviso = async (e) => {
        try {
            if(validarFormulario()) {
                e.preventDefault();
    
                const now = new Date();
                const dia = String(now.getDate()).padStart(2, '0');
                const mes = String(now.getMonth() + 1).padStart(2, '0');
                const dataAtual = `${dia}/${mes}`;
                const horaAtual = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });    
            
                const novoUsuarioRef = await firebase.firestore().collection("Avisos").add({
                    aviso_mensagem: mensamgeAviso,
                    rua: rua,
                    tipo_aviso: tipoAviso ? 1 : 0,
                    hora_aviso: horaAtual,
                    data_aviso: dataAtual,
                })
            
                alert(`Aviso criado na rua com ${rua} sucesso`)
                setMensagemAviso('');
                setRua('');
            }
        } catch (error) {
            alert(`Erro: ${error}`);
        }
    }

    return (
        <ThemedView style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Adicionar aviso</Text>
            </View>
            <View>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={styles.radioContainer}
                        onPress={() => setTipoAviso(option.id)}
                    >
                        <View style={[styles.radioCircle, tipoAviso === option.id && styles.selectedRadio]} />
                        <View>
                            <Text style={option.label === 'Alerta' ? styles.alerta : styles.bloqueio}>
                                {option.label}
                            </Text>
                            <Text style={styles.radioMensagem}>{option.mensagem}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View>
                <Text style={styles.inputTxt}>Rua / Av.</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setRua(text)   
                        setErrorRua('')
                    }}
                    value={rua}
                    maxLength={255}
                    />
                {errorRua ? <Text style={styles.textoErro}>{errorRua}</Text> : null}
                <Text style={styles.inputTxt}>Mensagem de aviso</Text>
                <TextInput
                    multiline={true} 
                    textAlignVertical="top"
                    style={styles.inputMensagem}
                    onChangeText={text => {
                        setMensagemAviso(text)
                        setErrorMensagemAviso('')
                    }}
                    value={mensamgeAviso}
                    maxLength={500}
                    />
                {errorMensagemAviso ? <Text style={styles.textoErro}>{errorMensagemAviso}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={submitAviso}>
                    <Text style={styles.buttonTxt}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: 1000,
        paddingTop: 100
    },
    containerTitulo: {
        padding: 6,
        marginBottom: 10
    },
    titulo: {
        color: '#fff',
        fontSize: 20
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 5
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#777",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    selectedRadio: {
        backgroundColor: "#4B89BF",
        borderColor: "#4B89BF",
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
        width: 75,
        textAlign: 'center'
    },
    alerta: {
        backgroundColor: '#D8D9C5',
        color: '#6F7155',
        padding: 5,
        borderRadius: 5,
        width: 60,
        textAlign: 'center'
    },
    radioMensagem: {
        color: '#fff',
        marginTop: 3
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    inputMensagem: {
        backgroundColor: '#fff',
        marginTop: 5,
        padding: 10,
        height: 150,
        borderRadius: 10
    },
    inputTxt: {
        color: '#fff',
        marginTop: 10
    },
    button: {
        backgroundColor: "#4B89BF",
        padding: 10,
        marginTop: 20,
        width: 80,
        borderRadius: 10,
    },
    buttonTxt: {
        color: '#fff',
        textAlign: 'center' 
    },
    textoErro: {
        color: '#D9C5C5'
    }
});