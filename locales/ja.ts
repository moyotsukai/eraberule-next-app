import { Locale } from "../types/Locale.type"

const ja: Locale = {
  common: {
    tabBar: {
      vote: "参加",
      create: "作成"
    }
  },
  functional: {
    mjDetails: {
      numOfVotes: "票"
    },
    newPageCard: {
      title: "タイトル",
      enterTitle: "タイトルを入力",
      errorUsedTitle: "すでに使われているタイトルです。末尾に数字をつけるなどしてみてください。",
      explanation: "説明",
      enterExplanation: "説明文を入力",
      addExplanation: "説明文を追加",
      options: "候補",
      enterOption: "候補を入力",
      addOption: "候補を追加",
      limitExplanationF: "",
      limitExplanationB: "で入力できる候補の数は10までです",
      and: "と",
      period: "。",
      voringMethod: "投票のルール",
      measures: "評価を表す語彙(良い方から順に入力)",
      enterMeasure: "評価を表す語彙を入力",
      addMeasure: "評価を表す語彙を追加"
    },
    otherResultTable: {
      whatIfAnalysis: "もし〇〇だったら",
      if: "もし",
      what: "だったら"
    },
    preferenceProfileTable: {
      nVoters: "人数",
      rankOrderings: "選好順序",
      people: "人"
    },
    relativeEvaluationResultTable: {
      nPossibilityF: "",
      nPossibilityB: "つ目の可能性"
    },
    toVoteCard: {
      loading: "読み込み中",
      seeResult: "結果を見る",
      vote: "投票する",
      title: "タイトル"
    },
    votePageCard: {
      title: "タイトル",
      explanation: "説明",
      options: "候補",
      ruleExplanationF: "この投票は",
      ruleExplanationB: "で集計されます。"
    }
  },
  templates: {
    createTemplate: {
      loading: "読み込み中...",
      notConnected: "データベースに接続できません。",
      createNew: "新しい投票ルームを作成",
      create: "作成",
      recentRoom: "最近作成したルーム"
    },
    indexTemplate: {
      loading: "読み込み中...",
      notConnected: "データベースに接続できません。",
      searchRooms: "ルーム名を検索して投票に参加",
      enterTitle: "ルーム名を入力",
      terms: "利用規約",
      agreeToTermsF: "",
      agreeToTermsB: "に同意した上でアプリの利用を開始してください。"
    },
    newTemplate: {
      sending: "送信中",
      submit: "公開"
    },
    resultTemplate: {
      loading: "読み込み中...",
      notConnected: "データベースに接続できません。",
      live: "ライブ",
      title: "タイトル",
      result: "結果",
      nPeopleVoted: "人が投票済み",
      ruleExplanationF: "この投票は",
      ruleExplanationB: "で集計されました。",
      details: "詳細",
      aboutVotingMethods: "各投票ルールの詳細を読む"
    },
    roomTemplate: {
      loading: "読み込み中...",
      notConnected: "データベースに接続できません。",
      noResults: "検索結果がありません。",
      closedRoom: "このルームは非公開です。"
    },
    shareTemplate: {
      createdRoom: "ルームを作成しました。",
      explanation: "ルームのタイトルを検索する、QRコードを読み取る、またはリンクのURLにアクセスすることで投票に参加できます。",
      title: "タイトル",
      qrCode: "QRコード",
      link: "リンク"
    },
    suggestTemplate: {
      helpChoosing: "投票ルールの選択を手伝います。",
      skip: "この工程をスキップ",
      question: "あなたが作ろうとしている投票ではどんな条件が望ましいですか？",
      suggestedRule: "おすすめの投票ルール",
      createWith: "この決め方で投票を作成",
      createWithout: "決め方を保留にして投票を作成"
    },
    voteTemplate: {
      loading: "読み込み中...",
      notConnected: "データベースに接続できません。",
      sending: "送信中",
      send: "送信"
    }
  },
  rules: {
    borda: {
      score: "点"
    },
    majorityRule: {
      score: "票"
    },
    defaultCommonLanguage: [
      "素晴らしい",
      "非常に良い",
      "良い",
      "容認",
      "不十分",
      "失格"
    ]
  },
  ruleDisplayNames: {
    majorityRule: "多数決",
    bordaRule: "ボルダルール",
    condorcetRule: "コンドルセ・ヤングの最尤法",
    majorityJudgement: "Majority Judgement"
  },
  ruleExplanations: {
    majorityRule: "投票者は一番良いと思う候補を一つ選びます。",
    bordaRule: "候補が３つ以上の時に使えます。例えば３択の時、１番良いと思う候補に３点、２番目に２点、３番目に１点を加算します。勝者は満場一致に最も近いものになります。",
    condorcetRule: "候補が３つ以上の時に使えます。総当たり戦を元に確率の計算を行います。勝者は他の候補との一騎打ちで必ず勝利します。",
    majorityJudgement: "各候補に対して絶対評価で投票し、中央値をその候補の評価とします。"
  },
  ruleSuggestions: {
    majorityRule: "一部の人から熱狂的に支持されている候補を選びたい",
    bordaRule: "できるだけ満場一致に近い候補を選びたい",
    condorcetRule: "勝者が他の候補との１対１の比較で優位であることを保証したい",
    majorityJudgement: "わざと極端な評価をするような票に左右されにくい決め方にしたい"
  }
}

export default ja