import { createGlobalStyle } from 'styled-components';

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.baseTextColor};
  }

  button,
  input,
  textarea,
  body {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
