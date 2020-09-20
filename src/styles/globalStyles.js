import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
.main {
  transition: all 0.25s linear;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
}

a {
  color: ${({ theme }) => theme.link};
}

.btn-group {
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  max-width: 300px;
  flex-direction: row;
  justify-content: center;
}

.card {
  padding: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: ${({ theme }) => theme.card};
}

.select-language {
  color: black;
  max-width: 150px;
}

.select-country {
  padding: 10px;
  color: black;
}

.ChartContainer {
  color: black;
}
`