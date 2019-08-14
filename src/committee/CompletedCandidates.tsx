import { Button, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

import { ColumnProps, PaginationConfig } from 'antd/lib/table'
import { observer, useObservable } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import CommitteeCandidate from '../interfaces/CommitteeCandidate'
import CommitteeStore from '../stores/committee'
import UserStore from '../stores/user'
import { MAJOR } from '../utils/const'
import { PageTitle } from '../utils/styled-helper'

const CompletedCandidates = () => {
  const committeeStore = useObservable(CommitteeStore)
  const userStore = useObservable(UserStore)

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
      key: 'status',
      render: (user: CommitteeCandidate) => (
        <span>
          {user.completed ? (
            <Tag color="green" key={user._id}>
              ตรวจแล้ว
            </Tag>
          ) : (
            <Tag color="orange" key={user._id}>
              ยังไม่ตรวจตำตอบ
            </Tag>
          )}
        </span>
      ),
      title: 'สถานะการตรวจ'
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

  const onPageChange = (p: PaginationConfig) => {
    setPagination(p)
  }

  return (
    <>
      <PageTitle>
        ใบสมัครทั้งหมด (สาขา{MAJOR(userStore.profile.major)})
      </PageTitle>

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: CommitteeCandidate, index: number) => candidate._id}
        dataSource={committeeStore.completedApplication}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export default observer(CompletedCandidates)
