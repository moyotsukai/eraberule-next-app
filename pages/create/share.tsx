import React, { useEffect, useState } from 'react'
import { useQyeryParameter } from '../../hooks/useQueryParameter'
import ShareTemplate from '../../components/templates/ShareTemplate'
import { spaceToPlus } from '../../utils/spaceToPlus'

const SharePage: React.FC = () => {
  const [roomLink, setRoomLink] = useState<string | null>(null)

  //Set title
  const title = useQyeryParameter("title")

  //Set url
  useEffect(() => {
    if (title) {
      const replacedTitle = spaceToPlus(title)
      setRoomLink(`https://app.eraberule.com/room?q=${replacedTitle}`)
    }
  }, [title])

  return (
    <ShareTemplate
      title={title}
      roomLink={roomLink}
    />
  )
}

export default SharePage