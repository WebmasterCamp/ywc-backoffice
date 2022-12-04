import { Component } from 'react';
import { Redirect, withRouter } from 'react-router'

// user on this page must be login
// export const authen = (role: any) => (Comp: any) => {
//   return
//   withRouter(
//     class extends Component<any> {
//       public render = () => {
//         const { auth } = this.props
//         const currentLocation = window.location.hash

//         if (!auth.isAuthen) {
//           this.props.history.push(`/?location=${currentLocation}`)
//           return <h1>AUTHENTICATION ERROR</h1>
//         }

//         if (
//           typeof role === 'object' &&
//           role.indexOf(auth.profile.role) === -1
//         ) {
//           return <Redirect to="/" />
//         }

//         if (typeof role !== 'object' && auth.profile.role !== role) {
//           return <Redirect to="/" />
//         }

//         return <Comp {...this.props} />
//       }
//     }
//   )
// }
