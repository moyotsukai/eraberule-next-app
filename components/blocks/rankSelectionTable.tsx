import React from 'react'
import { css } from '@emotion/react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { roomDataState, personalRankState } from '../../recoil/atom'
import RankSelectionCell from '../atoms/rankSelectionCell'

type Props = {
  isEnabled: boolean
}

const RankSelectionTable: React.FC<Props> = (props) => {
  const roomData = useRecoilValue(roomDataState)
  const [personalRank, setPersonalRank] = useRecoilState(personalRankState)

  const handleSelection = (index) => {
    if (!props.isEnabled) { return }
    let rank = [...personalRank]
    const largestNum = rank.filter(num => num !== 0).length

    if (rank[index] === 0) {
      rank[index] = largestNum + 1
    } else {
      rank = rank.map((num) => {
        if (num > rank[index]) {
          return num - 1
        } else {
          return num
        }
      })
      rank[index] = 0
    }
    setPersonalRank(rank)
  }

  //UI
  return (
    <div css={tableStyle}>
      {roomData.options.map((option, index) => (
        <RankSelectionCell
          text={option}
          rank={personalRank[index] === 0 ? "" : personalRank[index].toString()}
          onClick={() => handleSelection(index)}
          isSelected={personalRank[index] !== 0}
          key={index}
        />
      ))}
    </div>
  )
}

const tableStyle = css`
  padding: 0 6px;
`

export default RankSelectionTable