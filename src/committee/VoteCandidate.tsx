import { Avatar, Col, Divider, Row } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { Fragment, useEffect } from 'react'
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
    questionsStore.getQuestions()
    committeeStore.getApplicationById(id)
    committeeStore.getCommitteeStatus()
    userStore.getProfile()
  }, [committeeStore, userStore, questionsStore, id])

  const { application } = committeeStore

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
          <AnswerBox>
            {application.activities.split('\n').map((item: any, i: number) => (
              <Fragment key={i}>
                {item}
                <br />
              </Fragment>
            ))}
          </AnswerBox>
        </Row>
        <Divider />
        <Row>
          <SubHeading>คำถามกลาง</SubHeading>
          {questionsStore.questions.general.map(
            (question: string, i: number) => (
              <Fragment key={i}>
                <QuestionBox>
                  Q{i + 1}: {question}
                </QuestionBox>
                <AnswerBox>
                  {application.questions.generalQuestions.length &&
                    application.questions.generalQuestions[i].answer
                      .split('\n')
                      .map((item, j) => (
                        <Fragment key={j}>
                          {item}
                          <br />
                        </Fragment>
                      ))}
                </AnswerBox>
              </Fragment>
            )
          )}
        </Row>
        <Divider />
        <Row>
          <SubHeading>คำถามสาขา ({MAJOR(userStore.profile.major)})</SubHeading>
          {userStore.profile.major !== '' &&
            questionsStore.questions[userStore.profile.major].map(
              (question: string, i: number) => (
                <Fragment key={i}>
                  <QuestionBox>
                    Q{i + 1}: {question}
                  </QuestionBox>
                  <AnswerBox>
                    {application.questions.majorQuestions.length &&
                      application.questions.majorQuestions[i].answer
                        .split('\n')
                        .map((item, j) => (
                          <Fragment key={j}>
                            {item}
                            <br />
                          </Fragment>
                        ))}
                  </AnswerBox>
                </Fragment>
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
