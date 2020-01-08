import React from 'react'
import { v4 } from 'uuid'
import PageWrapper from '../../components/pageWrapper';

// hooks
import { useRouter } from '../../routerHistory/context'
import OrdersHook from '../../unstated/orders'

// styles 
import { OrdersBody, EmptyOrdersBox } from './ordersStyles'
import OrderCard from '../../components/orderCard';
import { Title, SubText } from '../../sharedStyles/text';
import { ButtonContainer, BlueButton } from '../../sharedStyles/buttons';

const Orders = () => {
  const { orders } = OrdersHook.useContainer()
  const { history } = useRouter()

  if (orders.length === 0) {
    return (
      <PageWrapper>
        <OrdersBody>
          <EmptyOrdersBox>
            <Title>No Orders yet</Title>
            <SubText>Looks like you don't have any orders yet, create an order so we can start processing them</SubText>
            <ButtonContainer>
              <BlueButton onClick={() => history.push('/')}>Home</BlueButton>
            </ButtonContainer>
          </EmptyOrdersBox>
        </OrdersBody>
      </PageWrapper>
    )
  } else {
    return (
      <PageWrapper>
        <OrdersBody>
          {orders && orders.map(({ orderDate, orderStatus, otc, scripts, type, id }) => (
            <OrderCard 
              orderDate={orderDate}
              orderStatus={orderStatus}
              otc={otc}
              scripts={scripts}
              type={id}
              id={id}
              key={v4()}
            />
          ))}
        </OrdersBody>
      </PageWrapper>
    )
  }
}

export default Orders

