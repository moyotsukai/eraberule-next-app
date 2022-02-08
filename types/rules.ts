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
  condorcetRule: "コンドルセ・ヤングの最尤法",
  majorityJudgement: "Majority Judgement"
}

const ruleExplanations: RuleSet = {
  majorityRule: "一番良いと思う候補を一つ選びます。",
  bordaRule: "候補が３つ以上の時に使えます。例えば３択の時、１番良いと思う候補に３点、２番目に２点、３番目に１点を加算します。勝者は満場一致に最も近いものになります。",
  condorcetRule: "候補が３つ以上の時に使えます。総当たり戦を元に確率の計算を行います。勝者は他の候補との一騎打ちで必ず勝利します。",
  majorityJudgement: "各候補に対して絶対評価で投票し、中央値をその候補の評価とします。"
}

const ruleSuggestions: RuleSet = {
  majorityRule: "一部の人から熱狂的に支持されている候補を選びたい",
  bordaRule: "できるだけ満場一致に近い候補を選びたい",
  condorcetRule: "勝者が他の候補との１対１の比較で優位であることを保証したい",
  majorityJudgement: "わざと極端な評価をするような票に左右されにくい決め方にしたい"
}

const defaultCoommonLanguage: string[] = [
  "非常に良い",
  "良い",
  "まずまず",
  "容認",
  "不十分",
  "失格"
]

export { ruleNames, ruleDisplayNames, ruleExplanations, ruleSuggestions, defaultCoommonLanguage }