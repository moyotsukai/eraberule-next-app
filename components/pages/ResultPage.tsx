import { css } from "@emotion/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { RULE_DETAILS_URL } from "../../constants/constants"
import { useLocale } from "../../i18n/useLocale"
import { T_RESULT_PAGE } from "../../locales/resultPage"
import { T_RULES } from "../../locales/rules"
import { ruleKeyNameFromRuleName } from "../../model/firestore/dataConverter"
import { useResult } from "../../model/room/useResult"
import { bordaRule } from "../../rules/bordaRule"
import { condorcetRule } from "../../rules/condorcetRule"
import { majorityJudgement } from "../../rules/majorityJudgement"
import { majorityRule } from "../../rules/majorityRule"
import { RuleKeyName, RULE_NAMES } from "../../rules/ruleNames"
import { roomDataState } from "../../states/atoms"
import { RankResults } from "../../types/RankResults.type"
import { RuleDataAsset } from "../../types/RuleDataAsset"
import SignInProvider from "../common/SignInProvider"
import MjDetails from "../features/MjDetails"
import OtherResultsTable from "../features/OtherResultsTable"
import PreferenceProfilesTable from "../features/PreferenceProfilesTable"
import ResultTable from "../features/ResultTable"
import Accordion from "../ui/Accordion"
import Card from "../ui/Card"
import LiveIndicator from "../ui/LiveIndicator"
import Spacer from "../ui/Spacer"
import SpacerInline from "../ui/SpacerInline"
import SupportingTextCell from "../ui/SupportingTextCell"
import TextButton from "../ui/TextButton"
import TextCell from "../ui/TextCell"

const ResultPage: React.FC = () => {
  const router = useRouter()
  const roomData = useRecoilValue(roomDataState)
  const { personalRanks } = useResult(roomData)
  const [resultRanks, setResultRanks] = useState<RankResults[] | undefined>(undefined)
  const [otherResults, setOtherResults] = useState<Array<RankResults[] | null> | undefined | null>(undefined)
  const { t, language } = useLocale(T_RESULT_PAGE)
  const t_rules = useLocale(T_RULES).t

  const ruleKeyName: RuleKeyName = ruleKeyNameFromRuleName(roomData.rule)
  const isMj = roomData.rule === RULE_NAMES.MAJORITY_JUDGEMENT
  const isPreferenceVoting = roomData.rule === RULE_NAMES.BORDA_COUNT_METHOD || roomData.rule === RULE_NAMES.CONDORCET_METHOD

  //Push router when reloaded
  useEffect(() => {
    if (!roomData.title) {
      router.push("/")
    }
  }, [])

  //Set rank results
  useEffect(() => {
    if (!personalRanks) { return }

    const ruleDataAsset: RuleDataAsset = {
      roomData: roomData,
      personalRanks: personalRanks,
      language: language
    }

    if (roomData.rule === RULE_NAMES.MAJORITY_RULE) {
      const mResult = majorityRule(ruleDataAsset)
      setResultRanks(mResult)
      setOtherResults(null)
    }
    if (roomData.rule === RULE_NAMES.BORDA_COUNT_METHOD) {
      const mResult = majorityRule(ruleDataAsset)
      const bResult = bordaRule(ruleDataAsset)
      const cResult = condorcetRule(ruleDataAsset)
      setResultRanks(bResult)
      setOtherResults([mResult, null, cResult, null])
    }
    if (roomData.rule === RULE_NAMES.CONDORCET_METHOD) {
      const mResult = majorityRule(ruleDataAsset)
      const bResult = bordaRule(ruleDataAsset)
      const cResult = condorcetRule(ruleDataAsset)
      setResultRanks(cResult)
      setOtherResults([mResult, bResult, null, null])
    }
    if (roomData.rule === RULE_NAMES.MAJORITY_JUDGEMENT) {
      const mjResult = majorityJudgement(ruleDataAsset)
      setResultRanks(mjResult)
      setOtherResults(null)
    }
  }, [personalRanks])

  const onReadAboutRules = () => {
    window.open(RULE_DETAILS_URL, "_blank", "noreferrer")
  }

  //UI
  return (
    <SignInProvider>
      <div css={layoutStyle}>
        <SupportingTextCell textAlign="right">
          <div css={liveIndicatorContainerStyle}>
            <LiveIndicator />
            <SpacerInline x="5px" />
            {t.LIVE}
          </div>
        </SupportingTextCell>

        <Card>
          <SupportingTextCell textAlign="left">
            {t.TITLE}
          </SupportingTextCell>
          <TextCell>
            {roomData.title}
          </TextCell>
          <Spacer y="15px" />

          <SupportingTextCell textAlign="left">
            {t.RESULT}
          </SupportingTextCell>

          <ResultTable
            resultRanks={resultRanks}
            roomData={roomData}
          />

          <SupportingTextCell textAlign="right">
            {personalRanks && (
              personalRanks.length + t.N_PEOPLE_VOTED
            )}
          </SupportingTextCell>
          <Spacer y="15px" />

          <SupportingTextCell textAlign="left">
            {t.RULE_EXPLANATION_1 + t_rules.$RULE_DISPLAY_NAME(ruleKeyName) + t.RULE_EXPLANATION_2}
          </SupportingTextCell>
        </Card>

        {isMj &&
          <Accordion title={t.DETAILS}>
            <MjDetails roomData={roomData} personalRanks={personalRanks} />
          </Accordion>
        }

        {isPreferenceVoting &&
          <Accordion title={t.DETAILS}>
            <PreferenceProfilesTable roomData={roomData} personalRanks={personalRanks} />
          </Accordion>
        }

        <OtherResultsTable
          otherResults={otherResults}
          roomData={roomData}
        />

        <div css={buttonContainerStyle}>
          <TextButton onClick={onReadAboutRules}>
            {t.ABOUT_VOTING_METHODS}
          </TextButton>
        </div>
      </div>
    </SignInProvider>
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

export default ResultPage