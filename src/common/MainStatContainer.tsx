import styled from 'styled-components'

const MainStatContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  text-align: center;
  grid-template-columns: repeat(${({ size }: { size: number }) => size}, 1fr);

  & > div {
    padding: 15px 0;

    & > h1 {
      font-size: 80px;
      font-weight: bold;
      font-family: sans-serif;

      color: #041527;
      margin: 0;
    }

    & > h2 {
      font-size: 60px;
      font-weight: bold;
      font-family: sans-serif;

      color: #041527;
      margin: 0;
    }

    & > span {
      font-size: 18px;
      color: #595959;
      font-weight: bold;
    }
  }
`

export default MainStatContainer
