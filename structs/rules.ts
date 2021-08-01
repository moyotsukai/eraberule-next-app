interface Rule {
  majorityRule: string
  bordaRule: string
  condorcetRule: string
  majorityJusgement: string
}

const ruleNames: Rule = {
  majorityRule: "majorityRule",
  bordaRule: "bordaRule",
  condorcetRule: "condorcetRule",
  majorityJusgement: "majorityJusgement"
}

const ruleDisplayNames: Rule = {
  majorityRule: "多数決",
  bordaRule: "ボルダルール",
  condorcetRule: "コンドルセルール",
  majorityJusgement: "Majority Judgement"
}

export { ruleNames, ruleDisplayNames }