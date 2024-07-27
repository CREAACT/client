'use client';

import { setUser } from '@/context/user'
import { checkUserAuthFx } from '@/pages/api/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {useUnit} from "effector-react/effector-react.umd";

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [checkUserAuth, setUserStatus] = useUnit([checkUserAuthFx, setUser])
  const [shouldLoadContent, setShouldLoadContent] = useState(false)
  const router = useRouter()
  const shouldCheckAuth = useRef(true)

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const user = await checkUserAuth('/users/login-check')

    if (isAuthPage) {
      if (!user) {
        setShouldLoadContent(true)
        return
      }

      router.push('/dashboard')
      return
    }

    if (user) {
      setUserStatus(user)
      setShouldLoadContent(true)
      return
    }

    router.push('/')
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck