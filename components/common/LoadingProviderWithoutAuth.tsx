import React from 'react'
import Message from '../ui/Message'
import { useLocale } from '../../i18n/useLocale'
import T_COMMON from '../../locales/common'

type Props = {
  isLoading: boolean
  children: React.ReactNode
}

const LoadingProviderWithoutAuth: React.FC<Props> = (props) => {
  const t = useLocale(T_COMMON)

  if (props.isLoading) {
    return (
      <Message isLoading={true}>
        {t.LOADING}
      </Message>
    )
  }

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default LoadingProviderWithoutAuth