import React, { useEffect, useState } from 'react'
import { useQuery } from '../../hooks/useQuery'
import ShareTemplate from '../../components/templates/ShareTemplate'

const SharePage: React.FC = () => {
  const title = useQuery("title")
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (title !== "") {
      setUrl(`https://app.eraberule.com/room?q=${title}`)
    }
  }, [title])

  return (
    <ShareTemplate
      title={title}
      url={url}
    />
  )
}

export default SharePage