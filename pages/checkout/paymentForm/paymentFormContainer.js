import React from 'react'
import * as yup from 'yup'
import { v4 } from 'uuid'
import PaymentFormView from './paymentFormView'

// hooks
import { useFirestore, useFirebase } from '../../../Firebase/context'
import User from '../../../unstated/user'

const PaymentFormContainer = ({ goToPage }) => {
  const firestore = useFirestore()
  const firebase = useFirebase()
  const userId = User.useContainer().user.id

  const initialValues = {
    cardNumber: "",
    nameOnCard: "",
    cardType: "",
    expiryDate: "",
    cvv: "",
    postalCode: "",
  }

  const paymentSchema = yup.object().shape({
    cardNumber: yup.string()
      .required("Please fill in this section")
      .length(19, "Please input a valid credit card"),
    nameOnCard: yup.string()
      .required("Please fill in this section"),
    cardType: yup.string()
      .required("Please select a section"),
    expiryDate: yup.string()
      .required("Please fill in this section"),
    cvv: yup.string()
      .required("Please fill in this section")
      .length(3, "Please input the 3 digit cvv on the back of the card"),
    postalCode: yup.string()
      .required("Please fill in this section")
      .length(6, "Please input a valid postal code, no spaces"),
  })

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(false)
    try {
      const { cardNumber, ...card } = values
      const cardId = v4()
      const batch = firestore.db.batch()
      
      batch.set(firestore.payment(cardId), { 
        id: cardId,
        userId,
        ...card,
      }, { merge: true })
      batch.set(firestore.payment(cardId).collection('cardNumber').doc('cardNumber'), {
        cardNumber: cardNumber.slice(0, 14)
      })
      batch.update(firestore.user(userId), {
        cards: firebase.fieldValue.arrayUnion(cardId)
      })
      await batch.commit()
      goToPage(-1)
    } catch (error) {
      actions.setStatus({ msg: `Could not submit payment information: ${error}`})
    }
  }

  return <PaymentFormView
    initialValues={initialValues}
    paymentSchema={paymentSchema}
    onSubmit={onSubmit}
    goToPage={goToPage}
  />
}

export default PaymentFormContainer
