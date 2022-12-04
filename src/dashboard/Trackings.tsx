import { Button, Col, Form, Modal, Row, Select, Table, Tag } from 'antd'
import { LoginOutlined, CheckOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/lib/table'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import Candidate from '../interfaces/Candidate'
import { TrackingForm } from '../interfaces/Tracking'
import TrackingStore from '../stores/tracking'
import UserStore from '../stores/user'
import { MAJOR, STEP, TRACKING_STATUS } from '../utils/const'
import { PageTitle } from '../utils/styled-helper'
import CandidateModal from './CandidateModal'
const { Option } = Select

const Tracking = () => {
  const trackingStore = useObservable(TrackingStore)
  const userStore = useObservable(UserStore)

  useEffect(() => {
    trackingStore.getTrackings()
  }, [trackingStore])

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [visible, setVisible] = useState(false)
  const [drawerId, setDrawerId] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (showModal) {
      userStore.getUsersByRole('callcenter')
    }
  }, [userStore, showModal])

  const handleSubmit = async (form: TrackingForm) => {
    await trackingStore.createBulkTrackings({
      ...form,
      userIDs: selectedRowKeys
    })
    setSelectedRowKeys([])
    setShowModal(false)
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  }

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
          {user.firstName} {user.lastName} ({user.nickname})
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
      onFilter: (value, record) => record.major === value,
      render: (tracking: Candidate) => {
        return <span>{MAJOR(tracking.major)}</span>
      },
      title: 'สาขา'
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
      onFilter: (value, record) =>
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
      filterMultiple: false,
      filters: TRACKING_STATUS.map((status: any) => ({
        text: status.description,
        value: status.value
      })),
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
              รอดำเนินการ
            </Tag>
          )}
        </span>
      ),
      title: 'สถานะการดำเนินการ'
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: '0',
          value: 0
        },
        {
          text: '1',
          value: 1
        },
        {
          text: '2',
          value: 2
        }
      ],
      key: 'totalTrackings',
      onFilter: (value, user: Candidate) => {
        return user.trackings.length === value
      },
      render: (user: Candidate) => <span>{user.trackings.length}</span>,
      title: 'จำนวนการติดตาม'
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

  return (
    <>
      <PageTitle>ระบบติดตาม</PageTitle>
      <CandidateModal
        visible={visible}
        onClose={closeDrawer}
        candidateId={drawerId}
      />

      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(tracking: Candidate, index?: number) => tracking._id}
        dataSource={trackingStore.trackings}
        pagination={{ pageSize: 20 }}
        rowSelection={{
          onChange: (_: any, selectedRows: Candidate[]) => {
            setSelectedRowKeys(selectedRows.map(c => c._id))
          },
          selectedRowKeys
        }}
      />

      <Row>
        <Col>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => {
              setShowModal(true)
            }}
            disabled={selectedRowKeys.length === 0}
          >
            สร้างการติดตาม
          </Button>
        </Col>
      </Row>

      <Modal
        title="สร้างการติดตาม"
        visible={showModal}
        footer={null}
        onCancel={() => {
          setShowModal(false)
        }}
      >
        <Form {...formItemLayout} onFinish={handleSubmit}>
          <Form.Item
            label="Purpose"
            name="purpose"
            rules={[
              { required: true, message: `Please select tracking's purpose` }
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear={true}
            >
              <Option value="remind_registration">
                แจ้งเตือนการปิดรับสมัคร
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Assignee"
            name="assignee"
            rules={[{ required: true, message: `Please select assignee` }]}
          >
            <Select placeholder="Select a option" allowClear={true}>
              {userStore.admins.map(admin => (
                <Option value={admin._id} key={admin._id}>
                  {admin.username}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              <LoginOutlined style={{ color: 'white' }} /> สร้างรายการ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default observer(Tracking)
