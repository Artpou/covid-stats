import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
.body {

}

.main {
  text-align: center;
  transition: all 0.25s linear;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
}

.btn-group {
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  max-width: 300px;
  flex-direction: row;
  justify-content: center;
}

.card {
  padding: 10px;
  margin: 25px;
  background-color: ${({ theme }) => theme.card};
}
`