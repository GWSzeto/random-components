import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import moment from 'moment'
import DisplayProfile from './displayProfile'
import EditProfile from './editProfile'
import { parseObjectInfo } from '../../utility/parseObjectInfo'

// hooks
import { useFirestore } from '../../Firebase/context'
import User from '../../unstated/user'
import Insurances from '../../unstated/insurances'

const profileSchema = yup.object().shape({
  firstName: yup.string()
    .required("Please fill in this section"),
  lastName: yup.string()
    .required("Please fill in this section"),
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
    .required("Please fill in this section"),
  addressLine1: yup.string()
    .required("Please fill in this section"),
  shippingAddressLine1: yup.string()
    .when("sameAddress",  {
      is: false,
      then: yup.string().required("Please fill in this section")
    })
})

const ProfileContainer = () => {
  const [cards, setCards] = useState([])
  const [editProfile, setEditProfile] = useState(false)
  const userHook = User.useContainer()
  const firestore = useFirestore()

  const insurancesInfo = Insurances.useContainer().insurances
    .map(({id, insuranceImage, userId, ...insuranceInfo}) => insuranceInfo)
    .map(insurance => parseObjectInfo(insurance))
  
  const cardsInfo = cards
    .map(({id, userId, ...card}) => card)
    .map(card => parseObjectInfo(card))

  const {
    created,
    id: userId,
    email,
    insurances,
    orders,
    payment,
    ...userValues
  } = userHook.user
  const userInfo = parseObjectInfo(userValues)

  const getCardInfo = async () => {
    const cards = (await firestore.payments()
      .where('userId', '==', userId)
      .get())
      .docs
      .map(doc => doc.data())
      .map(({cardNumber, ...cardInfo}) => cardInfo)
    setCards(cards)
  }

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(false)
    try {
      await userHook.updateUser(values)
      setEditProfile(false)
    } catch(error) {
      actions.setStatus({ msg: `Unable to update user profile: ${error}`})
    }
  }

  useEffect(() => {
    // wait for the user id here because the initial state is {firstTime: false} which is truthy
    // and triggers getCardInfo with a user object with no id, so just wait for the id instead
    if (userId) { 
      getCardInfo()
    }
  }, [userId])

  window.Intercom("update", {last_request_at: parseInt((new Date()).getTime()/1000)})

  if (editProfile) {
    return <EditProfile
      initialValues={userValues}
      profileSchema={profileSchema}
      onSubmit={onSubmit}
      setEditProfile={setEditProfile}
    />
  } else {
    return <DisplayProfile
      userInfo={userInfo}
      cardsInfo={cardsInfo}
      insurancesInfo={insurancesInfo}
      setEditProfile={setEditProfile}
    />
  }
}

export default ProfileContainer
