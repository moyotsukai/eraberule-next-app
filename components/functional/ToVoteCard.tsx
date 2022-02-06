import React from 'react'
import Card from '../ui/Card'
import TextCell from '../ui/TextCell'
import SupportingTextCell from '../ui/SupportingTextCell'
import Button from '../ui/Button'
import Spacer from '../ui/Spacer'

type Props = {
  roomTitle: string
  hasVoted: boolean | undefined
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
}

const ToVoteCard: React.FC<Props> = (props) => {
  let text = "読み込み中"
  if (props.hasVoted === true) {
    text = "結果を見る"
  } else if (props.hasVoted === false) {
    text = "投票する"
  }

  return (
    <Card>
      <SupportingTextCell textAlign="left">
        タイトル
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