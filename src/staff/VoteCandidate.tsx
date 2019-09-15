import { Avatar, Button, Col, Divider, Icon, Popconfirm, Row } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'

import moment from 'moment'
import AnswerBox from '../common/AnswerBox'
import QuestionBox from '../common/QuestionBox'
import QuestionsStore from '../stores/questions'
import StaffStore from '../stores/staff'
import UserStore from '../stores/user'
import Box from '../ui/Box'
import CommentBox from '../ui/CommentBox'
import { GENERAL_QUESTION, MAJOR } from '../utils/const'
import { PageTitle, SubHeading } from '../utils/styled-helper'

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
  const staffStore = useObservable(StaffStore)
  const userStore = useObservable(UserStore)
  const questionsStore = useObservable(QuestionsStore)

  const [staffComment, setStaffComment] = useState('')

  const {
    match: {
      params: { id }
    }
  } = props

  useEffect(() => {
    setStaffComment('')
    staffStore.getApplications()
    staffStore.getApplicationById(id)
    staffStore.getCommitteeStatus()
    userStore.getProfile()
  }, [staffStore, userStore, questionsStore, id])

  const { application } = staffStore

  const onConfirmPass = () => {
    staffStore.doVotePass(id, staffComment)
  }

  const onConfirmFailed = () => {
    staffStore.doVoteFailed(id, staffComment)
  }

  const currentApplication =
    staffStore.applications.map(a => a._id).indexOf(id) + 1
  const totalApplication = staffStore.applications.length
  const percentOfApplication = Math.floor(
    (currentApplication / totalApplication) * 100
  )

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
              <tbody>
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>อายุ</b>
                  </td>
                  <td>
                    {application.birthdate &&
                      moment(application.birthdate).fromNow(true)}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>เพศ</b>
                  </td>
                  <td>{application.sex}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>สถาณะ</b>
                  </td>
                  <td>{application.educationStatus}</td>
                </tr>
              </tbody>
            </table>
          </Col>
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
      </CandidateBox>
      <CommentBox>
        <SubHeading>คอมเมนท์จากคณะดำเนินงาน</SubHeading>
        <AnswerBox
          onChange={e => {
            setStaffComment(e.target.value)
          }}
          value={staffComment}
          rows={6}
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
              onConfirm={onConfirmFailed}
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
              onConfirm={onConfirmPass}
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
