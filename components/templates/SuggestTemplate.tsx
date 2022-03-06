import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import Card from '../ui/Card'
import SupportingTextCell from '../ui/SupportingTextCell'
import TextCell from '../ui/TextCell'
import Spacer from '../ui/Spacer'
import TextButton from '../ui/TextButton'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { suggestedRuleState } from '../../states/atoms'
import { ruleNames } from '../../types/rules'
import Button from '../ui/Button'
import SingleSelectionCell from '../ui/SingleSelectionCell'
import smoothscroll from 'smoothscroll-polyfill'
import { useLocale } from '../../hooks/useLocale'

const SuggestTemplate: React.FC = () => {
  const router = useRouter()
  const [suggestedRule, setSuggestedRule] = useRecoilState(suggestedRuleState)
  const bottomElementRef = useRef<HTMLDivElement>(null)
  const { t } = useLocale()
  const localizedString = t.templates.suggestTemplate

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

  const handleSelection = (ruleName: string) => {
    if (suggestedRule === null) {
      setSuggestedRule(ruleName)
    } else {
      if (suggestedRule === ruleName) {
        setSuggestedRule(null)
      } else {
        setSuggestedRule(ruleName)
      }
    }
  }

  const toNewRoomWithoutRule = () => {
    setSuggestedRule(null)
    router.push("/create/new")
  }

  const toNewRoomWithRule = () => {
    router.push("/create/new")
  }

  return (
    <div css={layoutStyle}>
      <Spacer y="25px" />
      <TextCell>
        <div css={textStyle}>
          {localizedString.helpChoosing}
        </div>
      </TextCell>
      <div css={skipButtonContainerStyle}>
        <TextButton onClick={toNewRoomWithoutRule}>
          {localizedString.skip}
        </TextButton>
      </div>

      <Card>
        <TextCell>
          {localizedString.question}
        </TextCell>
        <Spacer y="15px" />

        <div css={tableStyle}>
          {Object.values(ruleNames).map((ruleName, index) => (
            <SingleSelectionCell
              text={t.ruleSuggestions[ruleName]}
              onClick={() => handleSelection(ruleName)}
              isSelected={ruleName === suggestedRule}
              key={index}
            />
          ))}
        </div>
      </Card>

      {suggestedRule &&
        <div ref={bottomElementRef}>
          <Card>
            <SupportingTextCell textAlign="left">
              {localizedString.suggestedRule}
            </SupportingTextCell>
            <TextCell>
              {t.ruleDisplayNames[suggestedRule]}
            </TextCell>
            <Spacer y="15px" />
            <div css={buttonGroupStyle}>
              <div css={buttonSpacerStyle} />
              <Button onClick={toNewRoomWithRule} isEnabled={true} isLoading={false}>
                {localizedString.createWith}
              </Button>
              <div css={textButtonContainerStyle}>
                <TextButton onClick={toNewRoomWithoutRule}>
                  {localizedString.createWithout}
                </TextButton>
              </div>
            </div>
          </Card>
        </div>
      }
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
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

export default SuggestTemplate