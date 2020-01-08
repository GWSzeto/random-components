import React, { useState } from 'react'
import * as yup from 'yup'
import { useAuth } from '../../Firebase/context'
import PasswordResetSent from './passwordResetSent'
import SendPasswordReset from './sendPasswordReset'

const PasswordResetContainer = () => {
  const [resetSent, setResetSent] = useState(false)
  const auth = useAuth()

  const initialValues = {
    email: '',
  }

  const passwordResetSchema = yup.object().shape({
    email: yup.string()
      .email()
      .required("Please fill out this field")
  })

  const onSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(false)
      const { email } = values
      await auth.sendPasswordResetEmail(email)
      setResetSent(true)
    } catch(error) {
      actions.setSubmitting(false)
      actions.setStatus({ msg: `unable to reset password: ${error}` })
    }
  }

  if (resetSent) {
    return <PasswordResetSent />
  } else {
    return <SendPasswordReset
      initialValues={initialValues}
      passwordResetSchema={passwordResetSchema}
      onSubmit={onSubmit}
    />
  }
}

export default PasswordResetContainer