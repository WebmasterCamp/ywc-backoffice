import { Button, Input, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ReactNode, useState } from 'react'

import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { PageTitle } from '../../utils/styled-helper'
import { useProfile } from '../../utils/useProfile'
import { LoaderData } from './loader'
import { useSearchEntities } from '../../utils/useSearchEntities'

interface CandidatesTableProps {
  header: ReactNode
  applications: LoaderData['applications']
}

type RowType = CandidatesTableProps['applications'][number]

const searchKeys = ['id', 'firstName', 'lastName', 'nickname'] as const

export const CandidatesTable = ({
  header,
  applications: allApplications,
}: CandidatesTableProps) => {
  const { username } = useProfile()
  const { filtered: applications, onSearch } = useSearchEntities(
    searchKeys,
    allApplications
  )

  const [pagination, setPagination] = useState({})

  const columns: ColumnProps<RowType>[] = [
    {
      key: '_id',
      render: (user: RowType) => <span>{user.id}</span>,
      title: 'ID',
    },
    {
      key: 'fullName',
      render: (user: RowType) => (
        <span>
          {user.firstName} {user.lastName} ({user.nickname})
        </span>
      ),
      title: 'ชื่อ นามสกุล (ชื่อเล่น)',
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
      render: (user: RowType) => (
        <span>
          {user.completed ? (
            <Tag color="green">ตรวจแล้ว</Tag>
          ) : (
            <Tag color="orange">ยังไม่ตรวจคำตอบ</Tag>
          )}
        </span>
      ),
      title: 'สถานะการตรวจ',
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'ผ่าน',
          value: '1',
        },
        {
          text: 'ไม่ผ่าน',
          value: '0',
        },
      ],
      key: 'result',
      onFilter: (value, user) => {
        const vote = user.committeeVote.find((v) => v.committee === username)
        return !!vote && value === `${vote.score}`
      },
      render: (user: RowType) => {
        const vote = user.committeeVote.find((v) => v.committee === username)
        return (
          vote && (
            <span>
              {vote.score === 1 ? (
                <Tag color="green">ผ่าน</Tag>
              ) : vote.score === 0 ? (
                <Tag color="red">ไม่ผ่าน</Tag>
              ) : null}
            </span>
          )
        )
      },
      title: 'ผลการตรวจ',
    },
    {
      key: 'action',
      render: (user: RowType) => (
        <span>
          {user.completed ? (
            <Link to={`/committee/candidate/${user.id}`}>
              <Button>แก้ไขคะแนน</Button>
            </Link>
          ) : (
            <Link to={`/committee/candidate/${user.id}`}>
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
      <PageTitle>
        {header}
        <Input
          placeholder="ค้นหาใบสมัคร"
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={onSearch}
        />
      </PageTitle>

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: RowType, index?: number) => candidate.id}
        dataSource={applications}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}
