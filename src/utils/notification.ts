import { notification } from 'antd'

type IconType = 'success' | 'info' | 'warning' | 'error'

export default (type: IconType, message: string, description: string) => {
  notification[type]({
    description,
    message,
  })
}
