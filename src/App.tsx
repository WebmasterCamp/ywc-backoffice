import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { Global, css } from '@emotion/react'
import { router } from './router'

function GlobalStyle() {
  return (
    <Global
      styles={css`
        .ant-form-item-children > textarea {
          font-family: 'Sarabun';
          line-height: 1.8;
          font-size: 16px;
        }
        .ant-form-item-control {
          font-family: 'Sarabun';
        }
        .ant-avatar > img {
          height: auto;
        }
      `}
    />
  )
}

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<></>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
