import { useState } from 'react'
import CommitteeCandidate from '../interfaces/CommitteeCandidate'

const SEARCHABLE_KEYS = ['_id', 'firstName', 'lastName', 'nickname']

const useSearchApplications = (applications: CommitteeCandidate[] = []) => {
  const [keywords, setKeywords] = useState('')

  const onSearch = (e: any) => {
    setKeywords(e.target.value)
  }

  return {
    applications: applications.filter((application) =>
      keywords
        .split(/\s/g)
        .every((keyword) =>
          SEARCHABLE_KEYS.some((key) =>
            ((application[key as keyof CommitteeCandidate] || '') as string)
              .toLocaleLowerCase()
              .includes(keyword.toLocaleLowerCase())
          )
        )
    ),
    onSearch,
  }
}

export default useSearchApplications
