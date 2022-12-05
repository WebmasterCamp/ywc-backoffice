import { Button, Form, Input, Modal, Select, Table, Tag } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import ITracking from '../../interfaces/Tracking'
import {
  MAJOR,
  STEP,
  TRACKING_GROUP,
  TRACKING_PURPOSE,
  TRACKING_RESULT,
  TRACKING_STATUS,
} from '../../utils/const'
import { PageTitle } from '../../utils/styled-helper'
import {
  loader,
  LoaderData,
  trackingByIdAction,
  trackingByIdLoader,
  TrackingByIdLoaderData,
} from './loader'
import { useFetcher, useLoaderData, useResolvedPath } from 'react-router-dom'
const { Option } = Select

const Tracking = () => {
  const [selectedTrackingId, setSelectedTrackingId] = useState<string | null>(
    null
  )

  const { trackings } = useLoaderData() as LoaderData
  const { state, data, load, submit } = useFetcher<TrackingByIdLoaderData>()
  const selectedTracking =
    !selectedTrackingId || selectedTrackingId === data?._id ? data : undefined

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }

  const currentPath = useResolvedPath(``)
  const handleSubmit = async (form: ITracking) => {
    const { group, phone, purpose, remark, result, status } = form
    submit(
      { group, phone, purpose, remark, result, status },
      {
        method: 'post',
        action: `${currentPath.pathname}/${selectedTracking!._id}`,
      }
    )
  }

  const [previousState, setPreviousState] = useState<
    'idle' | 'loading' | 'submitting'
  >('idle')
  useEffect(() => {
    if (state !== 'submitting' && previousState === 'submitting') {
      setSelectedTrackingId(null)
    }
    setPreviousState(state)
  }, [state, previousState])

  const [form] = Form.useForm()
  const { setFieldsValue } = form
  useEffect(() => {
    if (!selectedTracking) return
    if (!selectedTrackingId) return
    const { purpose, status, result, group, remark, phone } = selectedTracking
    setFieldsValue({
      group: group || undefined,
      phone: phone || '',
      purpose,
      remark: remark || '',
      result: result || undefined,
      status,
    })
    // eslint-disable-next-line
  }, [selectedTracking])

  const onSelectTracking = (tracking: ITracking) => {
    setSelectedTrackingId(tracking._id)
    load(`${currentPath.pathname}/${tracking._id}`)
  }
  const columns: ColumnProps<ITracking>[] = [
    {
      key: '_id',
      render: (t: ITracking) => <span>{t._id}</span>,
      title: 'ID',
    },
    {
      key: 'name',
      render: (tracking: ITracking) => {
        return (
          <span>
            {tracking.user.firstName} {tracking.user.lastName} (
            {tracking.user.nickname})
          </span>
        )
      },
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
      onFilter: (value, record) => record.user.major === value,
      render: (tracking: ITracking) => {
        return <span>{MAJOR(tracking.user.major)}</span>
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
        record.step === value && record.status !== 'completed',
      render: (tracking: ITracking) => {
        if (tracking.user.status === 'completed') {
          return (
            <Tag color="geekblue" key={tracking.user.status}>
              ลงทะเบียนสำเร็จ
            </Tag>
          )
        }
        return <span>{STEP(tracking.user.step)}</span>
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
      onFilter: (value, record: ITracking) => {
        return record.status === value
      },
      render: (user: ITracking) => (
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
      title: 'สถานะการดำเนินการ',
    },
    {
      key: 'result',
      render: (tracking: ITracking) => (
        <span>
          {TRACKING_RESULT.find((it) => it.value === tracking.result)
            ?.description ?? tracking.result}
        </span>
      ),
      title: 'Result',
    },
    {
      key: 'action',
      render: (tracking: ITracking) => (
        <span>
          <Button onClick={() => onSelectTracking(tracking)}>ดำเนินการ</Button>
        </span>
      ),
      title: 'ดำเนินการ',
    },
  ]

  return (
    <>
      <PageTitle>การติดตามทั้งหมด</PageTitle>
      <Table
        className="candidates-table"
        columns={columns}
        rowKey={(tracking, _index) => tracking._id}
        dataSource={trackings}
        pagination={{ pageSize: 20 }}
      />
      <Modal
        title="รายละเอียดการติดตาม"
        open={!!selectedTrackingId}
        footer={null}
        onCancel={() => setSelectedTrackingId(null)}
      >
        <Form
          {...formItemLayout}
          form={form}
          disabled={!selectedTracking || state !== 'idle'}
          onFinish={handleSubmit}
        >
          <span>
            {'ชื่อ - นามสกุล : '}
            {selectedTracking?.user?.firstName}{' '}
            {selectedTracking?.user?.lastName} (
            {selectedTracking?.user?.nickname})
          </span>
          <br />
          <span>
            {'สาขา : '}
            {selectedTracking?.user?.major}
          </span>
          <br />
          <span>
            {'Step ปัจจุบัน : '}
            {selectedTracking?.user?.step}
          </span>
          <br />
          <span>
            {'เบอร์ติดต่อ : '}
            <a href={`tel:${selectedTracking?.user?.phone}`}>
              {selectedTracking?.user?.phone}
            </a>{' '}
          </span>
          <br />
          <Form.Item
            label="Purpose"
            name="purpose"
            rules={[
              { required: true, message: `Please select tracking's purpose` },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear={false}
              disabled={true}
            >
              {TRACKING_PURPOSE.map((purpose) => (
                <Option value={purpose.value} key={purpose.value}>
                  {purpose.description}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              { required: true, message: `Please select tracking's status` },
            ]}
          >
            <Select placeholder="กรุณาเลือกสถานะการติดต่อ" allowClear={true}>
              {TRACKING_STATUS.map((status) => (
                <Option value={status.value} key={status.value}>
                  {status.description}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Result"
            name="result"
            rules={[
              { required: true, message: `Please select tracking's result` },
            ]}
          >
            <Select placeholder="กรุณาเลือกผลการติดต่อ" allowClear={true}>
              {TRACKING_RESULT.map((result) => (
                <Option value={result.value} key={result.value}>
                  {result.description}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="User Group"
            name="group"
            rules={[
              { required: true, message: `Please select tracking's group` },
            ]}
          >
            <Select
              placeholder="กรุณาเลือกความสนใจของผู้สมัคร"
              allowClear={true}
            >
              {TRACKING_GROUP.map((result) => (
                <Option value={result.value} key={result.value}>
                  {result.description}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Remark" name="remark">
            <Input />
          </Form.Item>
          <Form.Item label="เบอร์ที่ใช้ติดต่อ" name="phone">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <LoginOutlined style={{ color: 'white' }} /> อัปเดตการติดตาม
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export const trackingRoute = {
  path: 'tracking',
  loader,
  element: <Tracking />,
  children: [
    {
      path: ':trackingId',
      action: trackingByIdAction,
      loader: trackingByIdLoader,
    },
  ],
}
