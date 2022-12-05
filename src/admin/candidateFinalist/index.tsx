import { Button, message, Popconfirm, Tag } from 'antd'
import Table, { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { useState } from 'react'
import { useLoaderData, useParams, useSubmit } from 'react-router-dom'

import Candidate from '../../interfaces/Candidate'
import { MAJOR } from '../../utils/const'
import { PageTitle } from '../../utils/styled-helper'
import { action } from './action'
import { loader, LoaderData } from './loader'

const CandidateFinalist = () => {
  const major = useParams().major as string

  const { filteredCandidates } = useLoaderData() as LoaderData

  const [pagination, setPagination] = useState({})
  const [, setSelected] = useState<string[]>([])

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: Candidate[]) => {
      setSelected(selectedRows.map((c) => c._id))
    },
  }

  const submit = useSubmit()

  const onFinalistPass = (id: string) => {
    submit(
      {
        action: 'pass',
        id: id,
      },
      {
        method: 'post',
        replace: true,
      }
    )
  }

  const onReservePass = (id: string) => {
    const reserve = prompt('กรุณาใส่ลำดับตัวสำรอง')

    if (!reserve) {
      message.error('กรุณากรอกลำดับตัวสำรอง')
    } else {
      const reserveNo = Number.parseInt(reserve, 10)
      if (isNaN(reserveNo)) {
        message.error('กรุณากรอกเฉพาะตัวเลข')
      } else {
        submit(
          {
            action: 'reserve',
            id: id,
            reserveNo: `${reserveNo}`,
          },
          {
            method: 'post',
            replace: true,
          }
        )
      }
    }
  }

  const onChangeVerificationAmount = (id: string) => {
    const verificationAmount = prompt('กรุณาใส่จำนวนเงิน')

    if (!verificationAmount) {
      message.error('กรุณาใส่จำนวนเงิน')
    } else {
      const parsedVerificationAmount = Number.parseFloat(verificationAmount)
      if (isNaN(parsedVerificationAmount)) {
        message.error('กรุณากรอกเฉพาะตัวเลข')
      } else {
        submit(
          {
            action: 'changeVerificationAmount',
            id: id,
            verificationAmount: `${verificationAmount}`,
          },
          {
            method: 'post',
            replace: true,
          }
        )
      }
    }
  }

  const columns: ColumnProps<Candidate>[] = [
    {
      key: 'name',
      render: (user: Candidate) => (
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
          text: 'ตัวสำรอง',
          value: 'true',
        },
        {
          text: 'ตัวจริง',
          value: 'false',
        },
      ],
      key: 'isReserve',
      onFilter: (value, record: Candidate) => {
        return String(record.isReserve) === value
      },
      render: (user: Candidate) => {
        if (!user.isFinalist) {
          return (
            <span>
              <Tag color="red" key={user.status}>
                ไม่เลือก
              </Tag>
            </span>
          )
        }
        return (
          <span>
            {user.isReserve ? (
              <Tag color="orange" key={user.status}>
                ตัวสำรอง
              </Tag>
            ) : (
              <Tag color="green" key={user.status}>
                ตัวจริง
              </Tag>
            )}
          </span>
        )
      },
      title: 'สถานะการคัดเลือก',
    },
    {
      key: 'reserveNo',
      onFilter: (value, record: Candidate) => {
        return String(record.passInterview) === value
      },
      render: (user: Candidate) => (
        <span key={user.reserveNo}>
          {user.isReserve || user.isReserve === undefined ? (
            user.reserveNo
          ) : (
            <Tag color="green">ตัวจริง</Tag>
          )}
        </span>
      ),
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.reserveNo - b.reserveNo,
      title: 'ลำดับตัวสำรอง',
    },
    {
      key: 'verificationAmount',
      render: (user: Candidate) => <span>{user.verificationAmount}</span>,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.verificationAmount - b.verificationAmount,
      title: 'จำนวนเงิน',
    },
    {
      key: 'committeeScore',
      render: (user: Candidate) => <span>{user.committeeScore}</span>,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.committeeScore - b.committeeScore,
      title: 'คะแนน',
    },
    {
      key: 'action',
      render: (user: Candidate) => (
        <span>
          <Popconfirm
            placement="top"
            title="คุณแน่ใจแล้วใช่ไหม?"
            okText="ยืนยัน"
            onConfirm={() => onFinalistPass(user._id)}
            cancelText="ยกเลิก"
          >
            <Button type="primary">ผ่านเข้าค่าย</Button>
          </Popconfirm>{' '}
          <Popconfirm
            placement="top"
            title="คุณแน่ใจแล้วใช่ไหม?"
            okText="ยืนยัน"
            onConfirm={() => onReservePass(user._id)}
            cancelText="ยกเลิก"
          >
            <Button danger>ตัวสำรอง</Button>
          </Popconfirm>
          <Popconfirm
            placement="top"
            title="คุณแน่ใจแล้วใช่ไหม?"
            okText="ยืนยัน"
            onConfirm={() => onChangeVerificationAmount(user._id)}
            cancelText="ยกเลิก"
          >
            <Button>จำนวนเงิน</Button>
          </Popconfirm>
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
      <PageTitle>เลือกผู้สมัครเข้าค่ายสาขา{MAJOR(major)}</PageTitle>

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: Candidate) => candidate._id}
        dataSource={filteredCandidates}
        rowSelection={rowSelection}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export const candidateFinalistRoute = {
  path: ':major',
  action,
  loader,
  element: <CandidateFinalist />,
}
