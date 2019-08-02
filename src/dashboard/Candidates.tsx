import { Button, Icon, Input, Tag } from 'antd'
import moment from 'moment'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { MAJOR } from '../utils/const'
import { fetchWithToken } from '../utils/fetch'
import CandidateModal from './CandidateModal'

const CustomSearch = styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`

const Padding = styled.div`
  padding: 20px;
`

interface CandidatesProps {
  edit: boolean
}

export default class Candidates extends Component {
  public candidates = []
  public candidateData = {}
  public showCandidateModal = false
  public pagination = {
    current: ''
  }

  public state = {
    searchText: ''
  }

  // TODO: render isAnswerGeneral, isAnswerMajar status
  public columns = [
    {
      fixed: 'left',
      key: 'name',
      render: (user: any) => (
        <span>
          {user.firstNameEN} {user.lastNameEN} ({user.nickname})
        </span>
      ),
      title: 'Name',

      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }: {
        setSelectedKeys: any
        selectedKeys: any[]
        confirm: any
        clearFilters: any
      }) => (
        <CustomSearch>
          <Input
            style={{ marginBottom: '7px' }}
            // ref={ele => (this.searchInput = ele)}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button
            type="primary"
            style={{ marginRight: '7px' }}
            onClick={this.handleSearch(selectedKeys, confirm)}
          >
            Search
          </Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </CustomSearch>
      ),

      filterIcon: (filtered: any) => (
        <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
      ),

      onFilter: (value: any, record: any) => {
        const name = `${record.firstNameEN} ${record.lastNameEN} ${record.firstName} ${record.lastName} ${record.nickname}`
        return name.toLowerCase().includes(value.toLowerCase())
      }

      // onFilterDropdownVisibleChange: visible => {
      //   if (visible) {
      //     setTimeout(() => {
      //       this.searchInput.focus(),
      //     })
      //   }
      // }
    },
    {
      dataIndex: '_id',
      key: '_id',
      title: 'User Identity'
    },
    {
      key: 'thainame',
      render: (user: any) => (
        <span>
          {user.firstName} {user.lastName}
        </span>
      ),
      title: 'Thai Name'
    },
    {
      dataIndex: 'status',
      filters: [
        {
          text: 'Completed',
          value: 'completed'
        },
        {
          text: 'In Progress',
          value: 'in progress'
        }
      ],
      key: 'status',
      onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,
      render: (status: any) => (
        <span>
          <Tag color={status === 'completed' ? 'green' : 'volcano'}>
            {status}
          </Tag>
        </span>
      ),
      title: 'Status'
    },
    {
      dataIndex: 'major',
      filters: MAJOR.map(x => ({ text: x.name, value: x.value })),
      key: 'major',
      onFilter: (value: any, record: any) => record.major === value,
      render: (major: any) => {
        if (major === undefined) {
          return 'Unknown'
        } else {
          return (
            <span>
              <Tag color={MAJOR.filter(x => x.value === major)[0].color}>
                {major}
              </Tag>
            </span>
          )
        }
      },
      title: 'Major'
    },
    {
      dataIndex: 'email',
      key: 'email',
      title: 'Email'
    },
    {
      dataIndex: 'phone',
      key: 'phone',
      title: 'Phone Number'
    },
    {
      dataIndex: 'sex',
      key: 'sex',
      title: 'Sex'
    },
    {
      dataIndex: 'birthdate',
      key: 'birthdate',
      render: (date: any) => (
        <span>
          {moment(new Date(date)).format('MM/DD/YYYY')} (Age:{' '}
          {moment().diff(new Date(date), 'years')})
        </span>
      ),
      title: 'Birthdate'
    },
    {
      dataIndex: 'isPassStaff',
      filters: [
        {
          text: 'Checked',
          value: 'true'
        },
        {
          text: "Don't Check",
          value: 'undefined'
        }
      ],
      key: 'isPassStaff',
      onFilter: (value: any, record: any) => value === `${record.isPassStaff}`,
      render: (status: any) => (
        <span>
          <Tag color={status === true ? 'green' : 'geekblue'}>
            {status === true ? 'Checked' : "Don't Check"}
          </Tag>
        </span>
      ),
      title: 'YWC Staff Check Status'
    },
    {
      dataIndex: 'failed',
      filters: [
        {
          text: 'Failed',
          value: 'true'
        },
        {
          text: 'In System',
          value: 'undefined'
        }
      ],
      key: 'failed',
      onFilter: (value: any, record: any) => value === `${record.failed}`,
      render: (failed: any) => (
        <span>
          <Tag color={failed === true ? 'red' : 'purple'}>
            {failed === true ? 'Failed' : 'In System'}
          </Tag>
        </span>
      ),
      title: 'Grading Status'
    },
    {
      dataIndex: 'committeeScore',
      key: 'committeeScore',
      render: (score: any) => <span>{score || 0}</span>,
      sorter: (a: any, b: any) =>
        (a.committeeScore || 0) - (b.committeeScore || 0),
      title: 'Committee Score'
    },
    {
      fixed: 'right',
      key: 'action',
      render: (data: any) => (
        <Button onClick={() => this.viewCandidateDetail(data._id)}>
          <Icon type="edit" theme="outlined" /> ดูรายละเอียเพิ่มเติม
        </Button>
      ),
      title: 'Action',
      width: 200
    }
  ]

  public handleSearch = (selectedKeys: any, confirm: any) => () => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  public handleReset = (clearFilters: any) => () => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  // fetch and render data
  public componentDidMount = async () => {
    this.getCandidates()
  }

  public getCandidates = async () => {
    // const { major } = this.props.auth.profile
    const response = await fetchWithToken('users/all', { major: '' }, 'GET')

    if (response.status === 'success') {
      this.candidates = response.payload
    }

    // set pagination to current page on candidates table
    this.pagination = { current: '' }
  }

  public viewCandidateDetail = async (id: any) => {
    const response = await fetchWithToken(`users/profile/${id}`, {}, 'GET')

    if (response.status === 'success') {
      this.candidateData = response.payload
      this.showCandidateModal = true
    }
  }

  public closeModal = () => {
    this.showCandidateModal = false
  }

  // public onPageChange = pagination => {
  //   PaginationStore.currentPage = pagination.current
  //   this.pagination = { current: pagination.current }
  // }

  public scoreCounter = () => {
    // const counter = this.candidates
    //   .filter(
    //     candidate => candidate.status === 'completed' && !candidate.failed
    //   )
    //   .reduce((prev, curr) => {
    //     const major = curr.major
    //     const score = curr.committeeScore || 'Undefined'

    //     if (prev[major] === undefined) {
    //       prev[major] = {}
    //     }

    //     if (prev[major][score] === undefined) {
    //       prev[major][score] = 1
    //     } else {
    //       prev[major][score]++
    //     }

    //     return prev
    //   }, {})

    const output = ''

    // for (const major in counter) {
    //   let result = `${major}: `
    //   for (const score in counter[major]) {
    //     result += ` | คะแนน ${score} มีจำนวน ${counter[major][score]} คน | `
    //   }
    //   output += result + '\n'
    // }

    return output
  }

  public render() {
    const scoreCounter = this.scoreCounter()

    return (
      <Fragment>
        <Padding>
          <pre>{scoreCounter}</pre>
        </Padding>

        <CandidateModal
          edit={false}
          showCandidateModal={this.showCandidateModal}
          closeModal={this.closeModal}
          candidate={this.candidateData}
        />

        {/* <Table
          columns={this.columns}
          scroll={{ x: 2500 }}
          dataSource={this.candidates}
          onChange={this.onPageChange}
          pagination={this.pagination}
        /> */}
      </Fragment>
    )
  }
}
