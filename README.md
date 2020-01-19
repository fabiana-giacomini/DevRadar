# DevRadar

Aplicação feita com as tecnologias Node.js, ReactJS e React Native na Semana Omnistack 10 (janeiro/2020).<br>

## Funcionalidades
- na página web, cadastro de desenvolvedores a partir de seu usuário no Github, no banco de dados MongoDB;
- na página web, uso de geolocalização a fim de completar o cadastro com as coordenadas geográficas do usuário;
- no app mobile, pesquisa de desenvolvedores por tecnologias;
- no app mobile, uso de geolocalização do dispositivo móvel a fim de mostrar no mapa os desenvolvedores buscados (por tecnologia) num raio de 10 quilômetros;
- no app mobile, ao clicar no desenvolvedor encontrado, uma pequena janela aparece com alguns dados sobre aquele usuário cadastrado;
- no app mobile, ao clicar na janela com os dados do desenvolvedor, a tela do mapa é redirecionada para o perfil do usuário no Github, através do webview.
- a atualização é feita em tempo real, sendo que o cadastro feito de um desenvolvedor que trabalha com a tecnologia "x" é mostrado imediatamente na tela do usuário, o qual realizou uma pesquisa com esta tecnologia "x".

## Tecnologias Utilizadas
Tecnologias Utilizadas e principais dependências: <br>

- JavaScript
  - Node.js, no back-end
    - Express
    - axios
    - socketio
    - mongoose
  - ReactJS, no front-end web
  - React Native, no front-end mobile
    - expo
    - socketio-cli
- Banco de Dados MongoDB