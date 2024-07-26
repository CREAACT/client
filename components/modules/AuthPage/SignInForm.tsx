import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import NameInput from '@/components/elements/AuthPage/NameInput'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { singInFx } from '@/pages/api/auth'
import { showAuthError } from '@/utils/errors'



const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      await singInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })

      resetField('name')
      resetField('password')
      route.push('/dashboard')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form
      className={`${styles.form} `}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title} `}>
        Войти на сайт
      </h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'SIGN IN'}
      </button>
    </form>
  )
}

export default SignInForm