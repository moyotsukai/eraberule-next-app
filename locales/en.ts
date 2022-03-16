import { Locale } from "../types/Locale.type"

const en: Locale = {
  common: {
    tabBar: {
      vote: "Vote",
      create: "Create"
    }
  },
  functional: {
    mjDetails: {
      numOfVotes: ""
    },
    newPageCard: {
      title: "Title",
      enterTitle: "Enter title",
      errorUsedTitle: "Already used title. Try adding numbers at the end, for exapmle.",
      explanation: "Explanation",
      enterExplanation: "Enter explanation",
      addExplanation: "Add explanation",
      options: "Options",
      enterOption: "Enter option",
      addOption: "Add option",
      limitExplanationF: "You can enter at maximum of 10 options with ",
      limitExplanationB: "",
      and: " and ",
      period: ".",
      voringMethod: "Voting method",
      measures: "Measures(From best to worst)",
      enterMeasure: "Enter measure",
      addMeasure: "Add measure"
    },
    otherResultTable: {
      whatIfAnalysis: "What-if analysis",
      if: "If: ",
      what: ""
    },
    preferenceProfileTable: {
      nVoters: "Voters",
      rankOrderings: "Rank orderings",
      people: ""
    },
    relativeEvaluationResultTable: {
      nPossibilityF: "Possibility #",
      nPossibilityB: ""
    },
    toVoteCard: {
      loading: "Loading",
      seeResult: "See result",
      vote: "Vote",
      title: "Title"
    },
    votePageCard: {
      title: "Title",
      explanation: "Explanation",
      options: "Options",
      ruleExplanationF: "This poll is implemented in ",
      ruleExplanationB: "."
    }
  },
  templates: {
    createTemplate: {
      loading: "Loading...",
      notConnected: "Not connected to the database",
      createNew: "Create a new voting room",
      create: "Create",
      recentRoom: "Recently created room"
    },
    indexTemplate: {
      loading: "Loading...",
      notConnected: "Not connected to the database",
      searchRooms: "Enter the name of the room and vote",
      enterTitle: "Enter title",
      terms: "terms",
      agreeToTermsF: "By using this app I agree to the ",
      agreeToTermsB: "."
    },
    newTemplate: {
      sending: "Sending",
      submit: "Submit"
    },
    resultTemplate: {
      loading: "Loading...",
      notConnected: "Not connected to the database",
      live: "Live",
      title: "Title",
      result: "Result",
      nPeopleVoted: " people voted",
      ruleExplanationF: "This voting room was implemented in ",
      ruleExplanationB: ".",
      details: "Details",
      aboutVotingMethods: "About voting methods"
    },
    roomTemplate: {
      loading: "Loading...",
      notConnected: "Not connected to the database",
      noResults: "No results found",
      closedRoom: "This voting room is closed"
    },
    shareTemplate: {
      createdRoom: "Created a new room",
      explanation: "Participants can access the poll by searching the room title, scanning QR code, or clicking the link.",
      title: "Title",
      qrCode: "QR code",
      download: "Download QR code",
      link: "Link",
      copy: "Copy link",
      copied: "Copied link"
    },
    suggestTemplate: {
      helpChoosing: "I will help you select a voting method.",
      skip: "Skip this step",
      question: "I want to select a method which...",
      suggestedRule: "Suggested method",
      createWith: "Create with this method",
      createWithout: "Create without selecting"
    },
    voteTemplate: {
      loading: "Loading...",
      notConnected: "Not connected to the database",
      sending: "Sending",
      send: "Submit"
    }
  },
  rules: {
    borda: {
      score: ""
    },
    majorityRule: {
      score: ""
    },
    defaultCommonLanguage: [
      "Excellent",
      "Very good",
      "Good",
      "Fair",
      "Insufficient",
      "To be rejected"
    ]
  },
  ruleDisplayNames: {
    majorityRule: "Majority rule",
    bordaRule: "The Borda count method",
    condorcetRule: "The Condorcet method",
    majorityJudgement: "Majority Judgement"
  },
  ruleExplanations: {
    majorityRule: "Each voter selects their first preference from the candidates.",
    bordaRule: "Useful when there are three candidates or more. When there are three candidates, for exapmle, you give 3 points for your first preference, 2 points for your second preference, and 1 point for your third preference. The winner is ensured to be closest to the unanimous decision.",
    condorcetRule: "Useful when there are three candidates or more. It compares each pair of the candidates, and then process a calculation called the maximum likelihood estimation. The winner is ensured to win against its competitors in the pairings.",
    majorityJudgement: "Voters give absolute evaluations to each candidate, and the median value of the votes is the group evaluation of the candidate."
  },
  ruleSuggestions: {
    majorityRule: "chooses a winner who is strongly supported by a part of the voters.",
    bordaRule: "chooses a winner who is closest to the unanimous decision.",
    condorcetRule: "guarantees that the winner is ahead of the opponent in every pair.",
    majorityJudgement: "is resilient against extreme evaluations."
  }
}

export default en