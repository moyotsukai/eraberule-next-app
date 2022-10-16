import { RuleKeyName } from './../rules/ruleNames'
import { asLocaleTable } from '../i18n/i18n'

export const T_RULES = asLocaleTable({
  $RULE_DISPLAY_NAME: {
    ja: (ruleName: RuleKeyName) => {
      switch (ruleName) {
        case "MAJORITY_RULE":
          return "多数決"
        case "BORDA_COUNT_METHOD":
          return "ボルダルール"
        case "CONDORCET_METHOD":
          return "コンドルセ・ヤングの最尤法"
        case "MAJORITY_JUDGEMENT":
          return "Majority Judgement"
      }
    },
    en: (ruleName: RuleKeyName) => {
      switch (ruleName) {
        case "MAJORITY_RULE":
          return "Majority rule"
        case "BORDA_COUNT_METHOD":
          return "The Borda count method"
        case "CONDORCET_METHOD":
          return "The Condorcet method"
        case "MAJORITY_JUDGEMENT":
          return "Majority Judgement"
      }
    }
  },
  $RULE_EXPLANATION: {
    ja: (ruleName: RuleKeyName) => {
      switch (ruleName) {
        case "MAJORITY_RULE":
          return "投票者は一番良いと思う候補を一つ選びます。"
        case "BORDA_COUNT_METHOD":
          return "候補が３つ以上の時に使えます。例えば３択の時、１番良いと思う候補に３点、２番目に２点、３番目に１点を加算します。勝者は満場一致に最も近いものになります。"
        case "CONDORCET_METHOD":
          return "候補が３つ以上の時に使えます。総当たり戦を元に確率の計算を行います。勝者は他の候補との一騎打ちで必ず勝利します。"
        case "MAJORITY_JUDGEMENT":
          return "各候補に対して絶対評価で投票し、中央値をその候補の評価とします。"
      }
    },
    en: (ruleName: RuleKeyName) => {
      switch (ruleName) {
        case "MAJORITY_RULE":
          return "Each voter selects their first preference from the candidates."
        case "BORDA_COUNT_METHOD":
          return "Useful when there are three candidates or more. When there are three candidates, for exapmle, you give 3 points for your first preference, 2 points for your second preference, and 1 point for your third preference. The winner is ensured to be closest to the unanimous decision."
        case "CONDORCET_METHOD":
          return "Useful when there are three candidates or more. It compares each pair of the candidates, and then process a calculation called the maximum likelihood estimation. The winner is ensured to win against its competitors in the pairings."
        case "MAJORITY_JUDGEMENT":
          return "Voters give absolute evaluations to each candidate, and the median value of the votes is the group evaluation of the candidate."
      }
    }
  },
  $RULE_SUGGESTION: {
    ja: (ruleName: RuleKeyName) => {
      switch (ruleName) {
        case "MAJORITY_RULE":
          return "一部の人から熱狂的に支持されている候補を選びたい"
        case "BORDA_COUNT_METHOD":
          return "できるだけ満場一致に近い候補を選びたい"
        case "CONDORCET_METHOD":
          return "勝者が他の候補との１対１の比較で優位であることを保証したい"
        case "MAJORITY_JUDGEMENT":
          return "わざと極端な評価をするような票に左右されにくい決め方にしたい"
      }
    },
    en: (ruleName: RuleKeyName) => {
      switch (ruleName) {
        case "MAJORITY_RULE":
          return "chooses a winner who is strongly supported by a part of the voters."
        case "BORDA_COUNT_METHOD":
          return "chooses a winner who is closest to the unanimous decision."
        case "CONDORCET_METHOD":
          return "guarantees that the winner is ahead of the opponent in every pair."
        case "MAJORITY_JUDGEMENT":
          return "is resilient against extreme evaluations."
      }
    }
  },
  DEFAULT_COMMON_LANGUAGE: {
    ja: "素晴らしい/非常に良い/良い/容認/不十分/失格",
    en: "Excellent/Very good/Good/Fair/Insufficient/To be rejected"
  }
})
