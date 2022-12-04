import { Button, Input, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { observer, useObservable } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import CommitteeCandidate, {
  CommitteeVote
} from '../interfaces/CommitteeCandidate'
import CommitteeStore from '../stores/committee'
import UserStore from '../stores/user'
import { MAJOR } from '../utils/const'
import { PageTitle } from '../utils/styled-helper'
import useSearchApplications from '../utils/useSearchApplications'

const CompletedCandidates = () => {
  const committeeStore = useObservable(CommitteeStore)
  const userStore = useObservable(UserStore)
  const { applications, onSearch } = useSearchApplications(
    committeeStore.completedApplication
  )

  useEffect(() => {
    committeeStore.getCompletedApplication()
    userStore.getProfile()
  }, [committeeStore, userStore])

  const [pagination, setPagination] = useState({})

  const columns: ColumnProps<CommitteeCandidate>[] = [
    {
      key: '_id',
      render: (user: CommitteeCandidate) => <span>{user._id}</span>,
      title: 'ID'
    },
    {
      key: 'fullName',
      render: (user: CommitteeCandidate) => (
        <span>
          {user.firstName} {user.lastName} ({user.nickname})
        </span>
      ),
      title: 'ชื่อ นามสกุล (ชื่อเล่น)'
    },
    {
      key: 'status',
      render: (user: CommitteeCandidate) => (
        <span>
          {user.completed ? (
            <Tag color="green" key={user._id}>
              ตรวจแล้ว
            </Tag>
          ) : (
            <Tag color="orange" key={user._id}>
              ยังไม่ตรวจคำตอบ
            </Tag>
          )}
        </span>
      ),
      title: 'สถานะการตรวจ'
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'ผ่าน',
          value: '1'
        },
        {
          text: 'ไม่ผ่าน',
          value: '0'
        }
      ],
      key: 'result',
      onFilter: (value, user) => {
        const vote = user.committeeVote.find(
          (v: CommitteeVote) => v.committee === userStore.profile.username
        )
        return !!vote && value === `${vote.score}`
      },
      render: (user: CommitteeCandidate) => {
        const vote = user.committeeVote.find(
          (v: CommitteeVote) => v.committee === userStore.profile.username
        )
        return (
          vote && (
            <span>
              {vote.score === 1 ? (
                <Tag color="green" key={user._id}>
                  ผ่าน
                </Tag>
              ) : vote.score === 0 ? (
                <Tag color="red" key={user._id}>
                  ไม่ผ่าน
                </Tag>
              ) : null}
            </span>
          )
        )
      },
      title: 'ผลการตรวจ'
    },
    {
      key: 'action',
      render: (user: CommitteeCandidate) => (
        <span>
          {user.completed ? (
            <Link to={`/committee/candidate/${user._id}`}>
              <Button>แก้ไขคะแนน</Button>
            </Link>
          ) : (
            <Link to={`/committee/candidate/${user._id}`}>
              <Button>ตรวจคำตอบ</Button>
            </Link>
          )}
        </span>
      ),
      title: 'ดำเนินการ'
    }
  ]

  const onPageChange = (p: TablePaginationConfig) => {
    setPagination(p)
  }

  return (
    <>
      <PageTitle>
        ใบสมัครที่ตรวจเสร็จ (สาขา{MAJOR(userStore.profile.major)})
        <Input
          placeholder="ค้นหาใบสมัคร"
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={onSearch}
        />
      </PageTitle>

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: CommitteeCandidate, index?: number) =>
          candidate._id
        }
        dataSource={applications}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export default observer(CompletedCandidates)
