export const RULE_NAMES = {
  MAJORITY_RULE: "majorityRule",
  BORDA_COUNT_METHOD: "bordaRule",
  CONDORCET_METHOD: "condorcetRule",
  MAJORITY_JUDGEMENT: "majorityJudgement"
}

export type RuleKeyName = keyof typeof RULE_NAMES

export const defaultCoommonLanguage: string[] = [
  "非常に良い",
  "良い",
  "まずまず",
  "容認",
  "不十分",
  "失格"
]
