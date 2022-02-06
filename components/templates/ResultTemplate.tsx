import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../ui/Message'
import { Room } from '../../types/Room.type'
import Spacer from '../ui/Spacer'
import SupportingTextCell from '../ui/SupportingTextCell'
import Card from '../ui/Card'
import TextCell from '../ui/TextCell'
import ResultTable from '../functional/ResultTable'
import LiveIndicator from '../ui/LiveIndicator'
import SpacerInline from '../ui/SpacerInline'
import { ruleDisplayNames, ruleNames } from '../../types/rules'
import { bordaRule } from '../../rules/bordaRule'
import { RankResults } from '../../types/RankResults.type'
import { majorityRule } from '../../rules/majorityRule'
import { condorcetRule } from '../../rules/condorcetRule'
import { majorityJudgement } from '../../rules/majorityJudgement'
import Accordion from '../ui/Accordion'
import MjDetails from '../functional/MjDetails'
import OtherResultsTable from '../functional/OtherResultsTable'
import { supportingTextColor } from '../../styles/colors'
import TextButton from '../ui/TextButton'

type Props = {
  user: User | undefined | null
  roomData: Room | null
  personalRanks: number[][]
}

const ResultTemplate: React.FC<Props> = (props) => {
  const [resultRanks, setResultRanks] = useState<RankResults[] | undefined>(undefined)
  const [otherResults, setOtherResults] = useState<RankResults[][] | undefined | null>(undefined)

  //Set rank results
  useEffect(() => {
    if (props.roomData.rule === ruleNames.majorityRule) {
      const mResult = majorityRule(props.roomData, props.personalRanks)
      setResultRanks(mResult)
      setOtherResults(null)
    }
    if (props.roomData.rule === ruleNames.bordaRule) {
      const mResult = majorityRule(props.roomData, props.personalRanks)
      const bResult = bordaRule(props.roomData, props.personalRanks)
      const cResult = condorcetRule(props.roomData, props.personalRanks)
      setResultRanks(bResult)
      setOtherResults([mResult, null, cResult, null])
    }
    if (props.roomData.rule === ruleNames.condorcetRule) {
      const mResult = majorityRule(props.roomData, props.personalRanks)
      const bResult = bordaRule(props.roomData, props.personalRanks)
      const cResult = condorcetRule(props.roomData, props.personalRanks)
      setResultRanks(cResult)
      setOtherResults([mResult, bResult, null, null])
    }
    if (props.roomData.rule === ruleNames.majorityJudgement) {
      const mjResult = majorityJudgement(props.roomData, props.personalRanks)
      setResultRanks(mjResult)
      setOtherResults(null)
    }
  }, [props.personalRanks])

  const onReadAboutRulesClick = () => {
    window.open("https://www.eraberule.com/details", "_blank", "noreferrer")
  }


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
      <SupportingTextCell textAlign="right">
        <div css={liveIndicatorContainerStyle}>
          <LiveIndicator />
          <SpacerInline x="5px" />
          ライブ
        </div>
      </SupportingTextCell>

      <Card>
        <SupportingTextCell textAlign="left">
          タイトル
        </SupportingTextCell>
        <TextCell>
          {props.roomData.title}
        </TextCell>
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          結果
        </SupportingTextCell>

        <ResultTable
          resultRanks={resultRanks}
          roomData={props.roomData}
        />

        <SupportingTextCell textAlign="right">
          {props.personalRanks.length}人が投票済み
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell textAlign="left">
          この投票は{ruleDisplayNames[props.roomData.rule]}で集計されました。
        </SupportingTextCell>
      </Card>

      {props.roomData.rule === ruleNames.majorityJudgement &&
        <Accordion title="詳細" >
          <MjDetails roomData={props.roomData} personalRanks={props.personalRanks} />
        </Accordion>
      }

      <OtherResultsTable
        otherResults={otherResults}
        roomData={props.roomData}
      />

      <div css={buttonContainerStyle}>
        <TextButton onClick={onReadAboutRulesClick}>
          各投票ルールの詳細を読む
        </TextButton>
      </div>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
  padding: 0 15px;
`
const liveIndicatorContainerStyle = css`
  display: flex;
  justify-content: right;
  align-items: center;
`
const buttonContainerStyle = css`
  margin: 0 auto;
  margin-bottom: 25px;
  max-width: 600px;
  padding: 0 5px;
  border-radius: 12px;
  text-align: left;

  @media(min-width: 500px) {
    padding: 15px 10px;
  }
`

export default ResultTemplate