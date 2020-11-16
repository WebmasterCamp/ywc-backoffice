import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea'
import React from 'react'
import styled from 'styled-components'

const TextAreaBox = styled(TextArea)`
  margin: 5px auto 25px auto;
  font-family: 'Sarabun';
  font-size: 16px;
  resize: none;

  &:disabled {
    color: rgba(0, 0, 0, 0.85);
    border: 0;
    background-color: transparent;
    line-height: 1.9;
    cursor: default;
  }

  @media print {
    display: none;
  }
`

const PrintHelper = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-family: 'Sarabun';
  font-size: 16px;
  line-height: 1.9;
  overflow-wrap: anywhere;
  margin: 10px 0 30px 20px;

  @media screen {
    display: none;
  }
`

const AnswerBox = (props: TextAreaProps) => {
  return (
    <>
      <TextAreaBox {...props} />
      <PrintHelper>{props.value}</PrintHelper>
    </>
  )
}

export default AnswerBox
