import { Button, Table, Tag } from 'antd'
// import moment from 'moment'
import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'

import { ColumnProps, PaginationConfig } from 'antd/lib/table'
import { observer, useObservable } from 'mobx-react-lite'
import CommitteeCandidate from '../interfaces/CommitteeCandidate'
import CommitteeStore from '../stores/committee'
import UserStore from '../stores/user'
import { MAJOR } from '../utils/const'
import { Heading } from '../utils/styled-helper'

const Candidates = () => {
  const committeeStore = useObservable(CommitteeStore)
  const userStore = useObservable(UserStore)

  useEffect(() => {
    committeeStore.getApplications()
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
      filterMultiple: false,
      filters: [
        {
          text: 'ตรวจแล้ว',
          value: 'completed'
        },
        {
          text: 'ยังไม่ตรวจตำตอบ',
          value: 'incomplete'
        }
      ],
      key: 'status',
      onFilter: (value: string, record: CommitteeCandidate) => {
        return value === 'completed'
          ? record.committeeVote.includes(userStore.profile.username)
          : !record.committeeVote.includes(userStore.profile.username)
      },
      render: (user: CommitteeCandidate) => (
        <span>
          {user.committeeVote.includes(userStore.profile.username) ? (
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
          {user.committeeVote.includes(userStore.profile.username) ? (
            <Button>แก้ไขคะแนน</Button>
          ) : (
            <Button>ตรวจคำตอบ</Button>
          )}
        </span>
      ),
      title: 'ดำเนินการ'
    }
  ]

  // const handleSearch = (selectedKeys: any, confirm: any) => () => {
  //   confirm()
  //   // this.setState({ searchText: selectedKeys[0] })
  // }

  // const handleReset = (clearFilters: any) => () => {
  //   clearFilters()
  //   // this.setState({ searchText: '' })
  // }

  const onPageChange = (p: PaginationConfig) => {
    setPagination(p)
  }

  return (
    <>
      <Heading>ใบสมัครทั้งหมด (สาขา{MAJOR(userStore.profile.major)})</Heading>

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: CommitteeCandidate, index: number) => candidate._id}
        dataSource={committeeStore.applications}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export default observer(Candidates)
