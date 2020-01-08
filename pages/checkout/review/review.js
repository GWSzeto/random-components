import React, { useState } from 'react'
import _ from 'lodash'
import PageWrapper from '../../../components/pageWrapper'
import ReviewCart from '../../../components/reviewCart'
import ReviewUser from '../../../components/reviewUser'

// hooks
import { useRouter } from '../../../routerHistory/context'
import Cart from '../../../unstated/cart'

// styles
import { Body } from '../../../sharedStyles/containers';
import { Title, SubText } from '../../../sharedStyles/text';
import { 
  EmptyCartBox,
  ReviewBox,
  ReviewContent,
  TabContainer, 
  TabButton, 
} from './reviewStyles'
import { 
  ButtonContainer,
  SpacedButtonContainer, 
  InvertedGrayButton, 
  BlueButton, 
  GreenButton, 
} from '../../../sharedStyles/buttons';

const Review = ({ goToPage }) => {
  const [tab, setTab] = useState('cart')
  const products = Object.values(Cart.useContainer().cart)
  const { history } = useRouter()

  return (
    <PageWrapper>
      <Body>
        {_.isEmpty(products) ? (
          <EmptyCartBox>
            <Title>Empty Cart</Title>
            <SubText>Looks like your cart is currently empty</SubText>
            <ButtonContainer>
              <BlueButton onClick={() => history.goBack()} >Add items to cart</BlueButton>
            </ButtonContainer>
          </EmptyCartBox>
        ) : (
          <ReviewContent>
            <TabContainer>
              <TabButton onClick={() => setTab('cart')} selected={tab === 'cart'}>Order Info</TabButton>
              <TabButton onClick={() => setTab('user')} selected={tab === 'user'}>User Info</TabButton>
            </TabContainer>
            <ReviewBox>
              {tab === 'cart' ? (
                <ReviewCart/>
              ) : (
                <ReviewUser/>
              )}
              <SpacedButtonContainer>
                <InvertedGrayButton onClick={() => history.goBack()}>Back</InvertedGrayButton>
                <GreenButton onClick={() => goToPage(1)}>Confirm</GreenButton>
              </SpacedButtonContainer>
            </ReviewBox>
          </ReviewContent>
        )} 
      </Body>
    </PageWrapper>
  )
}

export default Review
