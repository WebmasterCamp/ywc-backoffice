import { Avatar, Button, Col, Divider, Popconfirm, Row } from 'antd'
import {
  InfoCircleFilled,
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import AnswerBox from '../common/AnswerBox'
import QuestionBox from '../common/QuestionBox'
import QuestionsStore from '../stores/questions'
import StaffStore from '../stores/staff'
import Box from '../ui/Box'
import CommentBox from '../ui/CommentBox'
import { GENERAL_QUESTION, IQuestion, MAJOR } from '../utils/const'
import { PageTitle, SubHeading } from '../utils/styled-helper'
import { useProfile } from '../utils/useProfile'

const CandidateBox = styled(Box)`
  padding: 20px;
`

const VoteBox = styled(Box)`
  padding: 10px 20px;
`

const VoteCandidate = () => {
  const staffStore = StaffStore
  const questionsStore = QuestionsStore
  const { major } = useProfile()

  const [staffComment, setStaffComment] = useState('')

  const id = useParams().id as string

  useEffect(() => {
    setStaffComment('')
    staffStore.getApplications()
    staffStore.getApplicationById(id)
  }, [staffStore, questionsStore, id])

  const { application } = staffStore

  const onConfirmPass = () => {
    staffStore.doVotePass(id, staffComment)
  }

  const onConfirmFailed = () => {
    staffStore.doVoteFailed(id, staffComment)
  }

  const currentApplication =
    staffStore.applications.map((a) => a._id).indexOf(id) + 1
  const totalApplication = staffStore.applications.length
  const percentOfApplication = Math.floor(
    (currentApplication / totalApplication) * 100
  )
  const prevApplicationId =
    currentApplication - 2 < 0
      ? ''
      : staffStore.applications[currentApplication - 2]._id
  const nextApplicationId =
    currentApplication >= staffStore.applications.length
      ? ''
      : staffStore.applications[currentApplication]._id

  return (
    <>
      <PageTitle>ตรวจใบสมัคร (สาขา{MAJOR(major)})</PageTitle>
      <CandidateBox>
        <Row gutter={16}>
          <Col md={5} lg={4} xl={3} xxl={2}>
            <Avatar shape="square" size={96} icon={<UserOutlined />} />
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
                    <b>สถานะ</b>
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
            GENERAL_QUESTION.map((question: IQuestion, i: number) => (
              <Fragment key={i}>
                <QuestionBox
                  dangerouslySetInnerHTML={{ __html: question.title }}
                />
                {!!application.questions.generalQuestions[i] && (
                  <AnswerBox
                    disabled={true}
                    autoSize={true}
                    value={application.questions.generalQuestions[i].answer}
                  />
                )}
              </Fragment>
            ))}
        </Row>
      </CandidateBox>
      <CommentBox>
        <SubHeading>คอมเมนท์จากคณะดำเนินงาน</SubHeading>
        {application.completed ? (
          <AnswerBox
            key="comment-disable"
            disabled={true}
            autoSize={true}
            value={
              application.staffComment
                ? application.staffComment
                : 'ไม่มีความเห็น'
            }
          />
        ) : (
          <AnswerBox
            key="comment-edit"
            onChange={(e) => {
              setStaffComment(e.target.value)
            }}
            value={staffComment}
            rows={6}
          />
        )}
      </CommentBox>
      <VoteBox>
        <Row>
          <Col md={1}>
            {prevApplicationId && (
              <Link to={`/staff/candidate/${prevApplicationId}`}>
                <Button type="primary" shape="circle" icon={<LeftOutlined />} />
              </Link>
            )}
          </Col>
          <Col
            md={11}
            style={{
              alignItems: 'center',
              display: 'flex',
              height: '32px',
              paddingLeft: '20px',
            }}
          >
            <div>
              ใบสมัครที่ <b>{currentApplication}</b> จากทั้งหมด{' '}
              <b>{totalApplication}</b> ใบ คิดเป็น{' '}
              <b>{percentOfApplication}%</b>
            </div>
          </Col>
          {application.completed ? (
            <Col
              md={11}
              style={{
                alignItems: 'center',
                display: 'flex',
                height: '32px',
                justifyContent: 'flex-end',
                paddingRight: '30px',
              }}
            >
              <div>ใบสมัครนี้ได้ถูกตรวจแล้ว</div>
            </Col>
          ) : (
            <Col md={11} style={{ textAlign: 'right', paddingRight: '20px' }}>
              <Popconfirm
                placement="top"
                title="ยืนยันการให้คะแนน"
                okText="ยืนยัน"
                onConfirm={onConfirmFailed}
                cancelText="ยกเลิก"
                icon={<InfoCircleFilled style={{ color: '#1890FF' }} />}
              >
                <Button danger icon={<CloseOutlined />}>
                  ไม่ผ่าน
                </Button>
              </Popconfirm>{' '}
              <Popconfirm
                placement="top"
                title="ยืนยันการให้คะแนน"
                okText="ยืนยัน"
                onConfirm={onConfirmPass}
                cancelText="ยกเลิก"
                icon={<InfoCircleFilled style={{ color: '#1890FF' }} />}
              >
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  style={{ backgroundColor: '#56C41A', borderColor: '#56C41A' }}
                >
                  ผ่าน
                </Button>
              </Popconfirm>
            </Col>
          )}
          <Col md={1} style={{ textAlign: 'right' }}>
            {nextApplicationId && (
              <Link to={`/staff/candidate/${nextApplicationId}`}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<RightOutlined />}
                />
              </Link>
            )}
          </Col>
        </Row>
      </VoteBox>
    </>
  )
}

export default observer(VoteCandidate)
