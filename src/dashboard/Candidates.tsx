import { Table } from 'antd'
// import moment from 'moment'
import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'

import { ColumnProps, PaginationConfig } from 'antd/lib/table'
import { observer, useObservable } from 'mobx-react-lite'
import Candidate from '../interfaces/Candidate'
import CandidateStore from '../stores/candidates'
import { MAJOR } from '../utils/const'
import { Heading } from '../utils/styled-helper'

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

  useEffect(() => {
    candidatesStore.getCandidates()
  }, [candidatesStore])

  const [pagination, setPagination] = useState({})

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
      <Heading>ผู้เข้าสมัครทั้งหมด</Heading>
      {/* <Padding>
        <pre>{scoreCounter}</pre>
      </Padding> */}

      {/* <CandidateModal
        edit={false}
        showCandidateModal={showCandidateModal}
        closeModal={closeModal}
        candidate={candidateData}
      /> */}

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(candidate: Candidate, index: number) => candidate._id}
        dataSource={candidatesStore.candidates}
        onChange={onPageChange}
        pagination={pagination}
      />
    </>
  )
}

export default observer(Candidates)
