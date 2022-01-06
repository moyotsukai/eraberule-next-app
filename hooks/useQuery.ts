import { useState, useLayoutEffect } from 'react'
import queryString from 'query-string'

export const useQuery = (param: string) => {
  const [query, setQuery] = useState<string>("")

  useLayoutEffect(() => {
    const parsed = queryString.parse(location.search)
    setQuery(parsed[param] as string)
  }, [])

  return query
}