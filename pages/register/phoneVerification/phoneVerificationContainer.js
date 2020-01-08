import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useFirebase } from '../../../Firebase/context'
import PhoneVerificationView from './phoneVerificationView'

const verificationSchema = yup.object().shape({
  sameNumber: yup.boolean(),
  confirmationCode: yup.string()
    .required("Please input the confimation code")
    .length(6, "Please input the 6 digit confirmation code"),
  newNumber: yup.string()
    .when("sameNumber", {
      is: false,
      then: yup.string()
        .required("Please fill in this section")
        .length(12, "Please input a canadian phone number")
    })
})

const initialValues = {
  confirmationCode: "",
  newNumber: "",
  sameNumber: true,
}

const PhoneVerificationContainer = ({ sendVerificationCode, resendVerificationCode, confirmVerificationCode, goToPage }) => {
  const firebase = useFirebase()

  useEffect(() => {
    window.recaptchaVerifier = new firebase.recaptcha.RecaptchaVerifier('sendcode', {
      size: 'invisible',
    })
    window.recaptchaVerifier.render().then(widgetId => {
      window.recaptchaWidgetId = widgetId
    })

    return () => window.recaptchaVerifier.clear()
  }, [])

  const tryAnotherNumber = setFieldValue => {
    setFieldValue("newNumber", "")
    setFieldValue("sameNumber", false)
  }

  const sendCode = async (values, setStatus, setFieldValue) => {
    try {
      await sendVerificationCode(values.newNumber)
      setStatus({})
      setFieldValue("sameNumber", true)
    } catch(error) {
      setStatus({msg: `unable to confirm phonenumber: ${error}`})
    }
  }

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(false)
    try {
      await confirmVerificationCode(values.confirmationCode)
      goToPage(1)
    } catch(error) {
      actions.setStatus({msg: `Unable to confirm phonenumber: ${error}`})
    }
  }

  return <PhoneVerificationView
      initialValues={initialValues}
      verificationSchema={verificationSchema}
      onSubmit={onSubmit}
      sendCode={sendCode}
      tryAnotherNumber={tryAnotherNumber}
      resendVerificationCode={resendVerificationCode}
    />
}

export default PhoneVerificationContainer