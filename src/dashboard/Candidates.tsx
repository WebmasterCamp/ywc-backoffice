import { Button, Icon, Input, Table, Tag } from 'antd'
// import moment from 'moment'
import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'

import { ColumnProps, PaginationConfig } from 'antd/lib/table'
import { observer, useObservable } from 'mobx-react-lite'
import Candidate from '../interfaces/Candidate'
import CandidateStore from '../stores/candidates'
import { MAJOR, STEP } from '../utils/const'
import { PageTitle } from '../utils/styled-helper'
import useSearchCandidates from '../utils/useSearchCandidates'
import CandidateModal from './CandidateModal'

// const CustomSearch = styled.div`
//   background: white;
//   padding: 10px;
//   border-radius: 5px;
//   border: 1px solid #ddd;
// `

// const Padding = styled.div`
//   padding: 20px;
// `

const Candidates = () => {
  const candidatesStore = useObservable(CandidateStore)
  const { candidates, onSearch } = useSearchCandidates(
    candidatesStore.candidates
  )

  useEffect(() => {
    candidatesStore.getCandidates()
  }, [candidatesStore])

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
          {user.firstNameEN} {user.lastNameEN} ({user.nickname})
        </span>
      ),
      title: 'ชื่อ นามสกุล (ชื่อเล่น)'
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'โปรแกรมมิ่ง',
          value: 'programming'
        },
        {
          text: 'คอนเทนท์',
          value: 'content'
        },
        {
          text: 'มาร์เก็ตติ้ง',
          value: 'marketing'
        },
        {
          text: 'ดีไซน์',
          value: 'design'
        }
      ],
      key: 'major',
      onFilter: (value: string, record: Candidate) => record.major === value,
      render: (candidate: Candidate) => {
        return <span>{MAJOR(candidate.major)}</span>
      },
      title: 'สาขา'
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'กำลังดำเนินการ',
          value: 'in progress'
        },
        {
          text: 'เรียบร้อย',
          value: 'completed'
        }
      ],
      key: 'status',
      onFilter: (value, record: Candidate) => {
        return record.status === value
      },
      render: (user: Candidate) => (
        <span>
          {user.status === 'completed' ? (
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
      title: 'สถานะการส่งใบสมัคร'
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: 'ข้อมูลส่วนตัว',
          value: 'info'
        },
        {
          text: 'ข้อมูลการติดต่อ',
          value: 'contact'
        },
        {
          text: 'คำถามกลาง',
          value: 'general'
        },
        {
          text: 'คำถามสาขา',
          value: 'major'
        },
        {
          text: 'สรุปข้อมูล',
          value: 'summary'
        }
      ],
      key: 'step',
      onFilter: (value: string, record: Candidate) =>
        record.step === value && record.status !== 'completed',
      render: (candidate: Candidate) => {
        if (candidate.status === 'completed') {
          return (
            <Tag color="geekblue" key={candidate.status}>
              ลงทะเบียนสำเร็จ
            </Tag>
          )
        }
        return <span>{STEP(candidate.step)}</span>
      },
      title: 'ขั้นตอน'
    },
    {
      key: 'staffPass',
      render: (user: Candidate) => (
        <span>
          {user.isPassStaff || user.failed ? (
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
      title: 'สตาฟค่ายตรวจ'
    },
    {
      key: 'committeePass',
      render: (user: Candidate) => (
        <span>
          {user.committeeVote ? (
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
      title: 'ส่งให้กรรมการสาขา'
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
      <PageTitle>
        ผู้เข้าสมัครทั้งหมด
        <Input
          placeholder="ค้นหาผู้เข้าสมัคร"
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
        rowKey={(candidate: Candidate, index: number) => candidate._id}
        dataSource={candidates}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export default observer(Candidates)
