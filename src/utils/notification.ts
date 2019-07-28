import { notification } from 'antd'
import { IconType } from 'antd/lib/notification'

export default (type: IconType, message: string, description: string) => {
  notification[type]({
    description,
    message
  })
}
