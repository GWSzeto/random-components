import React, { useState } from 'react'
import _ from 'lodash'

// context hooks
import { 
  useFirebase, 
  useAuth,
  useFirestore,
} from '../../Firebase/context'
import User from '../../unstated/user'

// forms
import StartingForm from './startingForm'
import PersonalForm from './personalForm'
import PhoneVerification from './phoneVerification'
import CompletionForm from './completionForm'

const RegisterContainer = ({ history }) => {
  const [userData, setUserData] = useState({})
  const [pageCount, setPageCount] = useState(0)
  const [confirm, setConfirm] = useState(null)
  const userHook = User.useContainer()
  const firebase = useFirebase()
  const auth = useAuth()
  const firestore = useFirestore()

  const goToPage = direction => setPageCount(pageCount + direction)

  const updateUserData = newUserData => setUserData({
    ...userData,
    ...newUserData
  })

  const sendVerificationCode = async phoneNumber => {
    const formattedPhoneNumber = "+1".concat(phoneNumber.replace(/\s/g, ''))
    const phoneConfirm = await auth.signInWithPhoneNumber(formattedPhoneNumber, window.recaptchaVerifier)
    setUserData({
      ...userData,
      phoneNumber
    })
    setConfirm(phoneConfirm)
  }
  const resendVerificationCode = async () => await sendVerificationCode(userData.phoneNumber)
  const confirmVerificationCode = async confirmationCode => await confirm.confirm(confirmationCode)

  const submitUserData = async () => {
    const user = await auth.signUp(userData.email, userData.password)
    const { sameAddress, password, ...refinedUserData } = userData

    // set up the user in firebase
    await firestore.user(user.uid).set({
      id: user.uid,
      orders: [],
      cards: [],
      insurances: [],
      payment: false,
      created: firebase.timestamp.now(),
      ...refinedUserData,
    }, { merge: true })

    // set it up in unstated
    userHook.updateUser({
      payment: false,
      insurances: [],
      firstTime: true,
      ...refinedUserData,
    })

    history.pushState('/')
  }

  const registerForms = [
    () => <StartingForm updateUserData={updateUserData} goToPage={goToPage}/>,
    () => <PersonalForm updateUserData={updateUserData} goToPage={goToPage} sendVerificationCode={sendVerificationCode}/>,
    () => <PhoneVerification sendVerificationCode={sendVerificationCode} resendVerificationCode={resendVerificationCode} confirmVerificationCode={confirmVerificationCode} goToPage={goToPage}/>,
    () => <CompletionForm firstName={userData.firstName} lastName={userData.lastName} submitUserData={submitUserData}/>,
  ]

  return registerForms[pageCount]()
}

export default RegisterContainer