import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom'
import { loader, LoaderData } from './loader'
import { CandidatesTable } from './CandidatesTable'
import { MAJOR } from '../../utils/const'
import { useProfile } from '../../utils/useProfile'
import { PageTitle } from '../../utils/styled-helper'
import { voteCandidateRoute } from './vote'
import { useMemo } from 'react'

const Candidates = () => {
  return <Outlet context={useLoaderData() as LoaderData} />
}

const AllCandidates = () => {
  const { major } = useProfile()
  const { applications } = useOutletContext() as LoaderData

  return (
    <CandidatesTable
      header={<PageTitle>ใบสมัครทั้งหมด (สาขา{MAJOR(major)})</PageTitle>}
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
      header={<PageTitle>ใบสมัครที่ตรวจเสร็จ (สาขา{MAJOR(major)})</PageTitle>}
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
      header={
        <PageTitle>ใบสมัครที่ตรวจไม่เสร็จ (สาขา{MAJOR(major)})</PageTitle>
      }
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
