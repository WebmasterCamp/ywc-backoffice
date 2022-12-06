import { useState } from 'react'

type KeyType = string | number | symbol
type SearchableEntity<Keys extends readonly KeyType[]> = {
  [key in Keys[number]]: string | null
}

export function useSearchEntities<
  Keys extends readonly KeyType[],
  T extends SearchableEntity<Keys>
>(keys: Keys, entities: T[] = []) {
  const [keywords, setKeywords] = useState('')

  const onSearch = (e: any) => {
    setKeywords(e.target.value)
  }

  return {
    filtered: entities.filter((entity) =>
      keywords
        .split(/\s/g)
        .every((keyword) =>
          keys.some((key) =>
            (entity[key as Keys[number]] ?? '')
              .toLocaleLowerCase()
              .includes(keyword.toLocaleLowerCase())
          )
        )
    ),
    onSearch,
  }
}
