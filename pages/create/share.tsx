import React, { useEffect, useState } from 'react'
import { useQyeryParameter } from '../../hooks/useQueryParameter'
import ShareTemplate from '../../components/templates/ShareTemplate'
import { spaceToPlus } from '../../utils/spaceToPlus'

const SharePage: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null)

  //Set title
  const title = useQyeryParameter("title")

  //Set url
  useEffect(() => {
    if (title) {
      const replacedTitle = spaceToPlus(title)
      setUrl(`https://app.eraberule.com/room?q=${replacedTitle}`)
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