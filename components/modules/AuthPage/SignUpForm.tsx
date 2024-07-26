'use client';

import { useForm } from 'react-hook-form'

import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { IInputs } from '@/types/auth'
import { singUpFx } from '@/pages/api/auth'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import NameInput from '@/components/elements/AuthPage/NameInput'
import { showAuthError } from '@/utils/errors'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()


  const onSubmit = async (data: IInputs) => {
    try {
      const userData = await singUpFx({
        url: '/users/signup',
        username: data.name,
        password: data.password,
        email: data.email,
      })

      if (!userData) {
        return
      }

      resetField('email')
      resetField('name')
      resetField('password')
      switchForm()
    } catch (error) {
      showAuthError(error)
    } finally {
    }
  }

  return (
    <form
      className={`${styles.form} `}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title}`}>
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
     SIGN UP
       </button>
    </form>
  )
}

export default SignUpForm