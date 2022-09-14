import React, { useEffect } from 'react'
import { useAuth } from '../../auth/useAuth'
import { signIn } from '../../auth/auth'
import Message from '../ui/Message'
import { useLocale } from '../../i18n/useLocale'
import { T_COMMON } from '../../locales/common'

type Props = {
  isLoading?: boolean
  hasNoResults?: boolean
  isClosedRoom?: boolean
  children: React.ReactNode
}

const SignInProvider: React.FC<Props> = (props) => {
  const { user, isLoadingUser } = useAuth()
  const t = useLocale(T_COMMON)

  useEffect(() => {
    if (!user) {
      signIn()
    }
  }, [])

  if (isLoadingUser || (props.isLoading ?? false)) {
    return (
      <Message isLoading={true}>
        {t.LOADING}
      </Message>
    )
  }

  if (user === null) {
    return (
      <Message>
        {t.NOT_CONNECTED}
      </Message>
    )
  }

  if (props.hasNoResults ?? false) {
    return (
      <Message>
        {t.NO_RESULTS}
      </Message>
    )
  }

  if (props.isClosedRoom ?? false) {
    return (
      <Message>
        {t.CLOSED_ROOM}
      </Message>
    )
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default SignInProvider