# Entendendo o React Native

## Abordagem Tradicional
Na abordagem tradicional, criamos uma aplicação para iOS e outra para Android, e nesses casos, o trabalho se torna repetido tanto na criação quanto para as altrações no projeto.<br>
Pra iOS usava-se Objective-C, hoje usa-se o Swift, que gerava uma extensão .ipa; e no Android, usa-se o Java, ou o Kotlin, gerando um arquivo de extensão .apk.<br>


## Abordagem do React Native
Todo o código feito é em JavaScript, esse código não é convertido em código natovo, melhor do que isso, o dispositivo passa a entender o código JavaScript e a interface gerada é totalmente nativa.<br>
No React Native não se desenvolve um aplicativo para cada sistema, mas apenas um aplicativo que, ao final, pode gerar a extensão apropriada para ser instalada em cada dispositivo, sendo interpretado normalmente em cada um deles.<br>
JavaScript Core é quem dá entendimento do código JS para cada sistema.<br>

## Por que utilizar o Expo?
Expo é um framework para o React Native, um conjunto de bibliotecas para se utilizar uma gama de funcionalidades do celular.<br>
Sem o expo, seria necessário instalar em nosso sistema tanto o Android Studio para obter a SDK (software development kit) de desenvolvimento Android, como o Xcode (apenas no Mac) para obter a SDK do iOS.<br>
Nesse caso, a iniciação no desenvolvimento fica mais penosa, já que essas SDK's não são extremamente simples de instalar e livres de erros.<br>
O fluxo seria: React Native -> geração das API's que serão utilizadas (câmera, geolocalização, etc) -> Android Studio (SDK) -> gerar um arquivo .apk -> depois intalar no celular; mesma coisa para o iPhone: React Native -> geração das API's que serão utilizadas (câmera, geolocalização, etc) -> Xcode (SDK) -> gerar um arquivo .ipa -> depois intalar no celular.<br>
Já com o Expo o fluxo seria: React Native -> apenas código JavaScript -> instalar no celular.<br>
Com o Expo, instalamos um aplicativo no celular chamado Expo e, dentro dele, tudo o que precisamos para desenvolver no React Native já está instalado, como as API's de mapas, geolocalização, câmera, sensores, calendário, etc.<br>
Com isso, não precisamos nos preocupar em gerar um aplicativo para Android e iOS já que o app do Expo instalado tem tudo o que precisamos e assim apenas usamos React.
<br>

## Iniciando
Para iniciar um projeto com o React Native, no terminal vamos até a pasta desejada e, com o expo já instalado, damos o comando `expo init nomedapasta`.
<br>

Para mais comando sobre as rotas e navegações, buscamos a página contendo a documentação do expo: "docs.expo.io" e buscarmos por routes e navigation, assim, podemos obter os seguintes comandos do terminal: `yarn add react-navigation`, e, usando o expo, apenas adiconar os comandos `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context`, para adicionarmos o comando po gestos (uso do dedo no celular), etc.<br>
O comando `yarn add react-navigation-stack` (navegação de pilha) adiciona os botões de navegação, permite arrastar o dedo para um dos cantos da tela para aparecer uma telinha de menu, etc. Instalamos também o `yarn add yarn add @react-native-community/masked-view`.
<br>

Exemplo de um dos aquirvos iniciais gerados:

```javascript
/* ----------- Arquivo: App.js (react native com expo) ----------- */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes'

export default function App() { // não é possível interpretar html, tipo uma <div> no Native, como era no React.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Omnistack!</Text>
    </View>
  );
}

const styles = StyleSheet.create({  // a estilização é por meio de um objeto javascript (atenção para os nomes das propriedades! não pode usar hífem). Ademais, nãi há, nesse contexto o cenceito de herança na estilização, para mudar a fonte para negrito, por exemplo, temos que criar um styles.title como atributo no html acima, e depois acrescentar neste objeto JS.
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFF',
  }
});
```
<br>

Par instalar o uso dos mapas, na mesma documentação "docs.expo.io", ma aba API References, encontramos MapView, o qual indica o comando a ser utilizado para se utilizar os mapas: `expo install react-native-maps`. Para usar a geolocalização do dispositivo, usamos `expo install expo-location`.<br>
Para acessar um site e ele estar visível, instalamos `expo install react-native-webview`.
<br>

## Protocolo WebSocket

- Requisições HTTP
GET, POST, PUT, DELETE

REQUISIÇÃO Frontend -> Banckend -> RESPOSTA Frontend
(hoje só é possível obter uma resposta se houver uma requisição, ou seja, o backende só pode enviar uma informação se tiver havido uma requisição)

- Protocolo WebSocket
Utilizando o framework: `yarn add socket.io` no bakcend da aplicação, e `yarn add socket.io-client` na pasta do frontend mobile, feito com react native.<br>

