import React from 'react'
import { useAuth } from '../../Firebase/context'
import LoginView from './loginView'

const LoginContainer = () => {
  const auth = useAuth()

  const initialValues = {
    email: '',
    password: '',
  }

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(false)
    try {
      const { email, password } = values
      await auth.signIn(email, password)
      history.push("/")
    } catch(error) {
      actions.setErrors(error)
      actions.setStatus({ msg: "Invalid email or password, please try again"})
    }
  }

  return <LoginView
    initialValues={initialValues}
    onSubmit={onSubmit}
  />
}

export default LoginContainer