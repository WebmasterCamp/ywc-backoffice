import { Avatar, Button, Col, Divider, Icon, Popconfirm, Row } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'

import AnswerBox from '../common/AnswerBox'
import QuestionBox from '../common/QuestionBox'
import CommitteeStore from '../stores/committee'
import QuestionsStore from '../stores/questions'
import UserStore from '../stores/user'
import Box from '../ui/Box'
import CommentBox from '../ui/CommentBox'
import { GENERAL_QUESTION, MAJOR, MAJOR_QUESTION } from '../utils/const'
import { PageTitle, SubHeading } from '../utils/styled-helper'
import CandidateModal from './CandidateModal'

const CandidateBox = styled(Box)`
  padding: 20px;
`

const VoteBox = styled(Box)`
  padding: 10px 20px;
`

interface VoteCandidateProps {
  match: {
    params: {
      id: string
    }
  }
}

const VoteCandidate = (props: VoteCandidateProps) => {
  const committeeStore = useObservable(CommitteeStore)
  const userStore = useObservable(UserStore)
  const questionsStore = useObservable(QuestionsStore)

  const {
    match: {
      params: { id }
    }
  } = props

  useEffect(() => {
    committeeStore.getApplicationById(id)
    committeeStore.getCommitteeStatus()
    userStore.getProfile()
  }, [committeeStore, userStore, questionsStore, id])

  const [visible, setVisible] = useState(false)
  const [portfolioUrl, setPortfolioUrl] = useState('')

  const { application } = committeeStore

  const currentApplication =
    committeeStore.applications.map(a => a._id).indexOf(id) + 1
  const totalApplication = committeeStore.applications.length
  const percentOfApplication = Math.floor(
    (currentApplication / totalApplication) * 100
  )

  const openDrawer = (url: string) => {
    setVisible(true)
    setPortfolioUrl(url)
  }

  const closeDrawer = () => {
    setVisible(false)
    setPortfolioUrl('')
  }

  return (
    <>
      <CandidateModal
        visible={visible}
        onClose={closeDrawer}
        url={portfolioUrl}
      />
      <PageTitle>ตรวจใบสมัคร (สาขา{MAJOR(userStore.profile.major)})</PageTitle>
      <CandidateBox>
        <Row gutter={16}>
          <Col md={5} lg={4} xl={3} xxl={2}>
            <Avatar shape="square" size={96} icon="user" />
          </Col>
          <Col md={19} lg={20} xl={21} xxl={22}>
            <table>
              <tbody>
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>ระดับการศึกษา</b>
                  </td>
                  <td>{application.academicYear}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>คณะ</b>
                  </td>
                  <td>{application.faculty}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>สาขาวิชา</b>
                  </td>
                  <td>{application.department}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>มหาวิทยาลัย</b>
                  </td>
                  <td>{application.university}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Divider />
        <Row>
          <SubHeading>กิจกรรมที่ทำผ่านมา</SubHeading>
          <AnswerBox
            disabled={true}
            autosize={true}
            value={application.activities}
          />
        </Row>
        <Divider />
        <Row>
          <SubHeading>คำถามกลาง</SubHeading>
          {application.questions.generalQuestions.length !== 0 &&
            GENERAL_QUESTION.map((question: string, i: number) => (
              <Fragment key={i}>
                <QuestionBox>
                  Q{i + 1}: {question}
                </QuestionBox>
                <AnswerBox
                  disabled={true}
                  autosize={true}
                  value={application.questions.generalQuestions[i].answer}
                />
              </Fragment>
            ))}
        </Row>
        <Divider />
        <Row>
          <SubHeading>คำถามสาขา ({MAJOR(userStore.profile.major)})</SubHeading>
          {application.questions.majorQuestions.length !== 0 &&
            MAJOR_QUESTION(userStore.profile.major).map(
              (question: string, i: number) => {
                const answer = application.questions.majorQuestions[i].answer
                if (userStore.profile.major === 'design' && i === 3) {
                  return (
                    <Fragment key={i}>
                      <QuestionBox>
                        Q{i + 1}: {question}
                      </QuestionBox>
                      <Button
                        icon="download"
                        onClick={() => openDrawer(answer)}
                      >
                        ดูคำตอบ
                      </Button>
                    </Fragment>
                  )
                }

                return (
                  <Fragment key={i}>
                    <QuestionBox>
                      Q{i + 1}: {question}
                    </QuestionBox>
                    <AnswerBox
                      disabled={true}
                      autosize={true}
                      value={application.questions.majorQuestions[i].answer}
                    />
                  </Fragment>
                )
              }
            )}
        </Row>
      </CandidateBox>
      <CommentBox>
        <SubHeading>คอมเมนท์จากคณะดำเนินงาน</SubHeading>
        <AnswerBox
          disabled={true}
          autosize={true}
          value={
            application.staffComment
              ? application.staffComment
              : 'ไม่มีความเห็น'
          }
        />
      </CommentBox>
      <VoteBox>
        <Row>
          <Col md={1}>
            <Button type="primary" shape="circle" icon="left" />
          </Col>
          <Col
            md={11}
            style={{
              alignItems: 'center',
              display: 'flex',
              height: '32px',
              paddingLeft: '20px'
            }}
          >
            <div>
              ใบสมัครที่ <b>{currentApplication}</b> จากทั้งหมด{' '}
              <b>{totalApplication}</b> ใบ คิดเป็น{' '}
              <b>{percentOfApplication}%</b>
            </div>
          </Col>
          <Col md={11} style={{ textAlign: 'right', paddingRight: '20px' }}>
            <Popconfirm
              placement="top"
              title="ยืนยันการให้คะแนน"
              okText="ยืนยัน"
              cancelText="ยกเลิก"
              icon={
                <Icon
                  type="info-circle"
                  theme="filled"
                  style={{ color: '#1890FF' }}
                />
              }
            >
              <Button type="danger" icon="close">
                ไม่ผ่าน
              </Button>
            </Popconfirm>{' '}
            <Popconfirm
              placement="top"
              title="ยืนยันการให้คะแนน"
              okText="ยืนยัน"
              cancelText="ยกเลิก"
              icon={
                <Icon
                  type="info-circle"
                  theme="filled"
                  style={{ color: '#1890FF' }}
                />
              }
            >
              <Button
                type="primary"
                icon="check"
                style={{ backgroundColor: '#56C41A', borderColor: '#56C41A' }}
              >
                ผ่าน
              </Button>
            </Popconfirm>
          </Col>
          <Col md={1} style={{ textAlign: 'right' }}>
            <Button type="primary" shape="circle" icon="right" />
          </Col>
        </Row>
      </VoteBox>
    </>
  )
}

export default observer(VoteCandidate)
