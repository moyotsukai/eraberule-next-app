import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Room } from '../../types/Room.type'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { createdRoomIdsState, hasNoUserDocState, recentlyCreatedRoomTitleState, suggestedRuleState } from '../../states/atoms'
import { anySpaceToSingleSpace } from '../../utils/anySpaceToSingleSpace'
import { removeBlanks } from '../../utils/removeBlanks'
import Button from '../ui/Button'
import Spacer from '../ui/Spacer'
import NewPageCard from '../functional/NewPageCard'
import { css } from '@emotion/react'
import { useAuth } from '../../model/auth/useAuth'
import SignInProvider from '../common/SignInProvider'
import { useCreatedRoomIds } from '../../model/room/useCreatedRoomIds'
import { useLocale } from '../../i18n/useLocale'
import { T_NEW_PAGE } from '../../locales/newPage'
import { T_RULES } from '../../locales/rules'
import { slashToArray } from '../../utils/slashToArray'
import { RuleKeyName, RULE_NAMES } from '../../rules/ruleNames'
import { KEYS } from '../../model/firestore/key'
import { asyncTask } from '../../utils/asyncTask'
import { setRoomDocData } from '../../model/firestore/setRoomDocData'
import { userDocDataToFirebase } from '../../model/firestore/dataConverter'
import { setUserDocData } from '../../model/firestore/setUserDocData'
import { updateUserDocData } from '../../model/firestore/updateUserDocData'
import { getRoomDataByTitle } from '../../model/firestore/getRoomDataByTitle'

