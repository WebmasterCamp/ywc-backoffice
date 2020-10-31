import { Button, Col, Form, Icon, Modal, Row, Select, Table, Tag } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { ColumnProps } from 'antd/lib/table'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import Candidate from '../interfaces/Candidate'
import ITracking, { TrackingForm } from '../interfaces/Tracking'
import TrackingStore from '../stores/tracking'
import UserStore from '../stores/user'
import { MAJOR, STEP } from '../utils/const'
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
      userStore.getUsersByRole('committee')
    }
  }, [showModal])

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

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 }
  }

  // FORM
  const TrackingFormImpl = (props: FormComponentProps) => {
    const { getFieldDecorator, validateFields } = props.form

    const onSubmit = (event: React.FormEvent) => {
      event.preventDefault()
      validateFields((err, values) => {
        if (!err) {
          handleSubmit(values)
        }
      })
    }
    return (
      <Form {...formItemLayout} onSubmit={onSubmit}>
        <Form.Item label="Purpose">
          {getFieldDecorator('purpose', {
            rules: [
              { required: true, message: `Please select tracking's purpose` }
            ]
          })(
            <Select
              placeholder="Select a option and change input text above"
              allowClear={true}
            >
              <Option value="remind_registration">
                แจ้งเตือนการปิดรับสมัคร
              </Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Assignee">
          {getFieldDecorator('assignee', {
            rules: [{ required: true, message: `Please select assignee` }]
          })(
            <Select placeholder="Select a option" allowClear={true}>
              {userStore.admins.map(admin => (
                <Option value={admin._id} key={admin._id}>
                  {admin.username}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            <Icon type="login" style={{ color: 'white' }} /> สร้างรายการ
          </Button>
        </Form.Item>
      </Form>
    )
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
      onFilter: (value: string, record: Candidate) => record.major === value,
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
              รอดำเนินการ
            </Tag>
          )}
        </span>
      ),
      title: 'สถานะการดำเนินการ'
    },
    {
      key: 'totalTrackings',
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

  const TrackingFormComp = Form.create()(TrackingFormImpl)
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
        rowKey={(tracking: Candidate, index: number) => tracking._id}
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
            icon="check"
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
        <TrackingFormComp />
      </Modal>
    </>
  )
}

export default observer(Tracking)
