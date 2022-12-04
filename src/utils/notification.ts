import { notification as antdNotification } from 'antd'

type IconType = 'success' | 'info' | 'warning' | 'error'

const notification = (type: IconType, message: string, description: string) => {
  antdNotification[type]({
    description,
    message
  })
}
export default notification
