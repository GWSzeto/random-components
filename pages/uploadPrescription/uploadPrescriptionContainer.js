import React, { useState } from 'react'
import { v4 } from 'uuid'
import UploadPrescriptionView from './uploadPrescriptionView'

// hooks
import { useFirebase } from '../../Firebase/context'
import { useRouter } from '../../routerHistory/context'
import Cart from '../../unstated/cart'

const UploadPrescriptionContainer = () => {
  const [uploadPercentage, setUploadPercentage] = useState(null)
  const cart = Cart.useContainer()
  const firebase = useFirebase()
  const { history } = useRouter()

  const readFile = (event, generic) => {
    event.preventDefault()
    const { files } = event.target
    const prescriptionImage = v4()
    const uploadTask = firebase
      .storage
      .ref(`prescriptionImages/${prescriptionImage}`)
      .put(files[0])
    uploadTask.on('state_changed', function progress(snapshot) {
      setUploadPercentage(parseInt(100 * snapshot.bytesTransferred/snapshot.totalBytes))
    })
    uploadTask.on('state_changed', null, null, () => {
      cart.addToCart({
        id: v4(),
        prescriptionImage,
        generic,
        type: 'prescription',
      })
    })
  }

  window.Intercom("update", {last_request_at: parseInt((new Date()).getTime()/1000)})


  return <UploadPrescriptionView
    uploadPercentage={uploadPercentage}
    readFile={readFile}
    history={history}
  />
}

export default UploadPrescriptionContainer
