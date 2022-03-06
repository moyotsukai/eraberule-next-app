export type RuleSet = {
  majorityRule: string
  bordaRule: string
  condorcetRule: string
  majorityJudgement: string
}

const ruleNames: RuleSet = {
  majorityRule: "majorityRule",
  bordaRule: "bordaRule",
  condorcetRule: "condorcetRule",
  majorityJudgement: "majorityJudgement"
}

const defaultCoommonLanguage: string[] = [
  "非常に良い",
  "良い",
  "まずまず",
  "容認",
  "不十分",
  "失格"
]

export { ruleNames, defaultCoommonLanguage }