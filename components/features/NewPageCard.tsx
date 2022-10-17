import React from 'react'
import { css } from '@emotion/react'
import Card from '../ui/Card'
import SupportingTextCell from '../ui/SupportingTextCell'
import Spacer from '../ui/Spacer'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import TextButton from '../ui/TextButton'
import { supportingTextColor } from '../../styles/colors'
import RemoveButton from '../ui/RemoveButton'
import SingleSelectionCell from '../ui/SingleSelectionCell'
import { useLocale } from '../../i18n/useLocale'
import { T_NEW_PAGE_FORM } from '../../locales/newPageForm'
import { T_RULES } from '../../locales/rules'
import { RuleKeyName, RULE_KEY_NAME, RULE_KEY_NAMES } from '../../rules/ruleNames'

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
  onRuleSelection: (ruleKeyName: RuleKeyName) => void
  selectedRuleKeyName: RuleKeyName
  isAddEvaluationVocabularyEnabled: boolean
  onAddEvaluationVocabulary: () => void
  commonLanguage: string[]
  onCommonLanguageChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onRemoveEvaluationVocabulary: (number) => void
}

const NewPageCard: React.FC<Props> = (props) => {
  const { t } = useLocale(T_NEW_PAGE_FORM)
  const t_rules = useLocale(T_RULES).t

  return (
    <Card>
      <SupportingTextCell textAlign="left">
        {t.TITLE}
      </SupportingTextCell>
      <Input
        value={props.title}
        placeholder={t.ENTER_TITLE}
        onChange={props.onTitleChange}
      />
      {props.shouldChangeTitle &&
        <SupportingTextCell textAlign="left" isError={true}>
          {t.ERROR_USED_TITLE}
        </SupportingTextCell>
      }
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        {t.EXPLANATION}
      </SupportingTextCell>
      {props.hasAddedExplanation
        ?
        <TextArea
          value={props.explanation}
          placeholder={t.ENTER_EXPLANATION}
          onChange={props.onExplanationChange}
        />
        :
        <div css={textButtonContainerStyle}>
          <TextButton onClick={props.onAddExplanation}>
            {t.ADD_EXPLANATION}
          </TextButton>
        </div>
      }
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        {t.OPTIONS}
      </SupportingTextCell>
      {props.options.map((option, index) => (
        <React.Fragment key={index}>
          <div css={inputCellContainerStyle}>
            <div css={inputContainerStyle}>
              <Input
                value={option}
                placeholder={t.ENTER_OPTION}
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
            {t.ADD_OPTION}
          </TextButton>
        </div>
      }
      <SupportingTextCell textAlign="left" isError={props.isOptionsExceed}>
        {t.LIMIT_EXPLANATION_1
          + t_rules.$RULE_DISPLAY_NAME(RULE_KEY_NAME.BORDA_COUNT_METHOD)
          + t.AND
          + t_rules.$RULE_DISPLAY_NAME(RULE_KEY_NAME.CONDORCET_METHOD)
          + t.LIMIT_EXPLANATION_2 + t.PERIOD
        }
      </SupportingTextCell>
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        {t.VOTING_MATHOD}
      </SupportingTextCell>
      {Object.values(RULE_KEY_NAMES).map((ruleKeyName, index) => (
        <SingleSelectionCell
          text={t_rules.$RULE_DISPLAY_NAME(ruleKeyName)}
          onClick={() => props.onRuleSelection(ruleKeyName)}
          isSelected={ruleKeyName === props.selectedRuleKeyName}
          key={index}
        >
          {ruleKeyName === props.selectedRuleKeyName &&
            <p css={explanationStyle}>
              {t_rules.$RULE_EXPLANATION(ruleKeyName)}
            </p>
          }
        </SingleSelectionCell>
      ))}

      {props.selectedRuleKeyName === RULE_KEY_NAME.MAJORITY_JUDGEMENT &&
        <React.Fragment>
          <Spacer y="15px" />
          <SupportingTextCell textAlign="left">
            {t.MEASURES}
          </SupportingTextCell>
          {props.commonLanguage.map((evaluation, index) => (
            <React.Fragment key={index}>
              <div css={inputCellContainerStyle}>
                <div css={inputContainerStyle}>
                  <Input
                    value={evaluation}
                    placeholder={t.ENTER_MEASURE}
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
                {t.ADD_MEASURE}
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