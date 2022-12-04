import type { History } from 'history'
import { useHistory } from 'react-router-dom'

let history: History = undefined as unknown as History

export function GetHistoryObject() {
  // BrowserRouter doesn't let us pass a custom history object, so we have to
  // use the one that it creates. This is a bit of a hack, but it works.
  history = useHistory()
  return null
}

export function getHistory() {
  return history
}
