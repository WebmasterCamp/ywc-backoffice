import { Button, Divider, Form } from 'antd'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { fetch, fetchWithToken } from '../utils/fetch'
import notification from '../utils/notification'

const FormItem = Form.Item

const Padding = styled.div`
  padding: 20px;
  padding-bottom: 5px;
`

const Heading = styled.div`
  font-family: 'Kanit', sans-serif;
  font-size: 20px;
  padding: 10px 0;
  font-weight: bold;
`

const Answer = styled.div`
  font-size: 18px;
  margin-bottom: 25px;
`

const Label = styled.div`
  font-family: 'Kanit', sans-serif;
  font-size: 18px;
  color: #777;

  margin-bottom: 10px;
`

interface VoteCandidateProps {
  match: {
    params: {
      id: string
    }
  }
}

export default class VoteCandidate extends Component<VoteCandidateProps> {
  public generalQuestions = []
  public generalAnswers = []
  public majorQuestions = []
  public majorAnswers = []
  public candidate = {}
  public loading = false
  public hide = false

  public getUserIdentity = () => {
    const url = window.location.href.split('/')
    return url[url.length - 1]
  }

  // fetch and render data
  public componentDidMount = async () => {
    this.getQuestion()
    this.getCandidateData()
  }

  public getQuestion = async () => {
    const response = await fetch('questions')

    if (response.status === 'success') {
      this.generalQuestions = response.payload.general
      // this.majorQuestions = response.payload[this.props.auth.profile.major]
    }
  }

  public getCandidateData = async () => {
    const response = await fetchWithToken(
      `users/committee/${this.getUserIdentity()}`,
      {},
      'GET'
    )

    if (response.status === 'success') {
      this.candidate = response.payload
      this.generalAnswers = response.payload.questions.generalQuestions.map(
        (x: any) => x.answer
      )
      this.majorAnswers = response.payload.questions.majorQuestions.map(
        (x: any) => x.answer
      )
    }
  }

  public handleSubmit = (score: any) => async () => {
    this.loading = true

    const response = await fetchWithToken(
      'grading/committee/vote',
      { id: this.getUserIdentity(), score },
      'POST'
    )

    this.loading = false

    if (response.status === 'success') {
      notification('success', 'Success', 'ให้คะแนนผู้สมัครเรียบร้อยแล้ว')
      this.hide = true
    } else {
      notification('error', 'Error', response.payload.message)
    }
  }

  public render() {
    // const { profile } = this.props.auth

    return (
      <Fragment>
        <Padding>
          <div>id: {this.getUserIdentity()}</div>

          <Divider />
          <Label>รายละเอียดส่วนตัว</Label>
          {/* <ProfileTable
            keys={[
              'ปีการศึกษา',
              'คณะ',
              'สาขาวิชา',
              'มหาลัย',
              'กิจกรรม',
              'คอมเม้นจาก Staff'
            ]}
            values={[
              this.candidate.academicYear,
              this.candidate.faculty,
              this.candidate.department,
              this.candidate.university,
              this.candidate.activities,
              `${this.candidate.staffComment} (${this.candidate.staffUsername})`
            ]}
          /> */}

          <Divider />
          <Label>คำถามกลาง</Label>
          {this.generalQuestions.map((question, i) => {
            return (
              <div key={i}>
                <Heading>
                  {i + 1}. {question}
                </Heading>
                <Answer>
                  <pre>{this.generalAnswers[i]}</pre>
                </Answer>
              </div>
            )
          })}

          <Divider />
          <Label>คำถามสาขา (programming)</Label>
          {this.majorQuestions.map((question, i) => {
            return (
              <div key={i}>
                <Heading>
                  {i + 1}. {question}
                </Heading>
                <Answer>
                  <pre>{this.majorAnswers[i]}</pre>
                </Answer>
              </div>
            )
          })}

          <br />
          <Form style={{ display: this.hide ? 'none' : 'block' }}>
            <FormItem>
              <Button
                style={{ marginRight: '10px' }}
                onClick={this.handleSubmit(1)}
                loading={this.loading}
                type="primary"
              >
                เลือก
              </Button>
              <Button
                onClick={this.handleSubmit(0)}
                loading={this.loading}
                type="dashed"
              >
                ไม่เลือก
              </Button>
            </FormItem>
          </Form>
        </Padding>
      </Fragment>
    )
  }
}
