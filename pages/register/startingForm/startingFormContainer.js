import React from 'react'
import * as yup from 'yup'
import { useAuth } from '../../../Firebase/context'
import StartingFormView from './startingFormView'

const StartingFormContainer = ({ updateUserData, goToPage }) => {
  const auth = useAuth()

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }

  const startingSchema = yup.object().shape({
    firstName: yup.string()
      .required("Please fill in this section"),
    lastName: yup.string()
      .required("Please fill in this section"),
    email: yup.string()
      .required("Please fill in this section")
      .email()
      .test(
        'unique-email',
        'This email is already taken, please specify another one',
        async value => !!value && await auth.checkIfEmailDoesNotExist(value)
      ),
    password: yup.string()
      .required("Please fill in this section")
      .min(8, "Password must be at least 8 characters long")
  })

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false)
    updateUserData(values)
    goToPage(1)
  }

  return <StartingFormView 
    initialValues={initialValues} 
    startingSchema={startingSchema}
    onSubmit={onSubmit}
    />
}

export default StartingFormContainer