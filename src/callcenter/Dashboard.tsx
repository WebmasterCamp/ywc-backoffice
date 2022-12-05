import { observer } from 'mobx-react-lite'

import ProfileBox from '../common/ProfileBox'

const Dashboard = () => {
  return (
    <>
      <ProfileBox />
    </>
  )
}

export default observer(Dashboard)
