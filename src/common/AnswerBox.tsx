import TextArea from 'antd/lib/input/TextArea'
import styled from 'styled-components'

const AnswerBox = styled(TextArea)`
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
`

export default AnswerBox
