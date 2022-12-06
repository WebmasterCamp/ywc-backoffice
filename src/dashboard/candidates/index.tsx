import { Button, Input, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { MAJOR, STEP } from '../../utils/const'
import { PageTitle } from '../../utils/styled-helper'
import CandidateModal from '../candidateModal'
import { loader, LoaderData } from './loader'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { useSearchEntities } from '../../utils/useSearchEntities'
import { UserStatus } from '../../schemas/models'

type RowType = LoaderData[number]

const searchKeys = [
  'id',
  'firstName',
  'firstNameEN',
  'lastName',
  'lastNameEN',
  'nickname',
] as const

const Candidates = () => {
  const allCandidates = useLoaderData() as LoaderData

  const { filtered: candidates, onSearch } = useSearchEntities(
    searchKeys,
    allCandidates
  )

  const [pagination, setPagination] = useState({})
  const [visible, setVisible] = useState(false)
  const [drawerId, setDrawerId] = useState('')

  const openDrawer = (id: string) => {
    setVisible(true)
    setDrawerId(id)
  }

  const closeDrawer = () => {
    setVisible(false)
    setDrawerId('')
  }

  const columns: ColumnProps<RowType>[] = [
    {
      key: '_id',
      render: (user: RowType) => <span>{user.id}</span>,
      title: 'ID',
    },
    {
      key: 'name',
      render: (user: RowType) => (
        <span>
          {user.firstNameEN} {user.lastNameEN} ({user.nickname})
        </span>
      ),
      title: 'ชื่อ นามสกุล (ชื่อเล่น)',
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'โปรแกรมมิ่ง',
          value: 'programming',
        },
        {
          text: 'คอนเทนท์',
          value: 'content',
        },
        {
          text: 'มาร์เก็ตติ้ง',
          value: 'marketing',
        },
        {
          text: 'ดีไซน์',
          value: 'design',
        },
      ],
      key: 'major',
      onFilter: (value, record) => record.major === value,
      render: (candidate: RowType) => {
        return <span>{MAJOR(candidate.major)}</span>
      },
      title: 'สาขา',
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'กำลังดำเนินการ',
          value: 'in progress',
        },
        {
          text: 'เรียบร้อย',
          value: 'completed',
        },
      ],
      key: 'status',
      onFilter: (value, record: RowType) => {
        return record.status === value
      },
      render: (user: RowType) => (
        <span>
          {user.status === UserStatus.COMPLETED ? (
            <Tag color="geekblue" key={user.status}>
              เรียบร้อย
            </Tag>
          ) : (
            <Tag color="green" key={user.status}>
              กำลังดำเนินการ
            </Tag>
          )}
        </span>
      ),
      title: 'สถานะการส่งใบสมัคร',
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'ข้อมูลส่วนตัว',
          value: 'info',
        },
        {
          text: 'ข้อมูลการติดต่อ',
          value: 'contact',
        },
        {
          text: 'คำถามกลาง',
          value: 'general',
        },
        {
          text: 'คำถามสาขา',
          value: 'major',
        },
        {
          text: 'สรุปข้อมูล',
          value: 'summary',
        },
      ],
      key: 'step',
      onFilter: (value, record) =>
        record.step === value && record.status !== UserStatus.COMPLETED,
      render: (candidate: RowType) => {
        if (candidate.status === UserStatus.COMPLETED) {
          return <Tag color="geekblue">ลงทะเบียนสำเร็จ</Tag>
        }
        return <span>{STEP(candidate.step)}</span>
      },
      title: 'ขั้นตอน',
    },
    {
      key: 'staffPass',
      render: (user: RowType) => (
        <span>
          {user.isPassStaff || user.failed ? (
            <Tag color="geekblue">เรียบร้อย</Tag>
          ) : (
            <Tag color="green">กำลังดำเนินการ</Tag>
          )}
        </span>
      ),
      title: 'สตาฟค่ายตรวจ',
    },
    {
      key: 'committeePass',
      render: (user: RowType) => (
        <span>
          {user.committeeVote.length > 0 ? (
            <Tag color="geekblue">เรียบร้อย</Tag>
          ) : (
            <Tag color="green">กำลังดำเนินการ</Tag>
          )}
        </span>
      ),
      title: 'ส่งให้กรรมการสาขา',
    },
    {
      key: 'action',
      render: (user: RowType) => (
        <span>
          <Button onClick={() => openDrawer(user.id)}>ดูใบสมัคร</Button>
        </span>
      ),
      title: 'ดำเนินการ',
    },
  ]

  // const handleSearch = (selectedKeys: any, confirm: any) => () => {
  //   confirm()
  //   // this.setState({ searchText: selectedKeys[0] })
  // }

  // const handleReset = (clearFilters: any) => () => {
  //   clearFilters()
  //   // this.setState({ searchText: '' })
  // }

  const onPageChange = (p: TablePaginationConfig) => {
    setPagination(p)
  }

  return (
    <>
      <PageTitle>
        ผู้เข้าสมัครทั้งหมด
        <Input
          placeholder="ค้นหาผู้เข้าสมัคร"
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={onSearch}
        />
      </PageTitle>
      {/* <Padding>
        <pre>{scoreCounter}</pre>
      </Padding> */}

      {/* <CandidateModal
        edit={false}
        showCandidateModal={showCandidateModal}
        closeModal={closeModal}
        candidate={candidateData}
      /> */}

      <CandidateModal
        visible={visible}
        onClose={closeDrawer}
        candidateId={drawerId}
      />

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: RowType, index?: number) => candidate.id}
        dataSource={candidates}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export const candidatesRoute = {
  path: '',
  loader,
  element: <Candidates />,
}
