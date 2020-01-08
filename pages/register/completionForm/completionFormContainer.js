import React from 'react'
import * as yup from 'yup'
import CompletionFormView from './completionFormView'

const CompletionFormContainer = ({ firstName, lastName, submitUserData }) => {
  const completionSchema = yup.object().shape({
    userAgreement: yup.boolean()
      .test(
        "checked",
        "Please accept the user agreement to continue",
        value => value)
  })

  const initialValues = {
    userAgreement: false,
  }

  const onSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(false)
      await submitUserData()
    } catch(error) {
      actions.setSubmitting(false)
      actions.setStatus({ msg: `Unable to create user: ${error}`})
    }
  }

  return <CompletionFormView
    initialValues={initialValues}
    completionSchema={completionSchema}
    onSubmit={onSubmit}
    firstName={firstName}
    lastName={lastName}
  />
}

export default CompletionFormContainer