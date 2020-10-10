import { Avatar, Button, Col, Divider, Drawer, Row } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import AnswerBox from '../common/AnswerBox'
import CandidateStore from '../stores/candidates'
import { GENERAL_QUESTION, MAJOR, MAJOR_QUESTION } from '../utils/const'
import DesignAnswerModal from './DesignAnswerModal'

const SubHeader = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: bold;

  margin-bottom: 10px;
`

const QuestionHeader = styled.h3`
  margin: 0;
  color: #333;
  font-size: 16px;

  margin-bottom: 10px;
`

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

  const [viewQuestion, setViewQuestion] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [portfolioUrl, setPortfolioUrl] = useState('')

  useEffect(() => {
    if (candidateId) {
      candidateStore.getCandidate(candidateId)
      setViewQuestion(false)
    }
  }, [candidateStore, candidateId])

  const { candidate } = candidateStore

  const openDrawer = (url: string) => {
    setModalVisible(true)
    setPortfolioUrl(url)
  }

  const closeDrawer = () => {
    setModalVisible(false)
    setPortfolioUrl('')
  }

  return (
    <>
      <DesignAnswerModal
        visible={modalVisible}
        onClose={closeDrawer}
        url={portfolioUrl}
      />
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
                <a href={candidate.picture} target="_blank">
                  <Avatar
                    shape="square"
                    size={96}
                    icon="user"
                    src={candidate.picture}
                  />
                </a>
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
                      <td>
                        {candidate.religion
                          ? candidate.religion
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>เบอร์โทรศัพท์</b>
                      </td>
                      <td>
                        {candidate.phone ? candidate.phone : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>อีเมล์</b>
                      </td>
                      <td>
                        {candidate.email ? candidate.email : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ระดับการศึกษา</b>
                      </td>
                      <td>
                        {candidate.educationStatus
                          ? candidate.educationStatus
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ชั้นปี</b>
                      </td>
                      <td>
                        {candidate.academicYear
                          ? candidate.academicYear
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>มหาวิทยาลัย</b>
                      </td>
                      <td>
                        {candidate.university
                          ? candidate.university
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>คณะ</b>
                      </td>
                      <td>
                        {candidate.faculty
                          ? candidate.faculty
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>สาขาวิชา</b>
                      </td>
                      <td>
                        {candidate.department
                          ? candidate.department
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>โรคประจำตัว</b>
                      </td>
                      <td>
                        {candidate.disease
                          ? candidate.disease
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>สิ่งที่แพ้ / อาหารที่แพ้</b>
                      </td>
                      <td>
                        {candidate.foodAllergy
                          ? candidate.foodAllergy
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ยาที่แพ้</b>
                      </td>
                      <td>
                        {candidate.medAllergy
                          ? candidate.medAllergy
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ไซส์เสื้อ</b>
                      </td>
                      <td>
                        {candidate.shirtSize
                          ? candidate.shirtSize
                          : 'ยังไม่ได้กรอก'}
                      </td>
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
                  <td>
                    {candidate.emergencyFirstName
                      ? `${candidate.emergencyFirstName} ${candidate.emergencyLastName}`
                      : 'ยังไม่ได้กรอก'}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '20px' }}>
                    <b>เบอร์โทรศัพท์</b>
                  </td>
                  <td>
                    {candidate.emergencyPhone
                      ? candidate.emergencyPhone
                      : 'ยังไม่ได้กรอก'}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '20px' }}>
                    <b>ความเกี่ยวข้อง</b>
                  </td>
                  <td>
                    {candidate.emergencyPhoneRelated
                      ? candidate.emergencyPhoneRelated
                      : 'ยังไม่ได้กรอก'}
                  </td>
                </tr>
              </tbody>
            </table>
            <Divider />
            <SubHeader>คำตอบกลาง และ คำตอบสาขา</SubHeader>
            {viewQuestion ? (
              <Row>
                <Col md={24}>
                  {candidate.questions.generalQuestions.length > 0 && (
                    <>
                      <QuestionHeader>คำตอบกลาง</QuestionHeader>
                      {GENERAL_QUESTION.map((question, i) => (
                        <Row key={i}>
                          <Col md={24}>
                            {i + 1}. {question}
                          </Col>
                          <Col md={24}>
                            {candidate.questions.generalQuestions[i] && (
                              <AnswerBox
                                disabled={true}
                                autosize={true}
                                value={
                                  candidate.questions.generalQuestions[i].answer
                                }
                              />
                            )}
                          </Col>
                        </Row>
                      ))}
                    </>
                  )}
                  {candidate.questions.majorQuestions.length > 0 && (
                    <>
                      <QuestionHeader>คำตอบสาขา</QuestionHeader>
                      {MAJOR_QUESTION(candidate.major).map((question, i) => {
                        const answer = candidate.questions.majorQuestions[i]
                          ? candidate.questions.majorQuestions[i].answer
                          : ``
                        if (candidate.major === 'design' && i !== 1) {
                          // ข้อ 1 / 3 / 4 เป็น Upload file
                          return (
                            <Row key={i}>
                              <Col md={24}>
                                {i + 1}. {question}
                              </Col>
                              <Col md={24}>
                                <Button
                                  icon="download"
                                  onClick={() => openDrawer(answer)}
                                >
                                  ดูคำตอบ
                                </Button>
                                <br />
                                <br />
                              </Col>
                            </Row>
                          )
                        }

                        return (
                          <Row key={i}>
                            <Col md={24}>
                              {i + 1}. {question}
                            </Col>
                            <Col md={24}>
                              <AnswerBox
                                disabled={true}
                                autosize={true}
                                value={answer}
                              />
                            </Col>
                          </Row>
                        )
                      })}
                    </>
                  )}
                </Col>
                <Col md={24}>
                  <Button onClick={() => setViewQuestion(false)}>
                    ปิดคำตอบ
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col md={24}>
                  <Button onClick={() => setViewQuestion(true)}>ดูคำตอบ</Button>
                </Col>
              </Row>
            )}
            <Divider />
            <Row>
              <Col md={12}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่ Login ครั้งแรก</b>
                      </td>
                      <td>
                        {moment(candidate.created_at).format(
                          'DD/MM/YYYY, h:mm:ssa'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่กดส่งใบสมัคร</b>
                      </td>
                      <td>
                        {candidate.completed_at
                          ? moment(candidate.completed_at).format(
                              'DD/MM/YYYY, h:mm:ssa'
                            )
                          : 'ยังไม่ส่งใบสมัคร'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านรอบคำถามกลาง</b>
                      </td>
                      <td>{candidate.isPassStaff ? 'ผ่าน' : 'ไม่ผ่าน'}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผู้ตรวจคำถามกลาง</b>
                      </td>
                      <td>{candidate.staffUsername}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่ตรวจคำถามกลาง</b>
                      </td>
                      <td>
                        {candidate.staffCheckedAt
                          ? moment(candidate.staffCheckedAt).format(
                              'DD/MM/YYYY, h:mm:ssa'
                            )
                          : 'ยังไม่ทำการตรวจ'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>คอมเมนต์</b>
                      </td>
                      <td>
                        {candidate.staffComment ? candidate.staffComment : '-'}
                      </td>
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
                      <td>-</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>จำนวนผู้ให้ผ่าน</b>
                      </td>
                      <td>
                        {candidate.committeeVote.reduce(
                          (a, vote) => a + vote.score,
                          0
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผู้ตรวจคำถามสาขา</b>
                      </td>
                      <td>
                        {candidate.committeeVote.length
                          ? candidate.committeeVote.map(c => `${c.committee} `)
                          : 'ยังไม่มีตรวจ'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านเข้ารอบสัมภาษณ์</b>
                      </td>
                      <td>{candidate.passInterview ? 'ผ่าน' : 'ไม่ผ่าน'}</td>
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
                      <td>{candidate.isFinalist ? 'ผ่าน' : 'ไม่ผ่าน'}</td>
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
