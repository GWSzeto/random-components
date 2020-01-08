import React from 'react'
import { v4 } from 'uuid'
import PageWrapper from '../../components/pageWrapper';
import RefillPrescriptionCard from '../../components/refillPrescriptionCard'

// hooks
import Cart from '../../unstated/cart'
import { useRouter } from '../../routerHistory/context'

// styles
import { RefillBox } from './refillStyles'
import { Body } from '../../sharedStyles/containers';
import { Title, SubText } from '../../sharedStyles/text';
import { ButtonContainer, GreenButton } from '../../sharedStyles/buttons';

const RefillView = ({ prescriptionsWithRefills }) => {
  const { hasRefills } = Cart.useContainer()
  const { history } = useRouter()

  return (
    <PageWrapper>
      <Body>
        <RefillBox>
          <Title>Refills</Title>
          <SubText> Please select which prescriptions to refill</SubText>
          {prescriptionsWithRefills.map(prescription => (
            <RefillPrescriptionCard prescription={prescription} key={v4()}/>
          ))}
          <ButtonContainer>
            <GreenButton onClick={() => history.push('/checkout')} disabled={!hasRefills}>Checkout</GreenButton>
          </ButtonContainer>
        </RefillBox>
      </Body>
    </PageWrapper>
  )
}

export default RefillView
