import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    min-width: 320px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    transition:1s;
    background-color: ${(props) => props.theme.componentsBackground}
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color};
    border-radius: 6px;

  }

  ::-webkit-scrollbar-track {
    margin-top:5.6rem;
    background-color: ${(props) => props.theme.pageBackground};
  }

`;

export default GlobalStyle;
