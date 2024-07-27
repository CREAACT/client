"use client"


import { $mode, setMode } from '@/context/mode'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

export const useTheme = () => {
  const mode = useUnit($mode)

  const toggleTheme = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', JSON.stringify('light'))
      setMode('light')
    } else {
      localStorage.setItem('mode', JSON.stringify('dark'))
      setMode('dark')
    }
  }

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem('mode') as string)

    if (localTheme) {
      setMode(localTheme)
    }
  }, [])

  return { toggleTheme }
}