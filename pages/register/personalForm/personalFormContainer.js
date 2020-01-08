import React, { useEffect } from 'react'
import * as yup from 'yup'
import moment from 'moment'
import PersonalFormView from './personalFormView'
import { useFirebase } from '../../../Firebase/context'

const personalSchema = yup.object().shape({
  birthdate: yup.string()
    .required("Please fill in this section")
    .length(10, "Please input a proper birthdate")
    .test(
      "over19",
      "Must be over 16 years of age",
      value => value && (moment().year() - parseInt(value.slice(6, 10))) >= 16
    ),
  phoneNumber: yup.string()
    .required("Please fill in this section")
    .min(12, "Please input a proper canadian phone number"),
  sex: yup.string()
    .required("Please select a field"),
  addressLine1: yup.string()
    .required("Please fill in this section"),
  sameAddress: yup.boolean(),
  shippingAddressLine1: yup.string()
    .when("sameAddress",  {
      is: false,
      then: yup.string().required("Please fill in this section")
    })
})

const initialValues = {
  birthdate: "",
  sex: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  shippingAddressLine1: "",
  shippingAddressLine2: "",
  referral: "",
  sameAddress: true,
}

const PersonalFormContainer = ({ updateUserData, goToPage, sendVerificationCode }) => {
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

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(false)
    const { sameAddress, phoneNumber } = values
    try {
      await sendVerificationCode(phoneNumber)
      if (sameAddress) {
        updateUserData({
          ...values,
          shippingAddressLine1: values.addressLine1,
          shippingAddressLine2: values.addressLine2,
        })
      } else {
        updateUserData(values)
      }
      goToPage(1)
    } catch(error) {
      actions.setStatus({ msg: `Could not send sms: ${error}`})
    }
  }

  return <PersonalFormView
      initialValues={initialValues}
      personalSchema={personalSchema}
      onSubmit={onSubmit}
    />
}

export default PersonalFormContainer