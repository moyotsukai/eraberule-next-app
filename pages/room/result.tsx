import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import Card from '../../components/atoms/card'
import SupportingTextCell from '../../components/atoms/supportingTextCell'
import TextCell from '../../components/atoms/textCell'
import Spacer from '../../components/atoms/spacer'
import { useRecoilValue } from 'recoil'
import { roomDataState, attendedRoomIdsState } from '../../recoil/atom'
import { ruleDisplayNames, ruleNames } from '../../structs/rules'
import RankResultTable from '../../components/blocks/rankResultTable'
import { useRouter } from 'next/router'

const ResultPage: React.FC = () => {
  const roomData = useRecoilValue(roomDataState)
  const router = useRouter()

  useEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
    }
  }, [])

  const Table = () => {
    switch (roomData.rule) {
      case ruleNames.majorityRule:
        return <RankResultTable />
      case ruleNames.bordaRule:
      case ruleNames.condorcetRule:
        return <RankResultTable />
      case ruleNames.majorityJusgement:
        return <RankResultTable />
    }
  }

  //UI
  return (
    <div css={layoutStyle}>
      <Card isAccordion={false}>
        <SupportingTextCell shouldAlignLeft={true}>
          タイトル
        </SupportingTextCell>
        <TextCell>
          {roomData.title}
        </TextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          結果
        </SupportingTextCell>
        <Table />
        <SupportingTextCell shouldAlignLeft={false}>
          人が投票済み
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          この投票は{ruleDisplayNames[roomData.rule]}で集計されました。
        </SupportingTextCell>
      </Card>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
`

export default ResultPage