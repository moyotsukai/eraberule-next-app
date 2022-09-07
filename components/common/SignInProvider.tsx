import React, { useEffect } from 'react'
import { useAuth } from '../../auth/useAuth'
import { signIn } from '../../auth/auth'
import Message from '../ui/Message'
import { useLocale } from '../../locales/useLocale'
import T_COMMON from '../../locales/common'

type Props = {
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

  if (isLoadingUser) {
    return (
      <Message isLoading={true}>
        {t.LOADING}
      </Message>
    )
  }

  if (user === null) {
    return (
      <Message isLoading={false}>
        {t.NOT_CONNECTED}
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