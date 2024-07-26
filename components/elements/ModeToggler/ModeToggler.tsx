import { useStore } from 'effector-react'
import { useEffect } from 'react'

import styles from '@/styles/auth/index.module.scss'
import { useTheme } from '@/hooks/useTheme'
import { $mode } from '@/components/context/mode'

const ModeToggler = () => {
  const { toggleTheme } = useTheme()
  const mode = useStore($mode)

  const handleToggleMode = () => {
    toggleTheme()
    document.body.classList.toggle('dark_mode')
  }

  useEffect(() => {
    document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body')
  }, [mode])

  return (
    <div className={styles.theme}>
      <input
        className={styles.theme__input}
        type="checkbox"
        checked={mode === 'light'}
        onChange={handleToggleMode}
      />
    </div>
  )
}

export default ModeToggler