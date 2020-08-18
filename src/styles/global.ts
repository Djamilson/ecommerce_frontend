import { createGlobalStyle } from 'styled-components';

import background from '../assets/background.svg';

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  outline:0;
  outline:0;
}

body{
  background: #191920 url(${background}) no-repeat center top;
  color: #FFF;
  -webkit-font-smoothing: antialiased;
}

body, input, button{
font-family: 'Roboto Slab', serif;
font-size: 14px;
}

h1, h2, h3, h4, h5, h6, strong {
  font-weight: 500;
}

button {
  cursor: pointer;
}

#root{
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 20px 50px;
}
`;
