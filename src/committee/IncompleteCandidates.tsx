import { Button, Input, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { observer, useObservable } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import CommitteeCandidate from '../interfaces/CommitteeCandidate'
import CommitteeStore from '../stores/committee'
import UserStore from '../stores/user'
import { MAJOR } from '../utils/const'
import { PageTitle } from '../utils/styled-helper'
import useSearchApplications from '../utils/useSearchApplications'

const IncompleteCandidates = () => {
  const committeeStore = useObservable(CommitteeStore)
  const userStore = useObservable(UserStore)
  const { applications, onSearch } = useSearchApplications(
    committeeStore.incompleteApplication
  )

  useEffect(() => {
    committeeStore.getIncompleteApplication()
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
        ใบสมัครที่ตรวจไม่เสร็จ (สาขา{MAJOR(userStore.profile.major)})
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

export default observer(IncompleteCandidates)
