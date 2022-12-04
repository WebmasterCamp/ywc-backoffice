import { useState } from 'react'
import Candidate from '../interfaces/Candidate'

const SEARCHABLE_KEYS = [
  '_id',
  'firstName',
  'firstNameEN',
  'lastName',
  'lastNameEN',
  'nickname',
]

const useSearchCandidates = (candidates: Candidate[] = []) => {
  const [keywords, setKeywords] = useState('')

  const onSearch = (e: any) => {
    setKeywords(e.target.value)
  }

  return {
    candidates: candidates.filter((candidate) =>
      keywords
        .split(/\s/g)
        .every((keyword) =>
          SEARCHABLE_KEYS.some((key) =>
            ((candidate[key as keyof Candidate] || '') as string)
              .toLocaleLowerCase()
              .includes(keyword.toLocaleLowerCase())
          )
        )
    ),
    onSearch,
  }
}

export default useSearchCandidates
