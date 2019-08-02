import { Button, Icon, Table, Tag } from 'antd'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { fetchWithToken } from '../utils/fetch'

const Stat = styled.div`
  color: #777;
  margin-bottom: 20px;
`

const Padding = styled.div`
  padding: 20px;
  padding-bottom: 5px;
`

export default class Candidates extends Component {
  public totalCandidates = 0
  public candidates = []
  public passStaff = 0
  public pagination = null

  public columns = [
    {
      dataIndex: 'key',
      key: 'key',
      title: 'No.'
    },
    {
      dataIndex: 'id',
      key: 'id',
      title: 'User ID.'
    },
    {
      dataIndex: 'status',
      filters: [
        {
          text: 'ตรวจแล้ว',
          value: 'true'
        },
        {
          text: 'ยังไม่ได้ตรวจ',
          value: 'false'
        }
      ],
      key: 'status',
      onFilter: (value: any, record: any) => value === `${record.status}`,
      render: (status: any) => (
        <span>
          <Tag color={!status ? 'red' : 'green'}>
            {!status ? 'ยังไม่ได้ตรวจ' : 'ตรวจแล้ว'}
          </Tag>
        </span>
      ),
      title: 'Status'
    },
    {
      key: 'action',
      render: (data: any) => (
        <Button>
          <Link to={`/committee/${data.id}?id=${data.id}`}>
            <Icon type="edit" theme="outlined" /> ตรวจคำถาม
          </Link>
        </Button>
      ),
      title: 'Action'
    }
  ]

  // fetch and render data
  public componentDidMount = async () => {
    this.getCandidates()
    this.getStat()
  }

  public getCandidates = async () => {
    // const { major } = this.props.auth.profile
    const major = ''
    const response = await fetchWithToken('users/committee', { major }, 'GET')

    if (response.status === 'success') {
      this.candidates = response.payload
    }

    // set pagination to current page on candidates table
    // this.pagination = { current: PaginationStore.currentPage }
  }

  public getStat = async () => {
    // const userResponse = await fetch('users/stat')
    // const users = userResponse.payload

    const statResponse = await fetchWithToken('users/committee/stat', {}, 'GET')

    this.passStaff = statResponse.payload.passStaff
    // this.totalCandidates = users[this.props.auth.profile.major]
  }

  public committeeScoreCounter = () => {
    const result = ''
    // const scores = this.candidates.reduce((prev, curr) => {
    //   const key = curr.committeeScore

    //   if (prev[key] === undefined) {
    //     prev[key] = 1
    //   } else {
    //     ++prev[key]
    //   }

    //   return prev
    // }, {})

    // for (const key in scores) {
    //   result += ` | คะแนน ${key} มีจำนวน ${scores[key]} คน | `
    // }

    return result
  }

  public onPageChange = (pagination: any) => {
    // PaginationStore.currentPage = pagination.current
    // this.pagination = { current: pagination.current }
  }

  public render() {
    const profile = {
      major: 'programming',
      username: 'lel'
    }

    return (
      <Fragment>
        <Padding>
          <Stat>
            จำนวนใบสมัครทั้งหมด {this.totalCandidates} จำนวนที่ผ่านการคัด{' '}
            {this.passStaff} จำนวนที่ตรวจแล้ว{' '}
            {
              this.candidates.filter(
                (x: any) => x.committeeVote.indexOf(profile.username) !== -1
              ).length
            }{' '}
            ({profile.major})<br />
            จำนวนการโหวตผ่าน: {this.committeeScoreCounter()}
          </Stat>
        </Padding>

        <Table
          columns={this.columns}
          onChange={this.onPageChange}
          // pagination={this.pagination}
          dataSource={this.candidates.map((candidate: any, i: number) => ({
            id: candidate._id,
            key: i + 1,
            status: candidate.committeeVote.indexOf(profile.username) !== -1,
            username: profile.username
          }))}
        />
      </Fragment>
    )
  }
}
