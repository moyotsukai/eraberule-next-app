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

const ruleExplanations: RuleSet = {
  majorityRule: "通常の多数決です。",
  bordaRule: "選択肢が３つ以上の時に使えます。例えば３択の時、１番良いと思う候補に３点、２番目に２点、３番目に１点を加算します。勝者は満場一致に最も近いものになります。",
  condorcetRule: "選択肢が３つ以上の時に使えます。総当たり戦を元に確率の計算を行います。勝者は他の候補との一騎打ちで必ず勝利します。",
  majorityJudgement: "各選択肢に対して絶対評価で投票し、中央値をその候補の評価とします。"
}

const defaultCoommonLanguage: string[] = [
  "非常に良い",
  "良い",
  "まずまず",
  "容認",
  "不十分",
  "失格"
]

export { ruleNames, ruleDisplayNames, ruleExplanations, defaultCoommonLanguage }