import {
  NavigateFunction,
  NavigateOptions,
  Outlet,
  ScrollRestoration,
  To,
  useNavigate,
} from 'react-router-dom'

let navigateFn: NavigateFunction = () => {}

const fakeHistory = {
  push: (to: To, options?: NavigateOptions) => navigateFn(to, options),
}

export function Root() {
  // BrowserRouter doesn't let us pass a custom history object, so we have to
  // use the one that it creates. This is a bit of a hack, but it works.
  navigateFn = useNavigate()
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

export function getHistory() {
  return fakeHistory
}
