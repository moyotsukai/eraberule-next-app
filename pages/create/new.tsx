import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthenticate } from '../../hooks/auth'
import { defaultCoommonLanguage, ruleNames } from '../../types/rules'
import { Room } from '../../types/Room.type'
import { db } from '../../lib/firebase'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { createdRoomIdsState, hasNoUserDocState, recentlyCreatedRoomTitleState, suggestedRuleState } from '../../states/atoms'
import NewTemplate from '../../components/templates/NewTemplate'
import { anySpaceToSingleSpace } from '../../utils/anySpaceToSingleSpace'
import { useLocale } from '../../locales/useLocale'

const NewPage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const suggestedRule = useRecoilValue(suggestedRuleState)
  const [isSendEnabled, setIsSendEnabled] = useState<boolean>(false)
  const [isSendClicked, setIsSendClicked] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [shouldChangeTitle, setShouldChangeTitle] = useState<boolean>(false)
  const [hasAddedExplanation, setHasAddedExplanation] = useState<boolean>(false)
  const [explanation, setExplanation] = useState<string>("")
  const [isAddOptionEnabled, setIsAddOptionEnabled] = useState<boolean>(true)
  const [options, setOptions] = useState<string[]>([""])
  const [isOptionsExceed, setIsOptionsExceed] = useState<boolean>(false)
  const [selectedRule, setSelectedRule] = useState<string>("")
  const [isAddEvaluationVocabularyEnabled, setIsAddEvaluationVocabularyEnabled] = useState<boolean>(true)
  const [commonLanguage, setCommonLanguage] = useState<string[]>(defaultCoommonLanguage)
  const [hasNoUserDoc, setHasNoUserDoc] = useRecoilState(hasNoUserDocState)
  const [createdRoomIds, setCreatedRoomIds] = useRecoilState(createdRoomIdsState)
  const didSetCreatedRoomsRef = useRef(false)
  const didSendRef = useRef(false)
  const setRecentlyCreatedRoomTitle = useSetRecoilState(recentlyCreatedRoomTitleState)
  const { t, locale } = useLocale()
  const localizedString = t.rules

  //Set createdRoomIds, hasNoUserDoc, recentlyCreatedRoomTitle
  useEffect(() => {
    if (!user) { return }
    if (createdRoomIds !== undefined) { return }
    if (didSetCreatedRoomsRef.current === false) {
      didSetCreatedRoomsRef.current = true

      const getCreatedRoomIds = async () => {
        const userId = user.uid
        db.collection("users").doc(userId).get().then((doc) => {
          if (doc.exists) {
            const docData = doc.data()
            const roomIds = docData.createdRooms === undefined ? [] : docData.createdRooms
            setCreatedRoomIds(roomIds)
            setHasNoUserDoc(false)
          } else {
            setCreatedRoomIds([])
            setHasNoUserDoc(true)
            setRecentlyCreatedRoomTitle(null)
          }
        }).catch((error) => {
          console.error("Error getting documents: ", error)
          toError()
        })
      }

      getCreatedRoomIds()
    }
  }, [user])

  //Set initial selectedRule
  useEffect(() => {
    if (suggestedRule !== null) {
      setSelectedRule(suggestedRule)
    }
  }, [])

  //Set initial localized commonLanguage
  useEffect(() => {
    setCommonLanguage(localizedString.defaultCommonLanguage)
  }, [locale])

  //Set isSendEnabled
  useLayoutEffect(() => {
    setIsSendEnabled(false)
    if (title === "") { return }
    if (validArray(options).length === 0) { return }
    if (isOptionsExceed) { return }
    if (selectedRule === "") { return }
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
      if (selectedRule === ruleNames.bordaRule) {
        setIsOptionsExceed(true)
      }
      if (selectedRule === ruleNames.condorcetRule) {
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

  const onRuleSelection = (ruleName) => {
    if (selectedRule === "") {
      setSelectedRule(ruleName)
    } else {
      if (ruleName === selectedRule) {
        setSelectedRule("")
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

  const disableUi = () => {
    setIsSendClicked(true)
    setIsSendEnabled(false)
  }

  const generateRoomData = () => {
    const validOptions = validArray(options)
    const validCommonLanguage = validArray(commonLanguage)
    setOptions(validOptions)
    setCommonLanguage(validCommonLanguage)
    const replacedTitle = anySpaceToSingleSpace(title)

    const roomData: Room = {
      title: replacedTitle,
      explanation: explanation,
      options: validOptions,
      rule: selectedRule,
      state: "ongoing",
      senderId: user.uid,
      date: new Date()
    }
    if (selectedRule === ruleNames.majorityJudgement) {
      roomData["commonLanguage"] = validCommonLanguage
    }

    return roomData
  }

  const onSend = () => {
    if (didSendRef.current === false) {
      disableUi()

      const roomData = generateRoomData()
      const docRef = db.collection("rooms").doc()

      const sendRoomData = async (docRef, roomData) => {
        docRef.set(roomData)
      }

      const sendCreation = async (docRef) => {
        const newRoomId = docRef.id
        const userId = user.uid
        const roomIds = createdRoomIds === undefined ? [] : createdRoomIds
        const newCreatedRoomIds = [
          newRoomId,
          ...roomIds
        ]

        const userRef = db.collection("users").doc(userId)
        if (hasNoUserDoc) {
          userRef.set({
            attendedRooms: [],
            createdRooms: newCreatedRoomIds,
            date: new Date()
          })
        } else {
          userRef.update({
            createdRooms: newCreatedRoomIds,
            date: new Date()
          })
        }
        setCreatedRoomIds(newCreatedRoomIds)
        setRecentlyCreatedRoomTitle(roomData.title)
      }

      const sendData = async () => {
        db.collection("rooms").where("title", "==", roomData.title).limit(1)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              didSendRef.current = true
              setShouldChangeTitle(false)
              sendRoomData(docRef, roomData).then(() => {
                sendCreation(docRef).then(() => {
                  toShare(roomData)
                })
              })
            } else {
              setShouldChangeTitle(true)
              setIsSendClicked(false)
              setIsSendEnabled(true)
              scrollToTop()
            }
          })
          .catch((error) => {
            console.error("Error getting documents: ", error)
            toError()
          })
      }

      sendData()
    }
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
    <NewTemplate
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
      onSend={onSend}
      isSendEnabled={isSendEnabled}
      isSendClicked={isSendClicked}
    />
  )
}

export default NewPage