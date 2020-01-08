import React, { useState } from 'react'
import { v4 } from 'uuid'
import moment from 'moment'

// hooks
import { useFirestore, useFirebase } from '../../Firebase/context'
import User from '../../unstated/user'
import Cart from '../../unstated/cart'

// forms
import Review from './review'
import PaymentForm from './paymentForm'
import ThankYou from '../thankYou'
import ScheduleConsultation from './scheduleConsultation'
import PaymentOption from './paymentOption'

const Checkout = () => {
  const [pageCount, setPageCount] = useState(0)
  const [consultationTime, setConsultationTime] = useState(null)
  const userId = User.useContainer().user.id
  const cart = Cart.useContainer()
  const firestore = useFirestore()
  const firebase = useFirebase()

  const goToPage = direction => setPageCount(pageCount + direction)

  const thankYouContext = `
    Your order is now on its way! One of our pharmacists on deck will process the order and contact you during the specified 
    consultation hours
  `

  const submitOrder = async cardId => {
    const orderId = v4()
    const cartItems = Object.values(cart.cart)
    const otc = cartItems
      .filter(({type}) => type === "otc")
      .map(({id, quantity}) => ({id, quantity}))
    const prescriptions = cartItems
      .filter(({type}) => type === "prescription")
      .map(({prescriptionImage, generic}) => ({prescriptionImage, generic}))
    const refills = cartItems
      .filter(({type}) => type === "refill")
      .map(({id}) => id)
    
    const batch = firestore.db.batch()
    batch.set(firestore.order(orderId), {
      id: orderId,
      orderStatus: "Not Consulted",
      userId,
      cardId,
      consultationTime,
      orderDate: moment().format("MMMM Do YYYY"),
      orderCreated: firebase.timestamp.now(),
      scripts: [],
      type: "order",
      prescriptions,
      otc,
      refills,
    }, { merge: true })
    batch.set(firestore.user(userId), {
      orders: firebase.fieldValue.arrayUnion(orderId)
    }, { merge: true })
    await batch.commit()

    window.Intercom("trackEvent", "order-made", {
      orderId,
      userId,
      consultationTime,
      orderDate: parseInt((new Date()).getTime()/1000),
    })

    cart.clearCart()
    goToPage(2)
  }

  const checkoutPages = [
    () => <Review goToPage={goToPage}/>,
    () => <ScheduleConsultation goToPage={goToPage} setConsultationTime={setConsultationTime}/>,
    () => <PaymentOption goToPage={goToPage} submitOrder={submitOrder}/>,
    () => <PaymentForm goToPage={goToPage} />,
    () => <ThankYou context={thankYouContext}/>,
  ]

  return checkoutPages[pageCount]()
}

export default Checkout
