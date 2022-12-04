import styled from '@emotion/styled'

const Container = styled.div`
  width: 100%;
  padding: 7px;
  display: flex;

  & > div:nth-child(1) {
    width: 200px;
    padding: 3px 10px;
    margin-right: 20px;
    background: #fafafa;
    border-radius: 3px;
    font-weight: bold;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`

const Label = ({ children, title }: { children: any; title: string }) => {
  return (
    <Container>
      <div>{title}</div>
      <div>{children || 'Undefined'}</div>
    </Container>
  )
}

export default Label
