import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import Button from '../../components/atoms/button'
import Spacer from '../../components/atoms/spacer'
import NewPageCard from '../../components/blocks/NewPageCard'
import { useAuthenticate } from '../../hooks/auth'
import { defaultCoommonLanguage, ruleNames } from '../../types/rules'
import { Room } from '../../types/Room.type'
import { db } from '../../lib/firebase'
import { useRecoilState } from 'recoil'
import { createdRoomIdsState, hasNoUserDocState } from '../../recoil/atom'

const NewPage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const [isSendEnabled, setIsSendEnabled] = useState<boolean>(false)
  const [isSendClicked, setIsSendClicked] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [shouldChangeTitle, setShouldChangeTitle] = useState<boolean>(false)
  const [hasAddedExplanation, setHasAddedExplanation] = useState<boolean>(false)
  const [explanation, setExplanation] = useState<string>("")
  const [isAddOptionEnabled, setIsAddOptionEnabled] = useState<boolean>(true)
  const [options, setOptions] = useState<string[]>([""])
  const [selectedRule, setSelectedRule] = useState<string>("")
  const [isAddEvaluationVocabularyEnabled, setIsAddEvaluationVocabularyEnabled] = useState<boolean>(true)
  const [commonLanguage, setCommonLanguage] = useState<string[]>(defaultCoommonLanguage)
  const [hasNoUserDoc, setHasNoUserDoc] = useRecoilState(hasNoUserDocState)
  const [createdRoomIds, setCreatedRoomIds] = useRecoilState(createdRoomIdsState)
  const didSetCreatedRoomsRef = useRef(false)
  const didSendRef = useRef(false)

  //Set attendedRoomIds
  useEffect(() => {
    if (user) {
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
            }
          }).catch((error) => {
            console.error("Error getting documents: ", error)
            // toError()
          })
        }

        getCreatedRoomIds()
      }
    }
  }, [user])

  //Set isSendEnabled
  useLayoutEffect(() => {
    setIsSendEnabled(false)
    if (title === "") { return }
    if (validArray(options).length === 0) { return }
    if (selectedRule === "") { return }
    if (validArray(commonLanguage).length === 0) { return }
    setIsSendEnabled(true)
  }, [title, explanation, options, selectedRule, commonLanguage])

  //Set isAddOptionEnabled
  useLayoutEffect(() => {
    if (options[options.length - 1] === "") {
      setIsAddOptionEnabled(false)
    } else {
      setIsAddOptionEnabled(true)
    }
  }, [options])

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

    const roomData: Room = {
      title: title,
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
        setCreatedRoomIds(newCreatedRoomIds)

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
      }

      const sendData = async () => {
        db.collection("rooms").where("title", "==", title).limit(1)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              didSendRef.current = true
              setShouldChangeTitle(false)
              sendRoomData(docRef, roomData).then(() => {
                sendCreation(docRef).then(() => {
                  console.log("To share")
                  //TODO
                  // toShare()
                })
              })
            } else {
              setShouldChangeTitle(true)
              setIsSendClicked(false)
              setIsSendEnabled(true)
              //TODO
              console.log("Title is used")
            }
          })
          .catch((error) => {
            console.error("Error getting documents: ", error)
            // toError()
          })
      }

      sendData()
    }
  }

  const validArray = (array) => {
    return array.filter((item) => (item !== ""))
  }

  const toShare = () => {
    router.push("/create/share")
  }

  return (
    <div css={layoutStyle}>
      <NewPageCard
        title={title}
        onTitleChange={onTitleChange}
        hasAddedExplanation={hasAddedExplanation}
        onAddExplanation={onAddExplanation}
        explanation={explanation}
        onExplanationChange={onExplanationChange}
        isAddOptionEnabled={isAddOptionEnabled}
        onAddOption={onAddOption}
        options={options}
        onOptionsChange={onOptionsChange}
        onRemoveOption={onRemoveOption}
        onRuleSelection={onRuleSelection}
        selectedRule={selectedRule}
        isAddEvaluationBocaburalyEnabled={isAddEvaluationVocabularyEnabled}
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
          ? "送信中"
          : "公開"
        }
      </Button>
      <Spacer y="35px" />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
`

export default NewPage