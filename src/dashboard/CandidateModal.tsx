import { Avatar, Col, Divider, Drawer, Row } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import moment from 'moment'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import CandidateStore from '../stores/candidates'
import { MAJOR } from '../utils/const'

// import Label from './Label'

// const Header = styled.h1`
//   margin: 0;
//   color: #333;
//   padding: 7px 0;
//   font-size: 25px;
//   font-family: 'IBM Plex Thai';
// `

const SubHeader = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: bold;

  margin-bottom: 10px;
`

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
  const candidateStore = useObservable(CandidateStore)

  useEffect(() => {
    candidateStore.getCandidate(candidateId)
  }, [candidateStore, candidateId])

  const { candidate } = candidateStore

  return (
    <>
      <Drawer
        visible={visible}
        onClose={onClose}
        maskClosable={false}
        title="รายละเอียดใบสมัคร"
        width="50%"
      >
        {candidateStore.loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Row>
              <Col md={4}>
                <Avatar shape="square" size={96} icon="user" />
              </Col>
              <Col md={20}>
                <SubHeader>
                  {candidate.title} {candidate.firstName} {candidate.lastName} (
                  {candidate.nickname})
                </SubHeader>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>สาขาที่สมัคร</b>
                      </td>
                      <td>{MAJOR(candidate.major)}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วัน-เดือน-ปีเกิด</b>
                      </td>
                      <td>
                        {candidate.birthdate
                          ? moment(candidate.birthdate).calendar()
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ศาสนา</b>
                      </td>
                      <td>{candidate.religion
                          ? candidate.religion
                          : 'ยังไม่ได้กรอก'}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>เบอร์โทรศัพท์</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>อีเมล์</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ระดับการศึกษา</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ชั้นปี</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>มหาวิทยาลัย</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>คณะ</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>สาขาวิชา</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>โรคประจำตัว</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>สิ่งที่แพ้ / อาหารที่แพ้</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ยาที่แพ้</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ไซส์เสื้อ</b>
                      </td>
                      <td>lul</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Divider />
            <SubHeader>ข้อมูลติดต่อฉุกเฉิน</SubHeader>
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingRight: '20px' }}>
                    <b>ชื่อ</b>
                  </td>
                  <td>lul</td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '20px' }}>
                    <b>เบอร์โทรศัพท์</b>
                  </td>
                  <td>lul</td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '20px' }}>
                    <b>ความเกี่ยวข้อง</b>
                  </td>
                  <td>lul</td>
                </tr>
              </tbody>
            </table>
            <Divider />
            <SubHeader>คำตอบกลาง และ คำตอบสาขา</SubHeader>
            <Divider />
            <Row>
              <Col md={12}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่ Login ครั้งแรก</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่กดส่งใบสมัคร</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านรอบคำถามกลาง</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผู้ตรวจคำถามกลาง</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่ตรวจคำถามกลาง</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>คอมเมนต์</b>
                      </td>
                      <td>lul</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col md={12}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านคำถามสาขา</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>จำนวนผู้ให้ผ่าน</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผู้ตรวจคำถามสาขา</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านเข้ารอบสัมภาษณ์</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>มาสัมภาษณ์</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านรอบสัมภาษณ์</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>มีสิทธิ์เข้าค่าย</b>
                      </td>
                      <td>lul</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </>
        )}
      </Drawer>
    </>
  )
}

export default observer(CandidateModal)
