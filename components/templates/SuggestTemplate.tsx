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
import { ruleDisplayNames, ruleNames, ruleSuggestions } from '../../types/rules'
import Button from '../ui/Button'
import SingleSelectionCell from '../ui/SingleSelectionCell'

const SuggestTemplate: React.FC = () => {
  const router = useRouter()
  const [suggestedRule, setSuggestedRule] = useRecoilState(suggestedRuleState)
  const bottomElementRef = useRef<HTMLDivElement>(null)

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
          投票ルールの選択を手伝います。
        </div>
      </TextCell>
      <div css={skipButtonContainerStyle}>
        <TextButton onClick={toNewRoomWithoutRule}>
          この工程をスキップ
        </TextButton>
      </div>

      <Card>
        <TextCell>
          あなたが作ろうとしている投票ではどんな条件が望ましいですか？
        </TextCell>
        <Spacer y="15px" />

        <div css={tableStyle}>
          {Object.values(ruleNames).map((ruleName, index) => (
            <SingleSelectionCell
              text={ruleSuggestions[ruleName]}
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
              おすすめの投票ルール
            </SupportingTextCell>
            <TextCell>
              {ruleDisplayNames[suggestedRule]}
            </TextCell>
            <Spacer y="15px" />
            <div css={buttonGroupStyle}>
              <div css={buttonSpacerStyle} />
              <Button onClick={toNewRoomWithRule} isEnabled={true} isLoading={false}>
                この決め方で投票を作成
              </Button>
              <div css={textButtonContainerStyle}>
                <TextButton onClick={toNewRoomWithoutRule}>
                  決め方を保留にして投票を作成
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