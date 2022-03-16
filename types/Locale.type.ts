import { RuleSet } from "./rules"

export type Locale = {
  common: {
    tabBar: {
      vote: string,
      create: string
    }
  },
  functional: {
    mjDetails: {
      numOfVotes: string
    },
    newPageCard: {
      title: string,
      enterTitle: string,
      errorUsedTitle: string,
      explanation: string,
      enterExplanation: string,
      addExplanation: string,
      options: string,
      enterOption: string,
      addOption: string,
      limitExplanationF: string,
      limitExplanationB: string,
      and: string,
      period: string,
      voringMethod: string,
      measures: string,
      enterMeasure: string,
      addMeasure: string
    },
    otherResultTable: {
      whatIfAnalysis: string,
      if: string,
      what: string
    },
    preferenceProfileTable: {
      nVoters: string,
      rankOrderings: string,
      people: string
    },
    relativeEvaluationResultTable: {
      nPossibilityF: string,
      nPossibilityB: string
    },
    toVoteCard: {
      loading: string,
      seeResult: string,
      vote: string,
      title: string
    },
    votePageCard: {
      title: string,
      explanation: string,
      options: string,
      ruleExplanationF: string,
      ruleExplanationB: string
    }
  },
  templates: {
    createTemplate: {
      loading: string,
      notConnected: string,
      createNew: string,
      create: string,
      recentRoom: string
    },
    indexTemplate: {
      loading: string,
      notConnected: string,
      searchRooms: string,
      enterTitle: string,
      terms: string,
      agreeToTermsF: string,
      agreeToTermsB: string
    },
    newTemplate: {
      sending: string,
      submit: string
    },
    resultTemplate: {
      loading: string,
      notConnected: string,
      live: string,
      title: string,
      result: string,
      nPeopleVoted: string,
      ruleExplanationF: string,
      ruleExplanationB: string,
      details: string,
      aboutVotingMethods: string
    },
    roomTemplate: {
      loading: string,
      notConnected: string,
      noResults: string,
      closedRoom: string
    },
    shareTemplate: {
      createdRoom: string,
      explanation: string,
      title: string,
      qrCode: string,
      download: string,
      link: string,
      copy: string,
      copied: string
    },
    suggestTemplate: {
      helpChoosing: string,
      skip: string,
      question: string,
      suggestedRule: string,
      createWith: string,
      createWithout: string
    },
    voteTemplate: {
      loading: string,
      notConnected: string,
      sending: string,
      send: string
    }
  },
  rules: {
    borda: {
      score: string
    },
    majorityRule: {
      score: string
    },
    defaultCommonLanguage: string[]
  },
  ruleDisplayNames: RuleSet,
  ruleExplanations: RuleSet,
  ruleSuggestions: RuleSet
}