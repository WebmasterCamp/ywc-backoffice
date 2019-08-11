import {  Drawer } from 'antd'
import React from 'react'

// import Label from './Label'

// const Header = styled.h1`
//   margin: 0;
//   color: #333;
//   padding: 7px 0;
//   font-size: 25px;
//   font-family: 'IBM Plex Thai';
// `

// const SubHeader = styled.h2`
//   margin: 0;
//   color: #333;
//   font-size: 20px;
//   font-weight: bold;

//   margin-bottom: 20px;
// `

// const ProfileGrid = styled.div`
//   display: grid;
//   grid-gap: 30px;
//   grid-template-columns: 1fr 3fr;
// `

// const Image = styled.img`
//   width: 100%;
//   border-radius: 7px;
//   margin-bottom: 20px;
// `

interface CandidateModalProps {
  candidateId: string
  visible: boolean
  onClose: () => void
}

const CandidateModal = ({
  visible,
  onClose,
  candidateId
}: CandidateModalProps) => {
  return (
    <>
      <Drawer
        visible={visible}
        onClose={onClose}
        maskClosable={false}
        title="รายละเอียดใบสมัคร"
        width="50%"
      >
        <h1>{candidateId}</h1>
      </Drawer>
    </>
  )
}

export default CandidateModal
