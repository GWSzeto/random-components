import React from 'react'
import { v4 } from 'uuid'
import PageWrapper from '../../../components/pageWrapper'

// styles
import { PaymentOptionBox, CardContainer, CardHolderName, AddCardContainer } from './paymentOptionStyles'
import { Body } from '../../../sharedStyles/containers'
import { Title } from '../../../sharedStyles/text'
import { SpacedButtonContainer, InvertedGrayButton, GreenButton } from '../../../sharedStyles/buttons';

const PaymentOptionView = ({goToPage, cards, selectedCard, setSelectedCard, submitOrder}) => (
  <PageWrapper>
    <Body>
      <PaymentOptionBox>
        <Title>Payment Options</Title>
        {cards.map(({ nameOnCard, cardType, expiryDate, id }) => (
          <CardContainer selected={id === selectedCard} onClick={() => setSelectedCard(id)} key={v4()}>
            <CardHolderName>{nameOnCard}</CardHolderName>
            <div>{cardType}</div>
            <div>{expiryDate}</div>
          </CardContainer>
        ))}
        <AddCardContainer onClick={() => goToPage(1)}>Add Card</AddCardContainer>
        <SpacedButtonContainer>
          <InvertedGrayButton onClick={() => goToPage(-1)}>Back</InvertedGrayButton>
          <GreenButton disabled={!selectedCard} onClick={() => submitOrder(selectedCard)}>Checkout</GreenButton>
        </SpacedButtonContainer>
      </PaymentOptionBox>
    </Body>
  </PageWrapper>
)

export default PaymentOptionView