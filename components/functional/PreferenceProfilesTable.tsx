import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Room } from '../../types/Room.type'
import { PreferenceProfilesFormatted } from '../../types/PreferenceProfiles.type'
import { preferenceProfilesAssumption, preferenceProfilesFormatted } from '../../rules/preferenceProfiles'
import SupportingTextCell from '../ui/SupportingTextCell'
import { dividerColor } from '../../styles/colors'
import { useLocale } from '../../hooks/useLocale'

type Props = {
  roomData: Room,
  personalRanks: number[][]
}

const PreferenceProfilesTable: React.FC<Props> = (props) => {
  const [assumption, setAssumption] = useState<string>("")
  const [preferenceProfiles, setPreferenceProfiles] = useState<PreferenceProfilesFormatted[]>([])
  const { t } = useLocale()
  const localizedString = t.functional.preferenceProfileTable

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
            <th css={obtainedLabelStyle}>{localizedString.nVoters}</th>
            <th css={rankOrderingLabelStyle}>{localizedString.rankOrderings}</th>
          </tr>
          {preferenceProfiles.map((profile, index) => (
            <tr key={index} css={() => rowStyle(index % 2 !== 0)}>
              <td css={obtainedStyle}>{profile.obtained + localizedString.people}</td>
              <td css={rankOrderingStyle}>{profile.rankOrdering}</td>
            </tr>
          ))}
        </table>
      </div>
    </React.Fragment>
  )
}

const containerStyle = css`
  padding: 5px 8px;
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