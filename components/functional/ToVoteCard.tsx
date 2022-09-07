import React from 'react'
import Card from '../ui/Card'
import TextCell from '../ui/TextCell'
import SupportingTextCell from '../ui/SupportingTextCell'
import Button from '../ui/Button'
import Spacer from '../ui/Spacer'
import { useLocale } from '../../locales/useLocale'

type Props = {
  roomTitle: string
  hasVoted: boolean | undefined
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
}

const ToVoteCard: React.FC<Props> = (props) => {
  const { t } = useLocale()
  const localizedString = t.functional.toVoteCard

  let text = localizedString.loading
  if (props.hasVoted === true) {
    text = localizedString.seeResult
  } else if (props.hasVoted === false) {
    text = localizedString.vote
  }

  return (
    <Card>
      <SupportingTextCell textAlign="left">
        {localizedString.title}
      </SupportingTextCell>
      <TextCell>
        {props.roomTitle}
      </TextCell>
      <Spacer y="20px" />
      <Button
        onClick={props.onClick}
        isEnabled={props.hasVoted !== undefined}
        isLoading={props.hasVoted === undefined}
      >
        {text}
      </Button>
    </Card>
  )
}

export default ToVoteCard