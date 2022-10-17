export const RULE_NAMES = {
  MAJORITY_RULE: "majorityRule",
  BORDA_COUNT_METHOD: "bordaRule",
  CONDORCET_METHOD: "condorcetRule",
  MAJORITY_JUDGEMENT: "majorityJudgement"
}

export const RULE_KEY_NAME = {
  MAJORITY_RULE: "MAJORITY_RULE",
  BORDA_COUNT_METHOD: "BORDA_COUNT_METHOD",
  CONDORCET_METHOD: "CONDORCET_METHOD",
  MAJORITY_JUDGEMENT: "MAJORITY_JUDGEMENT"
}

export type RuleKeyName = keyof typeof RULE_NAMES

export const RULE_KEY_NAMES = Object.keys(RULE_NAMES) as RuleKeyName[]
