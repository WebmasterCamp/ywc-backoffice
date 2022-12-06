import { Button, Col, Form, Modal, Row, Select, Table, Tag } from 'antd'
import { LoginOutlined, CheckOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import { TrackingForm } from '../../interfaces/Tracking'
import { MAJOR, STEP, TRACKING_STATUS } from '../../utils/const'
import { PageTitle } from '../../utils/styled-helper'
import CandidateModal from '../../dashboard/candidateModal'
import { loader, LoaderData } from './loader'
import { useFetcher, useLoaderData } from 'react-router-dom'
import { action } from './action'
import { UserStatus } from '../../schemas/models'
const { Option } = Select

type RowType = LoaderData['trackings'][number]

const Tracking = () => {
  const { trackings, admins } = useLoaderData() as LoaderData

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [visible, setVisible] = useState(false)
  const [drawerId, setDrawerId] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [previousState, setPreviousState] = useState<
    'idle' | 'loading' | 'submitting'
  >('idle')
  const { submit, state } = useFetcher()
  useEffect(() => {
    if (state !== 'submitting' && previousState === 'submitting') {
      setSelectedRowKeys([])
      setShowModal(false)
    }
    setPreviousState(state)
  }, [state, previousState])

  const handleSubmit = async (form: TrackingForm) => {
    const { purpose, assignee } = form
    submit(
      {
        purpose,
        assignee,
        userIDs: JSON.stringify(selectedRowKeys),
      },
      {
        method: 'post',
      }
    )
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  }

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
          {user.firstName} {user.lastName} ({user.nickname})
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
      render: (tracking: RowType) => {
        return <span>{MAJOR(tracking.major)}</span>
      },
      title: 'สาขา',
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
          return (
            <Tag color="geekblue" key={candidate.status}>
              ลงทะเบียนสำเร็จ
            </Tag>
          )
        }
        return <span>{STEP(candidate.step)}</span>
      },
      title: 'ขั้นตอน',
    },
    {
      filterMultiple: false,
      filters: TRACKING_STATUS.map((status: any) => ({
        text: status.description,
        value: status.value,
      })),
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
              รอดำเนินการ
            </Tag>
          )}
        </span>
      ),
      title: 'สถานะการดำเนินการ',
    },
    {
      filterMultiple: false,
      filters: [
        {
          text: '0',
          value: 0,
        },
        {
          text: '1',
          value: 1,
        },
        {
          text: '2',
          value: 2,
        },
      ],
      key: 'totalTrackings',
      onFilter: (value, user: RowType) => {
        return user.trackings.length === value
      },
      render: (user: RowType) => <span>{user.trackings.length}</span>,
      title: 'จำนวนการติดตาม',
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
        rowKey={(tracking: RowType, index?: number) => tracking.id}
        dataSource={trackings}
        pagination={{ pageSize: 20 }}
        rowSelection={{
          onChange: (_: any, selectedRows: RowType[]) => {
            setSelectedRowKeys(selectedRows.map((c) => c.id))
          },
          selectedRowKeys,
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
        open={showModal}
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
              { required: true, message: `Please select tracking's purpose` },
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
              {admins.map((admin) => (
                <Option value={admin.id} key={admin.id}>
                  {admin.username}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={state !== 'idle'}
            >
              <LoginOutlined style={{ color: 'white' }} /> สร้างรายการ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export const trackingRoute = {
  path: 'candidates',
  action,
  loader,
  element: <Tracking />,
}
