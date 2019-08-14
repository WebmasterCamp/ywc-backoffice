import { Avatar, Col, Divider, Row } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import AnswerBox from '../common/AnswerBox'
import QuestionBox from '../common/QuestionBox'
import CommitteeStore from '../stores/committee'
import QuestionsStore from '../stores/questions'
import UserStore from '../stores/user'
import Box from '../ui/Box'
import CommentBox from '../ui/CommentBox'
import { MAJOR } from '../utils/const'
import { PageTitle, SubHeading } from '../utils/styled-helper'

const CandidateBox = styled(Box)`
  padding: 20px;
`

const VoteCandidate = () => {
  const committeeStore = useObservable(CommitteeStore)
  const userStore = useObservable(UserStore)
  const questionsStore = useObservable(QuestionsStore)

  useEffect(() => {
    committeeStore.getCommitteeStatus()
    userStore.getProfile()
    questionsStore.getQuestions()
  }, [committeeStore, userStore, questionsStore])

  return (
    <>
      <PageTitle>ตรวจใบสมัคร (สาขา{MAJOR(userStore.profile.major)})</PageTitle>
      <CandidateBox>
        <Row gutter={16}>
          <Col md={5} lg={4} xl={3} xxl={2}>
            <Avatar shape="square" size={96} icon="user" />
          </Col>
          <Col md={19} lg={20} xl={21} xxl={22}>
            <table>
              <tr>
                <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                  <b>ระดับการศึกษา</b>
                </td>
                <td>ปี 2</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                  <b>คณะ</b>
                </td>
                <td>เทคโนโลยีสารสนเทศ</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                  <b>สาขาวิชา</b>
                </td>
                <td>เทคโนโลยีสารสนเทศ</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                  <b>มหาวิทยาลัย</b>
                </td>
                <td>สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</td>
              </tr>
            </table>
          </Col>
        </Row>
        <Divider />
        <Row>
          <SubHeading>กิจกรรมที่ทำผ่านมา</SubHeading>
        </Row>
        <Divider />
        <Row>
          <SubHeading>คำถามกลาง</SubHeading>
          {questionsStore.questions.general.map(
            (question: string, i: number) => (
              <>
                <QuestionBox>
                  Q{i + 1}: {question}
                </QuestionBox>
                <AnswerBox>
                  แจมวิลเลจเซ็นทรัล เฟรชช็อปบาร์บีคิวดีไซน์ เหมยโดมิโน ออดิชั่น
                  มลภาวะแบคโฮเมจิกซูฮก โกะ แทงโก้เซลส์แมนเอ๋อพงษ์สามช่า
                  ซูมไวอะกร้าบลอนด์ไลท์ราชบัณฑิตยสถาน มาร์ช ไนน์ แบล็คคันยิ
                  ดั๊มพ์คาร์สตรอเบอรี อึมครึมปูอัดฟอร์ม แผดเผาอุปสงค์ไลน์
                  แฟกซ์ไฮบริดตังค์แคปคำสาป ขั้นตอนเอนทรานซ์มอบตัวนายแบบเรต
                  แอปพริคอทฮิตกัมมันตะอึ้มราเมน ตุ๊กตุ๊ก แบตเซ็กซี่
                  เพียวคอนเฟิร์มวานิลา เมจิกซูมแบล็ก รันเวย์ เป่ายิงฉุบเฉิ่ม
                  เกรดไฮแจ็คสึนามิ เคส ซูชิป๋าเวอร์ลีก รีทัช เห่ย อินเตอร์
                  โฮลวีตหน่อมแน้ม โอวัลตินคำสาปเครป ออสซี่เหมย
                </AnswerBox>
              </>
            )
          )}
        </Row>
        <Divider />
        <Row>
          <SubHeading>คำถามสาขา ({MAJOR(userStore.profile.major)})</SubHeading>
          {userStore.profile.major !== '' &&
            questionsStore.questions[userStore.profile.major].map(
              (question: string, i: number) => (
                <>
                  <QuestionBox>
                    Q{i + 1}: {question}
                  </QuestionBox>
                  <AnswerBox>
                    แจมวิลเลจเซ็นทรัล เฟรชช็อปบาร์บีคิวดีไซน์ เหมยโดมิโน
                    ออดิชั่น มลภาวะแบคโฮเมจิกซูฮก โกะ
                    แทงโก้เซลส์แมนเอ๋อพงษ์สามช่า
                    ซูมไวอะกร้าบลอนด์ไลท์ราชบัณฑิตยสถาน มาร์ช ไนน์ แบล็คคันยิ
                    ดั๊มพ์คาร์สตรอเบอรี อึมครึมปูอัดฟอร์ม แผดเผาอุปสงค์ไลน์
                    แฟกซ์ไฮบริดตังค์แคปคำสาป ขั้นตอนเอนทรานซ์มอบตัวนายแบบเรต
                    แอปพริคอทฮิตกัมมันตะอึ้มราเมน ตุ๊กตุ๊ก แบตเซ็กซี่
                    เพียวคอนเฟิร์มวานิลา เมจิกซูมแบล็ก รันเวย์ เป่ายิงฉุบเฉิ่ม
                    เกรดไฮแจ็คสึนามิ เคส ซูชิป๋าเวอร์ลีก รีทัช เห่ย อินเตอร์
                    โฮลวีตหน่อมแน้ม โอวัลตินคำสาปเครป ออสซี่เหมย
                  </AnswerBox>
                </>
              )
            )}
        </Row>
      </CandidateBox>
      <CommentBox>
        <SubHeading>คอมเมนท์จากคณะดำเนินงาน</SubHeading>
        <AnswerBox>ความคิดเห็น</AnswerBox>
      </CommentBox>
    </>
  )
}

export default observer(VoteCandidate)
