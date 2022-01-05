import React from 'react'
import { css } from '@emotion/react'
import Card from '../atoms/card'
import SupportingTextCell from '../atoms/supportingTextCell'
import Spacer from '../atoms/spacer'
import { ruleDisplayNames, ruleExplanations } from '../../types/rules'
import { ruleNames } from '../../types/rules'
import Input from '../atoms/Input'
import TextArea from '../atoms/TextArea'
import TextButton from '../atoms/TextButton'
import { supportingTextColor } from '../../styles/colors'
import RemoveButton from '../atoms/RemoveButton'
import SingleSelectionCell from '../atoms/singleSelectionCell'

type Props = {
  title: string
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  hasAddedExplanation: boolean
  onAddExplanation: () => void
  explanation: string
  onExplanationChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  isAddOptionEnabled: boolean
  onAddOption: () => void
  options: string[]
  onOptionsChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onRemoveOption: (number) => void
  onRuleSelection: (string) => void
  selectedRule: string
  isAddEvaluationBocaburalyEnabled: boolean
  onAddEvaluationVocabulary: () => void
  commonLanguage: string[]
  onCommonLanguageChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onRemoveEvaluationVocabulary: (number) => void
}

const NewPageCard: React.FC<Props> = (props) => {
  return (
    <Card>
      <SupportingTextCell shouldAlignLeft={true}>
        タイトル
      </SupportingTextCell>
      <Input
        value={props.title}
        placeholder="タイトルを入力"
        onChange={props.onTitleChange}
      />
      <Spacer y="15px" />

      <SupportingTextCell shouldAlignLeft={true}>
        説明
      </SupportingTextCell>
      {props.hasAddedExplanation
        ?
        <TextArea
          value={props.explanation}
          placeholder="説明文を入力"
          onChange={props.onExplanationChange}
        />
        :
        <div css={textButtonContainerStyle}>
          <TextButton onClick={props.onAddExplanation}>
            説明文を追加
          </TextButton>
        </div>
      }
      <Spacer y="15px" />

      <SupportingTextCell shouldAlignLeft={true}>
        候補
      </SupportingTextCell>
      {props.options.map((option, index) => (
        <React.Fragment key={index}>
          <div css={inputCellContainerStyle}>
            <div css={inputContainerStyle}>
              <Input
                value={option}
                placeholder="候補を入力"
                onChange={(event) => props.onOptionsChange(event, index)}
              />
            </div>
            <RemoveButton
              onClick={() => props.onRemoveOption(index)}
              isEnabled={props.options.length !== 1}
            />
          </div>
          {index !== props.options.length - 1 &&
            <Spacer y="5px" />
          }
        </React.Fragment>
      ))}
      {props.isAddOptionEnabled &&
        <div css={textButtonContainerStyle}>
          <TextButton onClick={props.onAddOption} >
            候補を追加
          </TextButton>
        </div>
      }
      <Spacer y="15px" />

      <SupportingTextCell shouldAlignLeft={true}>
        投票のルール
      </SupportingTextCell>
      {Object.values(ruleNames).map((ruleName, index) => (
        <SingleSelectionCell
          text={ruleDisplayNames[ruleName]}
          onClick={() => props.onRuleSelection(ruleName)}
          isSelected={ruleName === props.selectedRule}
          key={index}
        >
          {ruleName === props.selectedRule &&
            <p css={explanationStyle}>
              {ruleExplanations[ruleName]}
            </p>
          }
        </SingleSelectionCell>
      ))}

      {props.selectedRule === ruleNames.majorityJudgement &&
        <React.Fragment>
          <Spacer y="15px" />
          <SupportingTextCell shouldAlignLeft={true}>
            評価の語彙(良い方から順に入力)
          </SupportingTextCell>
          {props.commonLanguage.map((evaluation, index) => (
            <React.Fragment key={index}>
              <div css={inputCellContainerStyle}>
                <div css={inputContainerStyle}>
                  <Input
                    value={evaluation}
                    placeholder="評価の語彙を入力"
                    onChange={(event) => props.onCommonLanguageChange(event, index)}
                  />
                </div>
                <RemoveButton
                  onClick={() => props.onRemoveEvaluationVocabulary(index)}
                  isEnabled={props.commonLanguage.length !== 1}
                />
              </div>
              {index !== props.commonLanguage.length - 1 &&
                <Spacer y="5px" />
              }
            </React.Fragment>
          ))}
          {props.isAddEvaluationBocaburalyEnabled &&
            <div css={textButtonContainerStyle}>
              <TextButton onClick={props.onAddEvaluationVocabulary} >
                評価の語彙を追加
              </TextButton>
            </div>
          }
        </React.Fragment>
      }
    </Card>
  )
}

const textButtonContainerStyle = css`
  padding: 0 10px;
  text-align: left;
`
const inputCellContainerStyle = css`
  display: flex;
  align-items: center;
`
const inputContainerStyle = css`
  flex-grow: 1;
`
const explanationStyle = css`
  text-align: left;
  font-size: 10pt;
  color: ${supportingTextColor};
`

export default NewPageCard