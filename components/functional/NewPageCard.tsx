import React from 'react'
import { css } from '@emotion/react'
import Card from '../ui/Card'
import SupportingTextCell from '../ui/SupportingTextCell'
import Spacer from '../ui/Spacer'
import { ruleNames } from '../../types/rules'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import TextButton from '../ui/TextButton'
import { supportingTextColor } from '../../styles/colors'
import RemoveButton from '../ui/RemoveButton'
import SingleSelectionCell from '../ui/SingleSelectionCell'
import { useLocale } from '../../hooks/useLocale'

type Props = {
  title: string
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  shouldChangeTitle: boolean
  hasAddedExplanation: boolean
  onAddExplanation: () => void
  explanation: string
  onExplanationChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  isAddOptionEnabled: boolean
  onAddOption: () => void
  options: string[]
  onOptionsChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onRemoveOption: (number) => void
  isOptionsExceed: boolean
  onRuleSelection: (string) => void
  selectedRule: string
  isAddEvaluationVocabularyEnabled: boolean
  onAddEvaluationVocabulary: () => void
  commonLanguage: string[]
  onCommonLanguageChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onRemoveEvaluationVocabulary: (number) => void
}

const NewPageCard: React.FC<Props> = (props) => {
  const { t } = useLocale()
  const localizedString = t.functional.newPageCard

  return (
    <Card>
      <SupportingTextCell textAlign="left">
        {localizedString.title}
      </SupportingTextCell>
      <Input
        value={props.title}
        placeholder={localizedString.enterTitle}
        onChange={props.onTitleChange}
      />
      {props.shouldChangeTitle &&
        <SupportingTextCell textAlign="left" isError={true}>
          {localizedString.errorUsedTitle}
        </SupportingTextCell>
      }
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        {localizedString.explanation}
      </SupportingTextCell>
      {props.hasAddedExplanation
        ?
        <TextArea
          value={props.explanation}
          placeholder={localizedString.enterExplanation}
          onChange={props.onExplanationChange}
        />
        :
        <div css={textButtonContainerStyle}>
          <TextButton onClick={props.onAddExplanation}>
            {localizedString.addExplanation}
          </TextButton>
        </div>
      }
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        {localizedString.options}
      </SupportingTextCell>
      {props.options.map((option, index) => (
        <React.Fragment key={index}>
          <div css={inputCellContainerStyle}>
            <div css={inputContainerStyle}>
              <Input
                value={option}
                placeholder={localizedString.enterOption}
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
            {localizedString.addOption}
          </TextButton>
        </div>
      }
      <SupportingTextCell textAlign="left" isError={props.isOptionsExceed}>
        {localizedString.limitExplanationF + t.ruleDisplayNames.bordaRule + localizedString.and + t.ruleDisplayNames.condorcetRule + localizedString.limitExplanationB + localizedString.period}
      </SupportingTextCell>
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        {localizedString.voringMethod}
      </SupportingTextCell>
      {Object.values(ruleNames).map((ruleName, index) => (
        <SingleSelectionCell
          text={t.ruleDisplayNames[ruleName]}
          onClick={() => props.onRuleSelection(ruleName)}
          isSelected={ruleName === props.selectedRule}
          key={index}
        >
          {ruleName === props.selectedRule &&
            <p css={explanationStyle}>
              {t.ruleExplanations[ruleName]}
            </p>
          }
        </SingleSelectionCell>
      ))}

      {props.selectedRule === ruleNames.majorityJudgement &&
        <React.Fragment>
          <Spacer y="15px" />
          <SupportingTextCell textAlign="left">
            {localizedString.measures}
          </SupportingTextCell>
          {props.commonLanguage.map((evaluation, index) => (
            <React.Fragment key={index}>
              <div css={inputCellContainerStyle}>
                <div css={inputContainerStyle}>
                  <Input
                    value={evaluation}
                    placeholder={localizedString.enterMeasure}
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
          {props.isAddEvaluationVocabularyEnabled &&
            <div css={textButtonContainerStyle}>
              <TextButton onClick={props.onAddEvaluationVocabulary} >
                {localizedString.addMeasure}
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