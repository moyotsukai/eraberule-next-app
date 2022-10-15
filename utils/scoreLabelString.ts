import { Language } from "../i18n/i18n"
import { RULE_NAMES } from "../rules/ruleNames"

type Props = {
  ruleName: string,
  language: Language
}

export const scoreLabelString = (props: Props) => {
  const { ruleName, language } = props

  if (language === "ja") {
    if (ruleName === RULE_NAMES.MAJORITY_RULE) {
      return "票"
    }
    if (ruleName === RULE_NAMES.BORDA_COUNT_METHOD) {
      return "点"
    }
  } else {
    return ""
  }
}