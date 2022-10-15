import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import LoadingProviderWithoutAuth from '../common/LoadingProviderWithoutAuth'
import { useLocale } from '../../i18n/useLocale'
import { T_SUGGEST } from '../../locales/suggestPage'
import Spacer from '../ui/Spacer'
import TextCell from '../ui/TextCell'
import TextButton from '../ui/TextButton'
import Card from '../ui/Card'
import SupportingTextCell from '../ui/SupportingTextCell'
import Button from '../ui/Button'
import SingleSelectionCell from '../ui/SingleSelectionCell'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { suggestedRuleState } from '../../states/atoms'
import { RuleKeyName, RULE_KEY_NAMES } from '../../rules/ruleNames'
import { T_RULES } from '../../locales/rules'
import smoothscroll from 'smoothscroll-polyfill'

const SuggestPage: React.FC = () => {
  const router = useRouter()
  const [suggestedRule, setSuggestedRule] = useRecoilState(suggestedRuleState)
  const bottomElementRef = useRef<HTMLDivElement>(null)
  const { t } = useLocale(T_SUGGEST)
  const t_rules = useLocale(T_RULES).t

  //Setup scroll behavior
  useEffect(() => {
    smoothscroll.polyfill()
  }, [])

  //Scroll when selected
  useEffect(() => {
    bottomElementRef?.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [suggestedRule])

  const onRuleSelect = (ruleKeyName: RuleKeyName) => {
    if (suggestedRule === null) {
      setSuggestedRule(ruleKeyName)
    } else {
      if (suggestedRule === ruleKeyName) {
        setSuggestedRule(null)
      } else {
        setSuggestedRule(ruleKeyName)
      }
    }
  }

  const toNewRoomWithRule = () => {
    router.push("/create/new")
  }

  const toNewRoomWithoutRule = () => {
    setSuggestedRule(null)
    router.push("/create/new")
  }

  return (
    <LoadingProviderWithoutAuth isLoading={false}>
      <Spacer y="25px" />
      <TextCell>
        <div css={textStyle}>
          {t.HELP_CHOOSING}
        </div>
      </TextCell>
      <div css={skipButtonContainerStyle}>
        <TextButton onClick={toNewRoomWithoutRule}>
          {t.SKIP}
        </TextButton>
      </div>

      <div css={cardContainerStyle}>
        <Card>
          <TextCell>
            {t.QUESTION}
          </TextCell>
          <Spacer y="15px" />

          <div css={tableStyle}>
            {RULE_KEY_NAMES.map((RULE_KEY_NAME: RuleKeyName, index) => (
              <SingleSelectionCell
                text={t_rules.$RULE_SUGGESTION(RULE_KEY_NAME)}
                onClick={() => onRuleSelect(RULE_KEY_NAME)}
                isSelected={RULE_KEY_NAME === suggestedRule}
                key={index}
              />
            ))}
          </div>
        </Card>
      </div>

      {suggestedRule &&
        <div ref={bottomElementRef} css={cardContainerStyle}>
          <Card>
            <SupportingTextCell textAlign="left">
              {t.SUGGESTED_RULE}
            </SupportingTextCell>
            <TextCell>
              {t_rules.$RULE_DISPLAY_NAME(suggestedRule)}
            </TextCell>
            <Spacer y="15px" />
            <div css={buttonGroupStyle}>
              <div css={buttonSpacerStyle} />
              <Button onClick={toNewRoomWithRule} isEnabled={true} isLoading={false}>
                {t.CREATE}
              </Button>
              <div css={textButtonContainerStyle}>
                <TextButton onClick={toNewRoomWithoutRule}>
                  {t.CHOOSE_LATER}
                </TextButton>
              </div>
            </div>
          </Card>
        </div>
      }
    </LoadingProviderWithoutAuth>
  )
}

const cardContainerStyle = css`
  padding: 0 15px;
`
const textStyle = css`
  text-align: center;
`
const skipButtonContainerStyle = css`
  margin: 0 auto;
  max-width: 600px;
  border-radius: 12px;
  text-align: center;
`
const tableStyle = css`
  padding: 0 10px;
`
const buttonGroupStyle = css`
  text-align: left;
`
const buttonSpacerStyle = css`
  display: inline-block;
  width: 8px;
`
const textButtonContainerStyle = css`
  display: inline-block;
  margin-left: 8px;
`

export default SuggestPage