import React, { useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { roomDataState } from '../../states/atoms'
import { useSetRecoilState } from 'recoil'
import { anySpaceToSingleSpace } from '../../utils/anySpaceToSingleSpace'
import { removeBlanks } from '../../utils/removeBlanks'
import SignInProvider from '../common/SignInProvider'
import Message from '../ui/Message'
import SupportingTextCell from '../ui/SupportingTextCell'
import { useLocale } from '../../i18n/useLocale'
import { T_INDEX_PAGE } from '../../locales/indexPage'
import { supportingTextColor } from '../../styles/colors'
import SearchBox from '../functional/SearchBox'
import { useAuth } from '../../auth/useAuth'
import VotePageCard from '../functional/VotePageCard'
import Button from '../ui/Button'
import Spacer from '../ui/Spacer'

const VotePage: React.FC = () => {
  const user = useAuth()
  const router = useRouter()

  return (
    <SignInProvider>
      <div css={layoutStyle}>
        <VotePageCard isEnabled={!props.isClicked} />

        <Button
          onClick={props.sendVote}
          isEnabled={props.isEnabled}
          isLoading={props.isClicked}
        >
          {props.isClicked ? localizedString.sending : localizedString.send}
        </Button>
        <Spacer y="35px" />
      </div>
    </SignInProvider>
  )
}

const layoutStyle = css`
  padding: 0 15px;
  `

export default VotePage