import React from 'react'
import { useRouter } from 'next/router'
import CreateTemplate from '../components/templates/CreateTemplate'
import { useAuthenticate } from '../hooks/auth'

const CreatePage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()

  const toNewRoom = () => {
    router.push("/create/new")
  }

  return (
    <CreateTemplate
      user={user}
      toNewRoom={toNewRoom}
    />
  )
}

export default CreatePage