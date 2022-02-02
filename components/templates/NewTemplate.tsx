import React from 'react'
import { css } from '@emotion/react'
import NewPageCard from '../functional/NewPageCard'
import Button from '../ui/Button'
import Spacer from '../ui/Spacer'

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
  onSend: () => void
  isSendEnabled: boolean
  isSendClicked: boolean
}

const NewTemplate: React.FC<Props> = (props) => {
  return (
    <div css={layoutStyle}>
      <NewPageCard
        title={props.title}
        onTitleChange={props.onTitleChange}
        shouldChangeTitle={props.shouldChangeTitle}
        hasAddedExplanation={props.hasAddedExplanation}
        onAddExplanation={props.onAddExplanation}
        explanation={props.explanation}
        onExplanationChange={props.onExplanationChange}
        isAddOptionEnabled={props.isAddOptionEnabled}
        onAddOption={props.onAddOption}
        options={props.options}
        onOptionsChange={props.onOptionsChange}
        onRemoveOption={props.onRemoveOption}
        isOptionsExceed={props.isOptionsExceed}
        onRuleSelection={props.onRuleSelection}
        selectedRule={props.selectedRule}
        isAddEvaluationVocabularyEnabled={props.isAddEvaluationVocabularyEnabled}
        onAddEvaluationVocabulary={props.onAddEvaluationVocabulary}
        commonLanguage={props.commonLanguage}
        onCommonLanguageChange={props.onCommonLanguageChange}
        onRemoveEvaluationVocabulary={props.onRemoveEvaluationVocabulary}
      />

      <Button
        onClick={props.onSend}
        isEnabled={props.isSendEnabled}
        isLoading={props.isSendClicked}
      >
        {props.isSendClicked
          ? "送信中"
          : "公開"
        }
      </Button>
      <Spacer y="35px" />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
  padding: 0 15px;
`

export default NewTemplate