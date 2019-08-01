import styled from 'styled-components'

export const Padding = styled.div`
  padding: 20px;
`

export const Heading = styled.h1`
  padding: 0;
  color: #333;
  font-size: 25px;
  font-family: 'Kanit';
  margin: 20px 0;
`

export const applyBoxShadow = (Comp: any) => {
  return styled(Comp)`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `
}
