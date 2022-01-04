import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../blocks/message'
import { Room } from '../../types/Room.type'
import Spacer from '../atoms/spacer'
import SupportingTextCell from '../atoms/supportingTextCell'
import Card from '../atoms/card'
import TextCell from '../atoms/textCell'
import RankResultTable from '../blocks/rankResultTable'
import LiveIndicator from '../atoms/LiveIndicator'
import SpacerInline from '../atoms/SpacerInline'
import { ruleDisplayNames } from '../../types/rules'

type Props = {
  user: User | undefined | null
  roomData: Room | null
  personalRanks: number[][]
}

const ResultTemplate: React.FC<Props> = (props) => {
  if (props.user === undefined) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          読み込み中...
        </Message>
      </div>
    )
  }

  if (props.user === null) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          データベースに接続できません。
        </Message>
      </div>
    )
  }

  if (props.personalRanks.length === 0) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={true}>
          読み込み中...
        </Message>
      </div>
    )
  }

  return (
    <div css={layoutStyle}>
      <SupportingTextCell shouldAlignLeft={false}>
        <div css={liveIndicatorContainerStyle}>
          <LiveIndicator />
          <SpacerInline x="5px" />
          ライブ
        </div>
      </SupportingTextCell>

      <Card>
        <SupportingTextCell shouldAlignLeft={true}>
          タイトル
        </SupportingTextCell>
        <TextCell>
          {props.roomData.title}
        </TextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          結果
        </SupportingTextCell>

        <RankResultTable roomData={props.roomData} personalRanks={props.personalRanks} />

        <SupportingTextCell shouldAlignLeft={false}>
          {props.personalRanks.length}人が投票済み
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          この投票は{ruleDisplayNames[props.roomData.rule]}で集計されました。
        </SupportingTextCell>
      </Card>

      <Card>
        <SupportingTextCell shouldAlignLeft={true}>
          詳細
        </SupportingTextCell>
      </Card>

      <Card>
        <SupportingTextCell shouldAlignLeft={true}>
          もし〇〇だったら
        </SupportingTextCell>
      </Card>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
`
const liveIndicatorContainerStyle = css`
  display: flex;
  justify-content: right;
  align-items: center;
`

export default ResultTemplate