const NewPage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { createdRoomIds } = useCreatedRoomIds(user)
  const setCreatedRoomIds = useSetRecoilState(createdRoomIdsState)
  const [commonLanguage, setCommonLanguage] = useState<string[]>([])
  const suggestedRule = useRecoilValue(suggestedRuleState)
  const { t, language } = useLocale(T_NEW_PAGE)
  const t_rules = useLocale(T_RULES).t
  const [selectedRule, setSelectedRule] = useState<RuleKeyName | null>(null)
  const [hasNoUserDoc, setHasNoUserDoc] = useRecoilState(hasNoUserDocState)

  //Set created room ids state globally
  useEffect(() => {
    setCreatedRoomIds(createdRoomIds)
  }, [createdRoomIds])

  //Set initial localized commonLanguage
  useEffect(() => {
    const defaultCommonLanguage = slashToArray(t_rules.DEFAULT_COMMON_LANGUAGE)
    setCommonLanguage(defaultCommonLanguage)
  }, [language])


  const onSend = () => {
    if (_hasFetched.current) { return }
    setIsSendClicked(true)
    setIsSendEnabled(false)

    asyncTask(async () => {
      const roomData = generateRoomData()

      //Check if title already exists
      const alreadyExistRoomData = await getRoomDataByTitle(roomData.title)

      if (alreadyExistRoomData !== null) {
        setShouldChangeTitle(true)
        setIsSendClicked(false)
        setIsSendEnabled(true)
        scrollToTop()
      } else {
        _hasFetched.current = true
        setShouldChangeTitle(false)

        //Send room data
        const docId = await setRoomDocData({ roomData: roomData })

        //Send creation
        const newCreatedRoomIds = [docId, ...(createdRoomIds ?? [])]
        const userDocData = hasNoUserDoc
          ? userDocDataToFirebase({
            attendedRooms: [],
            createdRooms: newCreatedRoomIds,
          })
          : userDocDataToFirebase({
            createdRooms: newCreatedRoomIds
          })
        if (hasNoUserDoc) {
          await setUserDocData({ userId: user.uid, data: userDocData })
          setHasNoUserDoc(false)
        } else {
          await updateUserDocData({ userId: user.uid, data: userDocData })
        }

        //Set created room ids globally
        setCreatedRoomIds(newCreatedRoomIds)
        setRecentlyCreatedRoomTitle(roomData.title)

        //Finally
        toShare(roomData)
      }
    })
  }



  //------以下未リファクタリング
  const [isSendEnabled, setIsSendEnabled] = useState<boolean>(false)
  const [isSendClicked, setIsSendClicked] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [shouldChangeTitle, setShouldChangeTitle] = useState<boolean>(false)
  const [hasAddedExplanation, setHasAddedExplanation] = useState<boolean>(false)
  const [explanation, setExplanation] = useState<string>("")
  const [isAddOptionEnabled, setIsAddOptionEnabled] = useState<boolean>(true)
  const [options, setOptions] = useState<string[]>([""])
  const [isOptionsExceed, setIsOptionsExceed] = useState<boolean>(false)
  const [isAddEvaluationVocabularyEnabled, setIsAddEvaluationVocabularyEnabled] = useState<boolean>(true)
  const _hasFetched = useRef<boolean>(false)
  const setRecentlyCreatedRoomTitle = useSetRecoilState(recentlyCreatedRoomTitleState)

  //Set initial selectedRule
  useEffect(() => {
    if (suggestedRule !== null) {
      setSelectedRule(suggestedRule)
    }
  }, [])

  //Set isSendEnabled
  useLayoutEffect(() => {
    setIsSendEnabled(false)
    if (removeBlanks(title) === "") { return }
    if (validArray(options).length === 0) { return }
    if (isOptionsExceed) { return }
    if (selectedRule === null) { return }
    if (validArray(commonLanguage).length === 0) { return }
    setIsSendEnabled(true)
  }, [title, explanation, options, isOptionsExceed, selectedRule, commonLanguage])

  //Set isAddOptionEnabled
  useLayoutEffect(() => {
    if (options[options.length - 1] === "") {
      setIsAddOptionEnabled(false)
    } else {
      setIsAddOptionEnabled(true)
    }
  }, [options])

  //Set isOptionsExceed
  useLayoutEffect(() => {
    setIsOptionsExceed(false)
    if (options.length > 10) {
      if (selectedRule === "BORDA_COUNT_METHOD") {
        setIsOptionsExceed(true)
      }
      if (selectedRule === "CONDORCET_METHOD") {
        setIsOptionsExceed(true)
      }
    }
  }, [options, selectedRule])

  //Set isAddEvaluationVocabularyEnabled
  useLayoutEffect(() => {
    if (commonLanguage[commonLanguage.length - 1] === "") {
      setIsAddEvaluationVocabularyEnabled(false)
    } else {
      setIsAddEvaluationVocabularyEnabled(true)
    }
  }, [commonLanguage])

  const onTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const onAddExplanation = () => {
    setHasAddedExplanation(true)
  }

  const onExplanationChange = (event) => {
    setExplanation(event.target.value)
  }

  const onAddOption = () => {
    const newOptions = validArray(options)
    setOptions([...newOptions, ""])
  }

  const onOptionsChange = (event, index) => {
    const newOptions = [...options]
    newOptions[index] = event.target.value
    setOptions(newOptions)
  }

  const onRemoveOption = (index) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const onRuleSelection = (ruleName: RuleKeyName) => {
    if (selectedRule === null) {
      setSelectedRule(ruleName)
    } else {
      if (ruleName === selectedRule) {
        setSelectedRule(null)
      } else {
        setSelectedRule(ruleName)
      }
    }
  }

  const onAddEvaluationVocabulary = () => {
    const newCommonLanguage = validArray(commonLanguage)
    setCommonLanguage([...newCommonLanguage, ""])
  }

  const onCommonLanguageChange = (event, index) => {
    const newCommonLanguage = [...commonLanguage]
    newCommonLanguage[index] = event.target.value
    setCommonLanguage(newCommonLanguage)
  }

  const onRemoveEvaluationVocabulary = (index) => {
    const newCommonLanguage = [...commonLanguage]
    newCommonLanguage.splice(index, 1)
    setCommonLanguage(newCommonLanguage)
  }

  const generateRoomData = () => {
    const validOptions = validArray(options)
    const validCommonLanguage = validArray(commonLanguage)
    setOptions(validOptions)
    setCommonLanguage(validCommonLanguage)
    const replacedTitle = anySpaceToSingleSpace(title)
    const databaseRuleName = RULE_NAMES[selectedRule]

    const roomData: Room = {
      title: replacedTitle,
      explanation: explanation,
      options: validOptions,
      rule: databaseRuleName,
      state: "ongoing",
      senderId: user.uid,
      date: new Date()
    }
    if (selectedRule === "MAJORITY_JUDGEMENT") {
      roomData[KEYS.COMMON_LANGUAGE] = validCommonLanguage
    }

    return roomData
  }

  const validArray = (array) => {
    return array.filter((item) => (item !== ""))
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const toShare = (roomData: Room) => {
    router.push({
      pathname: "/create/share",
      query: { title: roomData.title }
    })
  }

  const toError = () => {
    router.push({
      pathname: "/error"
    })
  }

  return (
    <SignInProvider>
      <div css={layoutStyle}>
        <NewPageCard
          title={title}
          onTitleChange={onTitleChange}
          shouldChangeTitle={shouldChangeTitle}
          hasAddedExplanation={hasAddedExplanation}
          onAddExplanation={onAddExplanation}
          explanation={explanation}
          onExplanationChange={onExplanationChange}
          isAddOptionEnabled={isAddOptionEnabled}
          onAddOption={onAddOption}
          options={options}
          onOptionsChange={onOptionsChange}
          onRemoveOption={onRemoveOption}
          isOptionsExceed={isOptionsExceed}
          onRuleSelection={onRuleSelection}
          selectedRule={selectedRule}
          isAddEvaluationVocabularyEnabled={isAddEvaluationVocabularyEnabled}
          onAddEvaluationVocabulary={onAddEvaluationVocabulary}
          commonLanguage={commonLanguage}
          onCommonLanguageChange={onCommonLanguageChange}
          onRemoveEvaluationVocabulary={onRemoveEvaluationVocabulary}
        />

        <Button
          onClick={onSend}
          isEnabled={isSendEnabled}
          isLoading={isSendClicked}
        >
          {isSendClicked
            ? t.SENDING
            : t.SUBMIT
          }
        </Button>
        <Spacer y="35px" />
      </div>
    </SignInProvider>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
  padding: 0 15px;
`

export default NewPage