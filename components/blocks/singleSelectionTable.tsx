import React from 'react'
import { css } from '@emotion/react'
import SingleSelectionCell from '../../components/atoms/singleSelectionCell'
import { useRecoilValue, useRecoilState } from 'recoil'
import { roomDataState, personalRankState } from '../../recoil/atom'

type Props = {
  isEnabled: boolean
}

const SingleSelectionTable: React.FC<Props> = (props) => {
  const roomData = useRecoilValue(roomDataState)
  const [personalRank, setPersonalRank] = useRecoilState(personalRankState)

  //USER INTERATION
  const handleSelection = (index) => {
    if (!props.isEnabled) { return }
    const rank = [...personalRank]
    const selectedOptionIndex = rank.indexOf(1)

    if (selectedOptionIndex === -1) {
      rank[index] = 1
    } else {
      if (selectedOptionIndex === index) {
        rank[index] = 0
      } else {
        rank[selectedOptionIndex] = 0
        rank[index] = 1
      }
    }
    setPersonalRank(rank)
    console.log("personalRank", rank)
  }

  //RETURN
  return (
    <div css={tableStyle}>
      {roomData.options.map((option, index) => (
        <SingleSelectionCell
          text={option}
          onClick={() => handleSelection(index)}
          isSelected={personalRank[index] !== 0}
          key={index} />
      ))}
    </div>
  )
}

const tableStyle = css`
  padding: 0 10px;
`

export default SingleSelectionTable