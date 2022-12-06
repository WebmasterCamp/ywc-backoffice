import { Avatar, Button, Col, Divider, Popconfirm, Row, Tag } from 'antd'
import {
  InfoCircleFilled,
  UserOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { Fragment, useEffect, useState } from 'react'
import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
  useSubmit,
} from 'react-router-dom'
import styled from '@emotion/styled'

import AnswerBox from '../../../common/AnswerBox'
import QuestionBox from '../../../common/QuestionBox'
import Box from '../../../ui/Box'
import CommentBox from '../../../ui/CommentBox'
import {
  GENERAL_QUESTION,
  IQuestion,
  MAJOR,
  MAJOR_QUESTION,
  QUESTION_TYPES,
} from '../../../utils/const'
import { PageTitle, SubHeading } from '../../../utils/styled-helper'
import DesignAnswerModal from '../../DesignAnswerModal'
import { useProfile } from '../../../utils/useProfile'
import { loader, LoaderData } from './loader'
import { LoaderData as ParentLoaderData } from '../loader'
import { action } from './action'

const CandidateBox = styled(Box)`
  padding: 20px;
`

const VoteBox = styled(Box)`
  padding: 10px 20px;
`

const VoteCandidate = () => {
  const { major } = useProfile()

  const id = useParams().candidateId as string

  const { application } = useLoaderData() as LoaderData
  const { applications } = useOutletContext() as ParentLoaderData

  useEffect(() => {
    setComment(application.comment ?? '')
  }, [application.comment])

  const [visible, setVisible] = useState(false)
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [comment, setComment] = useState('')

  const currentApplication = applications.findIndex((a) => a.id === id) + 1
  const totalApplication = applications.length
  const percentOfApplication = Math.floor(
    (currentApplication / totalApplication) * 100
  )
  const prevApplicationId =
    currentApplication - 2 < 0 ? '' : applications[currentApplication - 2].id
  const nextApplicationId =
    currentApplication >= applications.length
      ? ''
      : applications[currentApplication].id

  const openDrawer = (url: string) => {
    setVisible(true)
    setPortfolioUrl(url)
  }

  const closeDrawer = () => {
    setVisible(false)
    setPortfolioUrl('')
  }

  const submit = useSubmit()
  const submitVote = (score: number) => {
    submit(
      { id, score: `${score}`, comment, nextApplicationId },
      {
        method: 'post',
      }
    )
  }

  const onConfirmPass = () => submitVote(1)
  const onConfirmFailed = () => submitVote(0)

  return (
    <>
      <DesignAnswerModal
        visible={visible}
        onClose={closeDrawer}
        url={portfolioUrl}
      />
      <PageTitle>ตรวจใบสมัคร (สาขา{MAJOR(major)})</PageTitle>
      <CandidateBox>
        <Row gutter={16}>
          <Col md={5} lg={4} xl={3} xxl={2}>
            <Avatar
              shape="square"
              size={96}
              icon={<UserOutlined />}
              src={application.picture}
            />
          </Col>
          <Col md={19} lg={20} xl={21} xxl={22}>
            <table>
              <tbody>
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>ชื่อ - นามสกุล</b>
                  </td>
                  <td>
                    {application.firstName} {application.lastName} (
                    {application.nickname})
                  </td>
                </tr>
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
                <tr>
                  <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                    <b>สถานะการตรวจ</b>
                  </td>
                  <td>
                    {application.completed ? (
                      <Tag color="green">ตรวจแล้ว</Tag>
                    ) : (
                      <Tag color="orange">ยังไม่ตรวจคำตอบ</Tag>
                    )}
                  </td>
                </tr>
                {application.completed && (
                  <tr>
                    <td style={{ textAlign: 'right', paddingRight: '7px' }}>
                      <b>ผลการตรวจ</b>
                    </td>
                    <td>
                      {application.score === 1 ? (
                        <Tag color="green">ผ่าน</Tag>
                      ) : (
                        <Tag color="red">ไม่ผ่าน</Tag>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Col>
        </Row>
        <Divider />
        <Row>
          <SubHeading>กิจกรรมที่ทำผ่านมา</SubHeading>
          <AnswerBox
            disabled={true}
            autoSize={true}
            value={application.activities ?? ''}
          />
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
        <Divider />
        <Row>
          <SubHeading>คำถามสาขา ({MAJOR(major)})</SubHeading>
          {application.questions.majorQuestions.length !== 0 &&
            MAJOR_QUESTION(major).map((question: IQuestion, i: number) => {
              const answer = application.questions.majorQuestions[i].answer
              return (
                answer && (
                  <Fragment key={i}>
                    <QuestionBox
                      dangerouslySetInnerHTML={{
                        __html: question.title,
                      }}
                    />
                    {question.type === QUESTION_TYPES.FILE ? (
                      <Button
                        icon={<DownloadOutlined />}
                        onClick={() => openDrawer(answer)}
                        style={{ margin: '5px auto 25px auto' }}
                      >
                        ดูคำตอบ
                      </Button>
                    ) : (
                      <AnswerBox
                        disabled={true}
                        autoSize={true}
                        value={application.questions.majorQuestions[i].answer}
                      />
                    )}
                  </Fragment>
                )
              )
            })}
        </Row>
      </CandidateBox>
      <CommentBox>
        <SubHeading>คอมเมนท์จากคณะดำเนินงาน</SubHeading>
        <AnswerBox
          disabled={true}
          autoSize={true}
          value={
            application.staffComment
              ? application.staffComment
              : 'ไม่มีความเห็น'
          }
        />
      </CommentBox>
      <CommentBox>
        <SubHeading>คอมเมนท์ของกรรมการ</SubHeading>
        <AnswerBox
          rows={6}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}
        />
      </CommentBox>
      <VoteBox>
        <Row>
          <Col md={1}>
            {prevApplicationId && (
              <Link to={`/committee/candidate/${prevApplicationId}`}>
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
          <Col md={1} style={{ textAlign: 'right' }}>
            {nextApplicationId && (
              <Link to={`/committee/candidate/${nextApplicationId}`}>
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

export const voteCandidateRoute = {
  path: 'candidate/:candidateId',
  action,
  loader,
  element: <VoteCandidate />,
}
