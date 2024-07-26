/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/header/index.module.scss'
import { $mode } from '@/components/context/mode'
import SearchInput from '@/components/elements/Header/SearchInput'
import CartPopup from './CartPopup/CartPopup'
import { setDisableCart } from '@/components/context/shopping-cart'

const HeaderBottom = () => {
  const isMedia950 = useMediaQuery(950)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/order') {
      setDisableCart(true)
      return
    }

    setDisableCart(false)
  }, [router.pathname])

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <img src="/img/logo.svg" alt="logo" />
              <span
                className={`${styles.header__logo__link__text} ${darkModeClass}`}
              >
                Детали для газовых котлов
              </span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
        </div>
        <div className={styles.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          <CartPopup />
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom