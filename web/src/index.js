import React from 'react'; // importa-se o react em todo arquivo JS quando se utilizar HTML ()
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));  // aqui estamos usamos as tags do HTML (JSX [JS + XML (sintaxe do html)])
// está mandando renderizar o arquivo App dentro da div #root no arquivo index.html (dentro do App.js teremos um html!)
