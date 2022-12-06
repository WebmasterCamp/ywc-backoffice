import { Button, Col, Popconfirm, Row, Tag } from 'antd'
import {
  InfoCircleFilled,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import Table, { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { useState } from 'react'
import CandidateModal from '../../dashboard/candidateModal'
import { MAJOR } from '../../utils/const'
import { PageTitle } from '../../utils/styled-helper'
import { useLoaderData, useParams, useSubmit } from 'react-router-dom'
import { loader, LoaderData } from './loader'
import { action } from './action'

type RowType = LoaderData['filteredCandidates'][number]

const CandidateInterview = () => {
  const major = useParams().major as string
  const { filteredCandidates } = useLoaderData() as LoaderData

  const [pagination, setPagination] = useState({})
  const [selected, setSelected] = useState<string[]>([])
  const [visible, setVisible] = useState(false)
  const [drawerId, setDrawerId] = useState('')

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: RowType[]) => {
      setSelected(selectedRows.map((c) => c.id))
    },
  }

  const submit = useSubmit()

  const onConfirmPass = () => {
    submit(
      { selected: JSON.stringify(selected), status: 'pass' },
      { method: 'post', replace: true }
    )
  }

  const onConfirmFailed = () => {
    submit(
      { selected: JSON.stringify(selected), status: 'eject' },
      { method: 'post', replace: true }
    )
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
          {user.firstName} {user.lastName} ({user.nickname})
        </span>
      ),
      title: 'ชื่อ นามสกุล (ชื่อเล่น)',
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'เลือก',
          value: 'true',
        },
        {
          text: 'ไม่เลือก',
          value: 'false',
        },
      ],
      key: 'passInterview',
      onFilter: (value, record: RowType) => {
        return String(record.passInterview) === value
      },
      render: (user: RowType) => (
        <span>
          {user.passInterview ? (
            <Tag color="green" key={user.status}>
              เลือก
            </Tag>
          ) : (
            <Tag color="orange" key={user.status}>
              ไม่เลือก
            </Tag>
          )}
        </span>
      ),
      title: 'เลือกเข้าสัมภาษณ์',
    },
    {
      defaultSortOrder: 'descend',
      filterMultiple: true,
      filters: [
        {
          text: '0',
          value: '0',
        },
        {
          text: '1',
          value: '1',
        },
        {
          text: '2',
          value: '2',
        },
        {
          text: '3',
          value: '3',
        },
        {
          text: '4',
          value: '4',
        },
      ],
      key: 'committeeScore',
      onFilter: (value, record: RowType) =>
        record.committeeScore === Number(value),
      render: (user: RowType) => <span>{user.committeeScore}</span>,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.committeeScore - b.committeeScore,
      title: 'คะแนน',
    },
    {
      filterMultiple: true,
      filters: [
        {
          children: [
            {
              text: 'pong.jakrapong@moonshot.co.th',
              value: 'pong.jakrapong@moonshot.co.th',
            },
            {
              text: 'apisilp@gmail.com',
              value: 'apisilp@gmail.com',
            },
            {
              text: 'khajochi@gmail.com',
              value: 'khajochi@gmail.com',
            },
            {
              text: 'supadej@vronline.in.th',
              value: 'supadej@vronline.in.th',
            },
          ],
          text: MAJOR('content'),
          value: 'content',
        },
        {
          children: [
            {
              text: 'paul@dek-d.com',
              value: 'paul@dek-d.com',
            },
            {
              text: 'khonteeneung@gmail.com',
              value: 'khonteeneung@gmail.com',
            },
            {
              text: 'inthanon@grappik.com',
              value: 'inthanon@grappik.com',
            },
          ],
          text: MAJOR('design'),
          value: 'design',
        },
        {
          children: [
            {
              text: 'oweera@gmail.com',
              value: 'oweera@gmail.com',
            },
            {
              text: 'maytapriya@gmail.com',
              value: 'maytapriya@gmail.com',
            },
            {
              text: 'jarern@gmail.com',
              value: 'jarern@gmail.com',
            },
          ],
          text: MAJOR('marketing'),
          value: 'marketing',
        },
        {
          children: [
            {
              text: 'panjmp@gmail.com',
              value: 'panjmp@gmail.com',
            },
            {
              text: 'warat.w@wisesight.com',
              value: 'warat.w@wisesight.com',
            },
            {
              text: 'chaiyapong@3dsinteractive.com',
              value: 'chaiyapong@3dsinteractive.com',
            },
          ],
          text: MAJOR('programming'),
          value: 'programming',
        },
      ],
      key: 'committeeVote',
      onFilter: (value, record: RowType) => {
        const committeeList = record.committeeVote.map((c) => c.committee)
        /// TODO: refine type
        if (committeeList.indexOf(value as string) !== -1) {
          return (
            record.committeeVote[committeeList.indexOf(value as string)]
              .score === 1
          )
        }
        return false
      },
      render: (user: RowType) => (
        <span>
          {user.committeeVote
            .filter((c) => c.score === 1)
            .map((c) => (
              <p style={{ marginBlockEnd: 0 }} key={c.committee}>
                {c.committee}
              </p>
            ))}
        </span>
      ),
      title: 'กรรมการสาขาที่ให้ผ่าน',
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

  const openDrawer = (id: string) => {
    setVisible(true)
    setDrawerId(id)
  }

  const closeDrawer = () => {
    setVisible(false)
    setDrawerId('')
  }

  const onPageChange = (p: TablePaginationConfig) => {
    setPagination(p)
  }

  return (
    <>
      <PageTitle>เลือกผู้สมัครเข้าสัมภาษณ์สาขา{MAJOR(major)}</PageTitle>

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: RowType, index?: number) => candidate.id}
        dataSource={filteredCandidates}
        rowSelection={rowSelection}
        onChange={onPageChange}
        pagination={pagination}
      />
      <CandidateModal
        visible={visible}
        onClose={closeDrawer}
        candidateId={drawerId}
      />

      <Row>
        <Col>
          <Popconfirm
            placement="top"
            title="ยืนยันเลือกเข้าสัมภาษณ์"
            okText="ยืนยัน"
            onConfirm={onConfirmPass}
            cancelText="ยกเลิก"
            icon={<InfoCircleFilled style={{ color: '#1890FF' }} />}
          >
            <Button type="primary" icon={<CheckOutlined />}>
              เลือกเข้าสัมภาษณ์
            </Button>
          </Popconfirm>{' '}
          <Popconfirm
            placement="top"
            title="ยืนยันไม่เลือกเข้าสัมภาษณ์"
            okText="ยืนยัน"
            onConfirm={onConfirmFailed}
            cancelText="ยกเลิก"
            icon={<InfoCircleFilled style={{ color: '#1890FF' }} />}
          >
            <Button danger icon={<CloseOutlined />}>
              ไม่เลือกเข้าสัมภาษณ์
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </>
  )
}

export const candidateInterviewRoute = {
  path: ':major',
  action,
  loader,
  element: <CandidateInterview />,
}
