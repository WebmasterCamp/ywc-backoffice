import { Drawer } from 'antd'
import React from 'react'

interface DesignAnswerModalProps {
  url: string
  visible: boolean
  onClose: () => void
}

const DesignAnswerModal = ({
  visible,
  onClose,
  url
}: DesignAnswerModalProps) => {
  return (
    <>
      <Drawer
        visible={visible}
        onClose={onClose}
        maskClosable={false}
        title="Portfolio สาขา Design"
        width="60%"
        bodyStyle={{ padding: '0', height: 'calc(100% - 65px)' }}
      >
        <iframe
          allowFullScreen={false}
          src={url}
          width="100%"
          title="Design Portfolio"
          style={{ border: 0, height: '100%' }}
        />
      </Drawer>
    </>
  )
}

export default DesignAnswerModal
