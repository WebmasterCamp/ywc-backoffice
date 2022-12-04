import { Button, Table, Tag } from 'antd'
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import StaffCandidate from '../interfaces/StaffCandidate'
import StaffStore from '../stores/staff'
import UserStore from '../stores/user'
import { MAJOR } from '../utils/const'
import { PageTitle } from '../utils/styled-helper'

const CompletedCandidates = () => {
  const staffStore = StaffStore
  const userStore = UserStore

  useEffect(() => {
    staffStore.getCompletedApplication()
    userStore.getProfile()
  }, [staffStore, userStore])

  const [pagination, setPagination] = useState({})

  const columns: ColumnProps<StaffCandidate>[] = [
    {
      key: '_id',
      render: (user: StaffCandidate) => <span>{user._id}</span>,
      title: 'ID'
    },
    {
      key: 'status',
      render: (user: StaffCandidate) => (
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
      key: 'isPassStaff',
      render: (user: StaffCandidate) => (
        <span>
          {user.isPassStaff ? (
            <Tag color="green" key={user._id}>
              ผ่าน
            </Tag>
          ) : (
            <Tag color="red" key={user._id}>
              ไม่ผ่าน
            </Tag>
          )}
        </span>
      ),
      title: 'ผลการตรวจ'
    },
    {
      key: 'action',
      render: (user: StaffCandidate) => (
        <span>
          {user.completed ? (
            <Link to={`/staff/candidate/${user._id}`}>
              <Button>แก้ไขคะแนน</Button>
            </Link>
          ) : (
            <Link to={`/staff/candidate/${user._id}`}>
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
      </PageTitle>

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: StaffCandidate, index?: number) => candidate._id}
        dataSource={staffStore.completedApplication}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export default observer(CompletedCandidates)
