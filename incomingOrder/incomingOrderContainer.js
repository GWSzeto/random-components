import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { v4 } from 'uuid'
import IncomingOrderView from './incomingOrderView'

import { useFirestore, useFirebase } from '../../Firebase/context'

const initialValues = {
  insuranceInfo: {
    policyNumber: "",
    groupNumber: "",
    providerName: "",
    carrier: "",
  },
  medicalInfo: {
    allergiesAndIntolerances: "",
    regularMedications: "",
    medicalConditions: "",
  },
  doctorInfo: {
    doctorName: "",
    doctorAddress: "",
    doctorFax: "",
    doctorPhoneNumber: "",
    cpso: ""
  },
  prescriptions: [{
    quantity: "",
    dosage: "",
    name: "",
    dosageForm: "",
    expiryDate: "",
    refills: 0,
    instructions: [],
  }]
}

const insuranceInputs = {
  "Policy Number": "policyNumber",
  "Group Number": "groupNumber",
  "Provider Name": "providerName",
  "Carrier": "carrier",
}

const medicalInputs = {
  "Allergies and Intolerances": "allergiesAndIntolerances",
  "Regular Medications": "regularMedications",
  "Medical Conditions": "medicalConditions",
}

const doctorInputs = {
  "Doctor Name": "doctorName",
  "Doctor Phone Number": "doctorPhoneNumber",
  "Doctor Fax": "doctorFax",
  "Doctor Address": "doctorAddress",
  "CPSO": "cpso",
}

const prescriptionInputs = {
  "Drug Name": "name",
  "Dosage": "dosage",
  "Quantity": "quantity",
  "Dosage Form": "dosageForm",
  "Expiry Date": "expiryDate",
  "Number of Refills": "refills",
}



const IncomingOrderContainer = ({ order }) => {
  const [prescriptionUrls, setPrescriptionUrls] = useState([])
  const [otcItems, setOtcItems] = useState([])
  const [otcTotal, setOtcTotal] = useState(0)
  const [refillPrescriptions, setRefillPrescriptions] = useState([])
  const [insuranceUrl, setInsuranceUrl] = useState(null)
  const [insuranceId, setInsuranceId] = useState(null)
  const [user, setUser] = useState(null)
  const [instructionsCount, setInstructionsCount] = useState(1)
  const [prescriptionsCount, setPrescriptionsCount] = useState(1)
  const firestore = useFirestore()
  const firebase = useFirebase()

  const processPrescriptions = async (prescriptionInfo, doctorInfo) => {
    // refine data
    const completePrescriptionData = prescriptionInfo.map(prescription => ({
      ...prescription,
      prescribedDate: moment().format("MMMM Do YYYY"),
      id: v4(),
      userId: order.userId,
    }))
    const prescriptionIds = completePrescriptionData.map(({id}) => id)

    //write to firebase
    const batch = firestore.db.batch()
    completePrescriptionData.map(prescription => batch.set(
      firestore.prescription(prescription.id),
      prescription,
      {merge: true}
    ))
    batch.set(firestore.order(order.id), {
      ...doctorInfo,
    }, { merge: true })
    await batch.commit()

    return prescriptionIds
  }

  const processOrder = async (insuranceInfo, medicalInfo, scripts) => {
    const batch = firestore.db.batch()
    if (insuranceId) {
      batch.set(firestore.insurance(insuranceId), insuranceInfo, { merge: true })
    }
    batch.set(firestore.user(order.userId), medicalInfo, { merge: true })
    batch.set(firestore.order(order.id), {
      scripts,
      orderStatus: "New",
    }, { merge: true })
    await batch.commit()
  }

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(false)
    const { insuranceInfo, medicalInfo, doctorInfo, prescriptions } = values
    let prescriptionIds = []
    if (!_.isEmpty(order.prescriptions)) {
      prescriptionIds = await processPrescriptions(prescriptions, doctorInfo)
    }
    const scripts = [...prescriptionIds, ...order.refills]
    await processOrder(insuranceInfo, medicalInfo, scripts)
  }

  useEffect(() => {
    const initializeData = async () => {
      const userInfo = (await firestore.user(order.userId).get()).data()
      const card = (await firestore.payment(order.cardId).get()).data()
      const { cardNumber } = (await firestore.payment(order.cardId).collection('cardNumber').doc('cardNumber').get()).data()

      if (userInfo.insurances && !_.isEmpty(userInfo.insurances)) {
        const [ insuranceId ] = userInfo.insurances
        const { insuranceImage } = (await firestore.insurance(insuranceId).get()).data()
        const insuranceUrl = await firebase.storage.ref(`insuranceImages/${insuranceImage}`).getDownloadURL()
        setInsuranceUrl(insuranceUrl)
        setInsuranceId(insuranceId)
      }

      const scriptUrls = await Promise.all(order.prescriptions
        .map(async ({prescriptionImage}) => await firebase.storage.ref(`prescriptionImages/${prescriptionImage}`).getDownloadURL()))
      const otcOrderItems = await Promise.all(order.otc.map(async ({id, quantity}) => ({ ...((await firestore.otc(id).get()).data()), quantity })))
      const otcOrderTotal = otcOrderItems.reduce((acc, {price}) => acc + price, 0)
      const refillPrescriptionInfo = (await Promise.all(order.refills.map(async id => (await firestore.prescription(id).get()).data())))
        .map(({id, userId, refills, ...prescriptionInfo}) => ({ ...prescriptionInfo, refills: refills - 1 }))

      const generalInfo = {
        "Name": `${userInfo.firstName} ${userInfo.lastName}`,
        "Phone Number": userInfo.phoneNumber,
        "Birthdate": userInfo.birthdate,
        "Address": userInfo.addressLine1,
        "Suite Address": userInfo.addressLine2 || "none",
        "Consultation Time": order.consultationTime,
      }
      const cardInfo = {
        "Card Number": cardNumber,
        "Name on Card": card.nameOnCard,
        "Card Type": card.cardType,
        "CVV": card.cvv,
        "Expiry Date": card.expiryDate,
        "Postal Code": card.postalCode,
      }
      const medicalInfo = {
        "Allergies": userInfo.allergies || "none",
        "Medical Conditions": userInfo.medicalConditions || "none",
        "Intolerances": userInfo.intolerances || "none",
        "Regular Medication": userInfo.chronicMeds || "none",
        "Sex": userInfo.sex,
      }

      setUser({
        generalInfo,
        cardInfo,
        medicalInfo,
      })
      setOtcItems(otcOrderItems)
      setOtcTotal(otcOrderTotal)
      setPrescriptionUrls(scriptUrls)
      setRefillPrescriptions(refillPrescriptionInfo)
    }

    initializeData()
  }, [])

  return <IncomingOrderView
    initialValues={initialValues}
    insuranceInputs={insuranceInputs}
    medicalInputs={medicalInputs}
    doctorInputs={doctorInputs}
    prescriptionInputs={prescriptionInputs}
    prescriptionUrls={prescriptionUrls}
    otcItems={otcItems}
    otcTotal={otcTotal}
    refillPrescriptions={refillPrescriptions}
    insuranceUrl={insuranceUrl}
    user={user}
    instructionsCount={instructionsCount}
    setInstructionsCount={setInstructionsCount}
    prescriptionsCount={prescriptionsCount}
    setPrescriptionsCount={setPrescriptionsCount}
    onSubmit={onSubmit}
  />
}

export default IncomingOrderContainer
