import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Room } from '../../types/Room.type'
import { PreferenceProfilesFormatted } from '../../types/PreferenceProfiles.type'
import { preferenceProfilesAssumption, preferenceProfilesFormatted } from '../../rules/preferenceProfiles'
import SupportingTextCell from '../ui/SupportingTextCell'
import { log } from '../../utils/log'
import { dividerColor } from '../../styles/colors'

type Props = {
  roomData: Room,
  personalRanks: number[][]
}

const PreferenceProfilesTable: React.FC<Props> = (props) => {
  const [assumption, setAssumption] = useState<string>("")
  const [preferenceProfiles, setPreferenceProfiles] = useState<PreferenceProfilesFormatted[]>([])

  //Set preferenceProfilesAssumption, preferenceProfiles
  useEffect(() => {
    setAssumption(preferenceProfilesAssumption(props.roomData))
    setPreferenceProfiles(preferenceProfilesFormatted(props.roomData, props.personalRanks))
  }, [])

  return (
    <React.Fragment>
      <SupportingTextCell textAlign="left">
        {assumption}
      </SupportingTextCell>
      <div css={containerStyle}>
        <table css={tableStyle}>
          <tr>
            <th css={obtainedLabelStyle}>人数</th>
            <th css={rankOrderingLabelStyle}>選好順序</th>
          </tr>
          {preferenceProfiles.map((profile, index) => (
            <tr key={index} css={() => rowStyle(index % 2 !== 0)}>
              <td css={obtainedStyle}>{profile.obtained}人</td>
              <td css={rankOrderingStyle}>{profile.rankOrdering}</td>
            </tr>
          ))}
        </table>
      </div>
    </React.Fragment>
  )
}

const containerStyle = css`
  padding: 5px 10px;
`
const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
`
const obtainedLabelStyle = css`
  background-color: #f2f5ff;
  width: 70px;
  text-align: center;
  border: solid 1px ${dividerColor};
`
const rankOrderingLabelStyle = css`
  background-color: #f2f5ff;
  min-width: 200px;
  text-align: center;
  border: solid 1px ${dividerColor};
`
const rowStyle = (hasColor: boolean) => css`
  background-color: ${hasColor ? "#fafbff" : "transparent"};
`
const obtainedStyle = css`
  width: 70px;
  text-align: center;
  border: solid 1px ${dividerColor};
`
const rankOrderingStyle = css`
  min-width: 200px;
  text-align: center;
  border: solid 1px ${dividerColor};
`

export default PreferenceProfilesTable