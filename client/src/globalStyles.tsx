import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Kadwa:wght@400;700&display=swap');

body {
  background-color: red;
  display: flex;
  justify-content: center;
    min-width: 320px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    transition:1s;
    background-color: ${(props) => props.theme.bodyColor}
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color};
    border-radius: 6px;
  }
  
  ::-webkit-scrollbar-track {
    margin: 0 3rem;
    background-color: ${(props) => props.theme.pageBackground};
  }

`;

export default GlobalStyle;
