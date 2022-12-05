import { RouteObject } from 'react-router-dom'

export function subRoute(path: string, route: RouteObject): RouteObject {
  return { path, children: [route] }
}
