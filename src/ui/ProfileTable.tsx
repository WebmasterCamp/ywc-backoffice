import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  border-radius: 7px;
  border: 1px solid #eee;
  margin-top: 10px;

  & > div:nth-child(1) {
    width: 200px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`

const Item = styled.div`
  font-family: 'IBM Plex Thai', sans-serif;
  font-size: 18px;
  padding: 10px 15px;

  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
`

interface ProfileTableProps {
  keys: any[]
  values: any[]
}

const ProfileTable: React.FC<ProfileTableProps> = ({ keys, values }) => (
  <Container>
    <div>
      {keys.map((x, i) => (
        <Item key={i}>{x}:</Item>
      ))}
    </div>
    <div>
      {values.map((x, i) => (
        <Item key={i}>{x}</Item>
      ))}
    </div>
  </Container>
)

export default ProfileTable
