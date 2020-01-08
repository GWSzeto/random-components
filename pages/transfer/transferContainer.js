import React, { useState } from 'react'
import * as yup from 'yup'
import { v4 } from 'uuid'
import moment from 'moment'

import TransferView from './transferView'
import ThankYou from '../thankYou'

// hooks
import { useFirestore, useFirebase } from '../../Firebase/context'
import { useRouter } from '../../routerHistory/context'
import User from '../../unstated/user'

const TransferContainer = () => {
  const [pageCount, setPageCount] = useState(0)
  const { history } = useRouter()
  const firestore = useFirestore()
  const firebase = useFirebase()
  const userId = User.useContainer().user.id

  const initialValues = {
    pharmacyName: "", 
    pharmacyPhoneNumber: "", 
    pharmacyAddress: "", 
    transferAll: true, 
    medicationToTransfer: "",
  }

  const transferSchema = yup.object().shape({
    pharmacyName: yup.string()
      .required('Please fill in this section'),
    pharmacyPhoneNumber: yup.string()
      .required('Please fill in this section')
      .min(12, 'Please input a proper canadian phone number'),
    pharmacyAddress: yup.string()
      .required('Please fill in this section'),
  })

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(false)
    try {
      const orderId = v4()
      const batch = firestore.db.batch()
      batch.set(firestore.order(orderId), {
        id: orderId,
        type: "transfer",
        orderStatus: "Not Consulted",
        orderDate: moment().format("MMMM Do YYYY"),
        orderCreated: firebase.timestamp.now(),
        scripts: [],
        otc: [],
        userId,
        ...values,
      }, { merge: true })
      batch.set(firestore.user(userId), {
        orders: firebase.fieldValue.arrayUnion(orderId)
      }, { merge: true })
      await batch.commit()

      window.Intercom("trackEvent", "transfer-made", {
        orderId,
        userId,
        orderDate: parseInt((new Date()).getTime()/1000),
      })

      setPageCount(1)
    } catch (error) {
      actions.setStatus({ msg: `could not submit trasnfer: ${error}`}) 
    }
  }

  const thankyouContext = `
    Your transfer is on its way! One of our pharmacists is working on bringing on your prescriptions to our platform 
    so that you can order them right away!
  `

  const transferPages = [
    () => <TransferView initialValues={initialValues} transferSchema={transferSchema} onSubmit={onSubmit} history={history}/>,
    () => <ThankYou context={thankyouContext}/>,
  ]

  return transferPages[pageCount]()
}

export default TransferContainer
