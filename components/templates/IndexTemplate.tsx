import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../ui/Message'
import SearchBox from '../functional/SearchBox'
import SupportingTextCell from '../ui/SupportingTextCell'
import { supportingTextColor } from '../../styles/colors'
import { useLocale } from '../../hooks/useLocale'

type Props = {
  user: User | undefined | null
  enteredTitle: string
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOnClick: () => void
}

const IndexTemplate: React.FC<Props> = (props) => {
  const { t } = useLocale()
  const localizedString = t.templates.indexTemplate

  if (props.user === undefined) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          {localizedString.loading}
        </Message>
      </div>
    )
  }

  if (props.user === null) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          {localizedString.notConnected}
        </Message>
      </div>
    )
  }

  return (
    <div css={layoutStyle}>
      <Message isLoading={false}>
        {localizedString.searchRooms}
      </Message>
      <SearchBox
        value={props.enteredTitle}
        placeholder={localizedString.enterTitle}
        onChange={props.handleTitleChange}
        onEnterKey={props.handleOnClick}
      />
      <div css={spacerStyle} />
      <SupportingTextCell textAlign="center">
        {localizedString.agreeToTermsF}
        <a
          href="https://www.eraberule.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          css={linkStyle}
        >
          {localizedString.terms}
        </a>
        {localizedString.agreeToTermsB}
      </SupportingTextCell>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`
const spacerStyle = css`
  height: 38vh;
`
const linkStyle = css`
  color: ${supportingTextColor};
  text-decoration: underline;
`

export default IndexTemplate