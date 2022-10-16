export const RULE_NAMES = {
  MAJORITY_RULE: "majorityRule",
  BORDA_COUNT_METHOD: "bordaRule",
  CONDORCET_METHOD: "condorcetRule",
  MAJORITY_JUDGEMENT: "majorityJudgement"
}

export const RULE_KEY_NAMES = Object.keys(RULE_NAMES)

export type RuleKeyName = keyof typeof RULE_NAMES
