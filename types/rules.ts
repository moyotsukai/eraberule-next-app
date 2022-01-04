interface RuleSet {
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

const ruleDisplayNames: RuleSet = {
  majorityRule: "多数決",
  bordaRule: "ボルダルール",
  condorcetRule: "コンドルセルール",
  majorityJudgement: "Majority Judgement"
}

export { ruleNames, ruleDisplayNames }