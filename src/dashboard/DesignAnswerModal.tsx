import { Drawer } from 'antd'

interface DesignAnswerModalProps {
  url: string
  visible: boolean
  onClose: () => void
}

const DesignAnswerModal = ({
  visible,
  onClose,
  url,
}: DesignAnswerModalProps) => {
  return (
    <>
      <Drawer
        open={visible}
        onClose={onClose}
        maskClosable={false}
        title="ไฟล์ที่แนบมากับใบสมัคร"
        width="60%"
        bodyStyle={{ padding: '0', height: 'calc(100% - 65px)' }}
      >
        <iframe
          allowFullScreen={false}
          src={url}
          width="100%"
          title="Attachment"
          style={{ border: 0, height: '100%' }}
        />
      </Drawer>
    </>
  )
}

export default DesignAnswerModal
