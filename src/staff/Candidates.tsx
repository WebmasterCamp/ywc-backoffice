import { Button, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'

import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import StaffCandidate from '../interfaces/StaffCandidate'
import StaffStore from '../stores/staff'
import { MAJOR } from '../utils/const'
import { PageTitle } from '../utils/styled-helper'
import { useProfile } from '../utils/useProfile'

const Candidates = () => {
  const staffStore = StaffStore
  const { major } = useProfile()

  useEffect(() => {
    staffStore.getApplications()
  }, [staffStore])

  const [pagination, setPagination] = useState({})

  const columns: ColumnProps<StaffCandidate>[] = [
    {
      key: '_id',
      render: (user: StaffCandidate) => <span>{user._id}</span>,
      title: 'ID',
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'ตรวจแล้ว',
          value: 'completed',
        },
        {
          text: 'ยังไม่ตรวจคำตอบ',
          value: 'incomplete',
        },
      ],
      key: 'status',
      onFilter: (value, record) => {
        return value === 'completed'
          ? record.completed === true
          : record.completed === false
      },
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
      title: 'สถานะการตรวจ',
    },
    {
      key: 'isPassStaff',
      render: (user: StaffCandidate) => {
        return typeof user.isPassStaff === 'boolean' ? (
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
        ) : (
          ``
        )
      },
      title: 'ผลการตรวจ',
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
      title: 'ดำเนินการ',
    },
  ]

  const onPageChange = (p: TablePaginationConfig) => {
    setPagination(p)
  }

  return (
    <>
      <PageTitle>ใบสมัครทั้งหมด (สาขา{MAJOR(major)})</PageTitle>

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: StaffCandidate, index?: number) => candidate._id}
        dataSource={staffStore.applications}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export default observer(Candidates)
