import { Button, Col, Popconfirm, Row, Tag } from 'antd'
import {
  InfoCircleFilled,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons'
import Table, { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import CandidateModal from '../dashboard/CandidateModal'
import Candidate from '../interfaces/Candidate'
import CandidateStore from '../stores/candidates'
import { MAJOR } from '../utils/const'
import { PageTitle } from '../utils/styled-helper'

interface CandidateInterviewProps {
  match: {
    params: {
      major: string
    }
  }
}

const CandidateInterview = (props: CandidateInterviewProps) => {
  const {
    match: {
      params: { major }
    }
  } = props

  const candidatesStore = CandidateStore

  useEffect(() => {
    candidatesStore.getCandidatesByMajor(major)
  }, [candidatesStore, major])

  const [pagination, setPagination] = useState({})
  const [selected, setSelected] = useState<string[]>([])
  const [visible, setVisible] = useState(false)
  const [drawerId, setDrawerId] = useState('')

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: Candidate[]) => {
      setSelected(selectedRows.map(c => c._id))
    }
  }

  const onConfirmPass = () => {
    candidatesStore.doPassInterview(selected, major)
  }

  const onConfirmFailed = () => {
    candidatesStore.doEjectInterview(selected, major)
  }

  const columns: ColumnProps<Candidate>[] = [
    {
      key: '_id',
      render: (user: Candidate) => <span>{user._id}</span>,
      title: 'ID'
    },
    {
      key: 'name',
      render: (user: Candidate) => (
        <span>
          {user.firstName} {user.lastName} ({user.nickname})
        </span>
      ),
      title: 'ชื่อ นามสกุล (ชื่อเล่น)'
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'เลือก',
          value: 'true'
        },
        {
          text: 'ไม่เลือก',
          value: 'false'
        }
      ],
      key: 'passInterview',
      onFilter: (value, record: Candidate) => {
        return String(record.passInterview) === value
      },
      render: (user: Candidate) => (
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
      title: 'เลือกเข้าสัมภาษณ์'
    },
    {
      defaultSortOrder: 'descend',
      filterMultiple: true,
      filters: [
        {
          text: '0',
          value: '0'
        },
        {
          text: '1',
          value: '1'
        },
        {
          text: '2',
          value: '2'
        },
        {
          text: '3',
          value: '3'
        },
        {
          text: '4',
          value: '4'
        }
      ],
      key: 'committeeScore',
      onFilter: (value, record: Candidate) =>
        record.committeeScore === Number(value),
      render: (user: Candidate) => <span>{user.committeeScore}</span>,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.committeeScore - b.committeeScore,
      title: 'คะแนน'
    },
    {
      filterMultiple: true,
      filters: [
        {
          children: [
            {
              text: 'pong.jakrapong@moonshot.co.th',
              value: 'pong.jakrapong@moonshot.co.th'
            },
            {
              text: 'apisilp@gmail.com',
              value: 'apisilp@gmail.com'
            },
            {
              text: 'khajochi@gmail.com',
              value: 'khajochi@gmail.com'
            },
            {
              text: 'supadej@vronline.in.th',
              value: 'supadej@vronline.in.th'
            }
          ],
          text: MAJOR('content'),
          value: 'content'
        },
        {
          children: [
            {
              text: 'paul@dek-d.com',
              value: 'paul@dek-d.com'
            },
            {
              text: 'khonteeneung@gmail.com',
              value: 'khonteeneung@gmail.com'
            },
            {
              text: 'inthanon@grappik.com',
              value: 'inthanon@grappik.com'
            }
          ],
          text: MAJOR('design'),
          value: 'design'
        },
        {
          children: [
            {
              text: 'oweera@gmail.com',
              value: 'oweera@gmail.com'
            },
            {
              text: 'maytapriya@gmail.com',
              value: 'maytapriya@gmail.com'
            },
            {
              text: 'jarern@gmail.com',
              value: 'jarern@gmail.com'
            }
          ],
          text: MAJOR('marketing'),
          value: 'marketing'
        },
        {
          children: [
            {
              text: 'panjmp@gmail.com',
              value: 'panjmp@gmail.com'
            },
            {
              text: 'warat.w@wisesight.com',
              value: 'warat.w@wisesight.com'
            },
            {
              text: 'chaiyapong@3dsinteractive.com',
              value: 'chaiyapong@3dsinteractive.com'
            }
          ],
          text: MAJOR('programming'),
          value: 'programming'
        }
      ],
      key: 'committeeVote',
      onFilter: (value, record: Candidate) => {
        const committeeList = record.committeeVote.map(c => c.committee)
        /// TODO: refine type
        if (committeeList.indexOf(value as string) !== -1) {
          return (
            record.committeeVote[committeeList.indexOf(value as string)]
              .score === 1
          )
        }
        return false
      },
      render: (user: Candidate) => (
        <span>
          {user.committeeVote
            .filter(c => c.score === 1)
            .map(c => (
              <p style={{ marginBlockEnd: 0 }} key={c._id}>
                {c.committee}
              </p>
            ))}
        </span>
      ),
      title: 'กรรมการสาขาที่ให้ผ่าน'
    },
    {
      key: 'action',
      render: (user: Candidate) => (
        <span>
          <Button onClick={() => openDrawer(user._id)}>ดูใบสมัคร</Button>
        </span>
      ),
      title: 'ดำเนินการ'
    }
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
        rowKey={(candidate: Candidate, index?: number) => candidate._id}
        dataSource={candidatesStore.filteredCandidates}
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

export default observer(CandidateInterview)
