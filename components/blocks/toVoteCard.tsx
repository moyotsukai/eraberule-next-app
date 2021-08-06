import React from 'react'
import Card from '../atoms/card'
import TextCell from '../atoms/textCell'
import SupportingTextCell from '../atoms/supportingTextCell'
import Button from '../atoms/button'
import Spacer from '../atoms/spacer'

type Props = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  roomTitle: string
}

const ToVoteCard: React.FC<Props> = (props) => {

  return (
    <Card isAccordion={false}>
      <SupportingTextCell shouldAlignLeft={true}>
        タイトル
      </SupportingTextCell>
      <TextCell>
        {props.roomTitle}
      </TextCell>
      <Spacer y="20px" />
      <Button
        onClick={props.onClick}
        isEnabled={true}
        isLoading={false}
      >
        投票する
      </Button>
    </Card>
  )
}

export default ToVoteCard