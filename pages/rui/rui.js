import React from 'react'
import { v4 } from 'uuid'
import IncomingOrder from '../../components/incomingOrder'
import IncomingTransfer from '../../components/incomingTransfer'

import Pharmacist from '../../unstated/pharmacyOrders'

const RuiContainer = () => {
  const { newOrders, newTransfers } = Pharmacist.useContainer()

  return (
    <div>
      <div>
        {newOrders.map(order => (
          <IncomingOrder order={order} key={v4()}/>
        ))}
      </div>
      <div>
        {newTransfers.map(transfer => (
          <IncomingTransfer transfer={transfer} key={v4()}/>
        ))}
      </div>
    </div>
  )
}

export default RuiContainer
