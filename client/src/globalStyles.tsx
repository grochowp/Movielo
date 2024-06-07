import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html {
    width: 100vw;
}
    
body {
    display: flex;
    justify-content: center;
    min-width: 320px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    transition:1s;
    background-color: ${(props) => props.theme.bodyColor}; 
    overflow-y: overlay;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 7px;
  
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
