import { Button, Table, Tag } from 'antd'
import { ReactNode, useState } from 'react'

import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { LoaderData } from './loader'

interface CandidatesTableProps {
  header: ReactNode
  applications: LoaderData['applications']
}

type RowType = CandidatesTableProps['applications'][number]

export const CandidatesTable = ({
  header,
  applications,
}: CandidatesTableProps) => {
  const [pagination, setPagination] = useState({})

  const columns: ColumnProps<RowType>[] = [
    {
      key: '_id',
      render: (user: RowType) => <span>{user.id}</span>,
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
      key: 'isPassStaff',
      render: (user: RowType) => {
        return typeof user.isPassStaff === 'boolean' ? (
          <span>
            {user.isPassStaff ? (
              <Tag color="green">ผ่าน</Tag>
            ) : (
              <Tag color="red">ไม่ผ่าน</Tag>
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
      render: (user: RowType) => (
        <span>
          {user.completed ? (
            <Link to={`/staff/candidate/${user.id}`}>
              <Button>แก้ไขคะแนน</Button>
            </Link>
          ) : (
            <Link to={`/staff/candidate/${user.id}`}>
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
      {header}

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
