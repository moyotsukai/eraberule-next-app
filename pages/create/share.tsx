import React, { useEffect, useState } from 'react'
import { useQuery } from '../../hooks/useQuery'
import ShareTemplate from '../../components/templates/ShareTemplate'

const SharePage: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null)

  //Set title
  const title = useQuery("title")

  //Set url
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