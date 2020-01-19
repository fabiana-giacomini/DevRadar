# Entendendo o React

## Abordagem tradicional
Na abordagem tradicional, a cada requisição, o servidor retorna o conteúdo completo da página, contendo todo HTML e CSS.<br>
Essa abordagem limita o front-end para o browser já que o aplicativo mobile ou serviços externos não vão conseguir interpretar o HTML.<br>
O browser faz uma requisição para o back-end, essa requisição, na maioria das vezes, é uma página. O back-end então pega no banco de dados a listagem de dados, monta uma resposta com HTML (template engine), CSS, e até JS, e retorna para o browser.<br>
Assim, vemos que todo o trabalho pesado está sendo feito pelo back-end, tanto as regras de negócio, o acesso ao banco de dados, e com a parte de apresentação (visuaização, HTML, CSS, JS).<br>
Com isso, teremos uma limitação ao browser, sendo que mobile etc não conseguirá ler, tendo que criar várias rotas no back-end para cada uma das situações.<br>

## Abordagem de SPA (Single-Page Applications)
Na abordagem de SPA, as requisições trazem apenas dados como respostas e, com esses dados, o front-end pode preencher as informações na tela.<br>
A página nunca recarrega, otimizando a performance e dando vida ao conceito SPA. Retornando apenas JSON podemos ter quantos front-ends quisermos.<br>
Nesse caso, o HTML, CSS, JS (da parte de interface) ficam no browser com o React, ou seja, são recarregados à parte do servidor, e o back-end não tem responsabilidade por essa parte visual; assim, quando a aplicação faz uma requisição para o back-end (pode ser o node), este apenas responderá com um arquivo JSON.<br>
No caso de uma listagem de ususários, apenas receberemos, nesta abordagem, uma lista, um array, contendo todos os dados do usuários, aí o React (ou o front-end como um todo) vai pegar essa lista, vai percorrer e mostrar os dados em tela (preencher os dados em tela).<br>
Assim, neste modelo, a página nunca vai precisar carregar, até existirá rotas na aplicação, mas ela não vai precisar ir até o back-end, pois com o React, não há necessidade de todas as vezes acessar o banco de dados, otimizando a aplicacão.<br>
Hoje o React é o mais utilizado no fronte-end Javascript.
<br>

Para criar a pasta em que vamos trabalhar com o React, não criamos através do mkdir, mas sim com o comando `yarn create react-app nomedapasta`, isso instalará as dependências necessárias a se trabalhar com o React, bem como pré-definirá alguns arquivos padrões, criará um git, etc.
<br>

Segue um exmplo contendo alguns conceitos importantes de React:

```javascript
/* ------------------ Arquivo: App.js ------------------ */

import React, { useState } from 'react';  // useState é uma função para monitorar a alteração de variáveis, por padrão o react não faz isso

// ----- Conceitos importantes! -----

// Componente: é um bloco isolado de HTML, CSS, JS, o qual não interfere o restante da aplicação. É uma função que retorna algum conteúdo HTML/CS/JS(de interface) -> uma parte isolada que não afeta nas demais partes da aplicação (ex.: timeline do facebook é um componente, e não afeta nos demais componentes) Uma das regras do React é que se tenha apenas um componente por aquivo apenas.

// Propriedade: informações que um componente PAI passa para o componente FILHO; é um atributo HTML (header).

// Estado: Informações mantidas pelo componente (Lembrar conteito da "imutabilidade")

function App() {
  const [counter, setCounter] = useState(0); // valor inicial = 0 -> essa função retorna um vetor com dois elementos

  function incrementCounter() {   // toda função própria de um componente será criada dentro dele (nesse caso o componente é App)
    setCounter(counter + 1); // imutabilidade: nunca se altera o valor de algo, sempre que possível, usar uma função que dê essa opção de alterar
  }
  return (
    <> 
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  ) // se for colocar vários elementos um embaixo do outro, deve estar encapsulado por algo, para não usara div (que pode interferir no style, podemos usar as tags vazias <> e o fechamento </>)
}

export default App;

```