import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'  // importa um ícone para o botão (ver as opções em https://material.io/resources/icons/?style=baseline, pegando os nomes e trocando _ por -)

import api from '../services/api'
import { connect, disconnect, subscribeToNewDevs } from '../services/socket'

 
function Main({ navigation }) { // duas chaves, uma para poder por codigo JS, e outra para o objeto JS, onde podemos colocar a estilização
  const [devs, setDevs] = useState([])
  const [currentRegion, setCurrentRegion] = useState(null) // estado da aplicação
  const [techs, setTechs] = useState() // tive que retirar o [] dos parâmentros por causa de um erro

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync() // granted é se o user deu permissão para usar a geolocation

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true  // pegar a localização mais próxima do user pelo GPS do celular (mas no celular gps deve estar funcional!, se for por wifi apenas, aí deve estar false)
        })

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04, // calculos navais para controlar o zoom no mapa
          longitudeDelta: 0.04,
        })
      }      
    }

    loadInitialPosition()
  }, [])

  useEffect(() => { // monitorar para cada vez que for cadastrado um novo dev disparar a função
    subscribeToNewDevs(dev => setDevs([...devs, dev]))
  }, [devs])

  function setupWebsocket() { // acompanhar em tempo real os devs cadastrados (dentro de loadDevs pq apenas depois q for feita busca)
    disconnect()
    
    const { latitude, longitude } = currentRegion

    connect(
      latitude,
      longitude,
      techs,
    )
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      }
    });

    setDevs(response.data.devs)
    setupWebsocket()
  }

  function handleRegionChange(region) {
    console.log(region)
    setCurrentRegion(region) // alterar o estado toda vez que o user mexer no mapa (ir recarregando o mapa de devs)
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView 
        onRegionChangeComplete={handleRegionChange} 
        initialRegion={currentRegion} 
        style={styles.map}
      >
        {devs.map(dev => ( // repetir o marker para cada um dos devs
          <Marker
            key={dev._id} // toda vez que fizer o map, o primeiro elemento deve ser a key com o identificador único (nesse caso id)
            coordinate={{ 
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <Image 
              style={styles.avatar} 
            source={{ uri: dev.avatar_url }}
             />

            <Callout onPress={() => {
              // navegação para a página Profile do dev
              navigation.navigate('Profile', { github_username: dev.github_username })
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize= "words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs} // mesma coisa que {text => setTechs(text)} pq apenas um parâmentro
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16, 
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    /* todos os elementos no react native possuem, por padrão display: flex (só existe o flex e o none)*/
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000', /* sombras para o iOS são as shadow dispostas aqui */
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2, /* sombra para o Android é apenas essa propriedade */
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  }
})

export default Main