import { ruleNames } from "../types/rules"

export const scoreLabelString = (ruleName: string, locale: string) => {
  if (locale === "ja") {
    if (ruleName === ruleNames.majorityRule) {
      return "票"
    }
    if (ruleName === ruleNames.bordaRule) {
      return "点"
    }
  } else {
    return ""
  }
}