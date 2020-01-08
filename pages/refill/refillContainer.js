import React from 'react'
import _ from 'lodash'
import RefillView from './refillView'
import EmptyRefill from './emptyRefill'

// hooks
import Prescriptions from '../../unstated/prescriptions'

const RefillPrescriptions = () => {
  const { prescriptionsWithRefills } = Prescriptions.useContainer()

  if (_.isEmpty(prescriptionsWithRefills)) {
    return <EmptyRefill/>
  } else {
    return <RefillView
      prescriptionsWithRefills={prescriptionsWithRefills}
    />
  }
}

export default RefillPrescriptions