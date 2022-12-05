import { useMemo } from 'react'
import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom'
import { MAJOR } from '../../utils/const'
import { useProfile } from '../../utils/useProfile'
import { CandidatesTable } from './CandidatesTable'
import { loader, LoaderData } from './loader'
import { voteCandidateRoute } from './vote'

const Candidates = () => {
  return <Outlet context={useLoaderData() as LoaderData} />
}

const AllCandidates = () => {
  const { major } = useProfile()
  const { applications } = useOutletContext() as LoaderData

  return (
    <CandidatesTable
      header={`ใบสมัครทั้งหมด (สาขา${MAJOR(major)})`}
      applications={applications}
    />
  )
}

const CompletedCandidates = () => {
  const { major } = useProfile()
  const { applications } = useOutletContext() as LoaderData
  const completed = useMemo(
    () => applications.filter((a) => a.completed),
    [applications]
  )

  return (
    <CandidatesTable
      header={`ใบสมัครที่ตรวจเสร็จ (สาขา${MAJOR(major)})`}
      applications={completed}
    />
  )
}

const IncompleteCandidates = () => {
  const { major } = useProfile()
  const { applications } = useOutletContext() as LoaderData
  const incomplete = useMemo(
    () => applications.filter((a) => !a.completed),
    [applications]
  )

  return (
    <CandidatesTable
      header={`ใบสมัครที่ตรวจไม่เสร็จ (สาขา${MAJOR(major)})`}
      applications={incomplete}
    />
  )
}

export const candidatesRoute = {
  path: '',
  loader,
  element: <Candidates />,
  children: [
    {
      path: 'all',
      element: <AllCandidates />,
    },
    {
      path: 'completed',
      element: <CompletedCandidates />,
    },
    {
      path: 'incomplete',
      element: <IncompleteCandidates />,
    },
    voteCandidateRoute,
  ],
}
