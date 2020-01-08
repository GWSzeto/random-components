import React, { useState, useEffect } from 'react'
import PaymentOptionView from './paymentOptionView'

// hooks
import User from '../../../unstated/user'
import { useFirestore } from '../../../Firebase/context'

const PaymentOptionContainer = ({goToPage, submitOrder}) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [cards, setCards] = useState([])
  const firestore = useFirestore()
  const userId = User.useContainer().user.id

  const getUserCardInfo = async () => {
    const cardsFromFirestore = (await firestore
      .payments()
      .where('userId', '==', userId)
      .get())
      .docs
      .map(doc => doc.data())
      .map(({nameOnCard, cardType, expiryDate, id}) => ({nameOnCard, cardType, expiryDate, id}))
    setCards(cardsFromFirestore)
  }

  useEffect(() => {
    if (userId) getUserCardInfo()
  }, [userId])

  return <PaymentOptionView
    cards={cards}
    selectedCard={selectedCard}
    setSelectedCard={setSelectedCard}
    goToPage={goToPage}
    submitOrder={submitOrder}
  />
}

export default PaymentOptionContainer
