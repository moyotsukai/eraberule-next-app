import React from 'react'

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
    <div />
  )
}

export default NewTemplate