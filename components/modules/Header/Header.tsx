import styles from '@/styles/header/index.module.scss'
import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'

const Header = () => (
  <header className={styles.header}>
    <HeaderTop />
    <HeaderBottom />
  </header>
)

export default Header