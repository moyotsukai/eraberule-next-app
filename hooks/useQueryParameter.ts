import { useState, useLayoutEffect } from 'react'
import queryString from 'query-string'

export const useQyeryParameter = (param: string) => {
  const [query, setQuery] = useState<string | undefined>(undefined)

  useLayoutEffect(() => {
    const parsed = queryString.parse(location.search)
    setQuery(parsed[param] as string)
  }, [])

  return query
}