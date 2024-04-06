import React, { useState , useEffect} from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    View,
    Image,
    Button,
    StyleSheet,
    Modal,
    Alert,
    TextInput,
    ImageBackground,
    Text,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import { Backend } from "../config/backendconfig";



export default function Pedido({ navigation }) {
    const route = useRoute();
    const platillosSeleccionados = route.params?.platillosSeleccionados;
    const userData = route.params?.userData;
    const total = route.params?.total;
    const mesa = route.params?.mesa;

    const {url} = Backend();



    const handleLogout = () => {
        navigation.navigate("Home", { userData: userData });
    };



    const crearPedido = async () => {
        if (userData && userData.idUsuario) {
            const response = await fetch(`${url}/crearPedido`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUsuario: userData.idUsuario,
                    estado: 'En proceso',
                    idMesa: mesa.idMesa,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Pedido creado:', data);
                // Aquí puedes verificar los datos de la respuesta
                // Por ejemplo, si la respuesta incluye un id de pedido, puedes verificar que no sea null
                if (data && data.idPedido) {
                    console.log('El pedido se creó exitosamente');
                } else {
                    console.error('El pedido no se creó exitosamente');
                }
            } else {
                console.error('Error al crear el pedido:', response.status);
            }
        } else {
            console.error('userData o userData.idUsuario es null');
        }
    };
   


    return (
        <ImageBackground
            source={require("../assets/fondo2.png")}
            style={styles.backgroundImage}
        >
            
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
                    <Text style={styles.titleMesas}>Pedidos</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image
                            source={require("../assets/gastromanager3.png")}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <View style={styles.formContainer2}>
                        <View style={styles.container3}>
                            <View style={styles.column}>
                                <Text style={styles.titleNumMesa}>Pedido: 1</Text>
                                <Text style={styles.titleNombreMesa}>Para la mesa: 1</Text>
                                <Text style={styles.titleNombreMesa}>Estado: En preparacion</Text>
                            </View>
                            <View style={styles.column}>
                                <Image
                                    source={require("../assets/pedido.png")}
                                    style={styles.mesa} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.01)",
    },

    titleMesas: {
        color: "rgba(245, 133, 0, 1)",
        fontSize: 50,
        fontWeight: "bold",
        marginRight: "35%",
    },

    logo: {
        width: 60,
        height: 60,
    },

    container3: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    titleNumMesa: {
        color: "rgba(0, 0, 0, 1)",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },

    titleNombreMesa: {
        color: "rgba(0, 0, 0, 1)",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
    },

    container2: {
        padding: 10,
        marginTop: '-2%',
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        height: "90%",
        justifyContent: "top",
    },

    column: {
        flex: 1,
        padding: 10,
    },

    mesa: {
        marginLeft: "35%",
        width: 90,
        height: 70,
    },

    formContainer2: {
        marginTop: 5,
        marginBottom: 20,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 20,
        height: "auto",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: 'rgba(245, 133, 0, 1)',
    },

});