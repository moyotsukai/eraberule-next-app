import React from 'react'
import Card from '../atoms/card'
import TextCell from '../atoms/textCell'
import SupportingTextCell from '../atoms/supportingTextCell'
import Button from '../atoms/button'
import Spacer from '../atoms/spacer'

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
      <SupportingTextCell shouldAlignLeft={true}>
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