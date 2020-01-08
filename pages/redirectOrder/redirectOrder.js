import React from 'react'
import PageWrapper from '../../components/pageWrapper'

import { useRouter } from '../../routerHistory/context';

// styles
import {
  RedirectBox,
  RedirectButton,
} from './redirectOrderStyles'
import {
  Body,
  Box,
} from '../../sharedStyles/containers'
import {
  Title,
  SubText,
} from '../../sharedStyles/text'
import {
  ButtonContainer,
  GreenButton,
} from '../../sharedStyles/buttons'

const RedirectOrder = ({ doesNotHave = 'prescription' }) => {
  const { history } = useRouter()

  const redirect = {
    otc: {
      title: 'Add non-prescription medications',
      context: 'Would you like to add Over-the-Counter medications to this order?',
      linkName: 'Add OTC',
      link: '/otc'
    },
    prescription: {
      title: 'Add a Prescription',
      context: 'Would you like to add a prescription to this order?',
      linkName: 'Add Prescription',
      link: '/upload',
    }
  }

  return (
    <PageWrapper>
      <Body>
        <RedirectBox>
          <Title>{redirect[doesNotHave].title}</Title>
          <SubText>
            {redirect[doesNotHave].context}
          </SubText>
          <ButtonContainer>
            <RedirectButton onClick={() => history.push(redirect[doesNotHave].link)}>{redirect[doesNotHave].linkName}</RedirectButton>
            <GreenButton onClick={() => history.push('/checkout')}>Checkout</GreenButton>
          </ButtonContainer>
        </RedirectBox>
      </Body>
    </PageWrapper>
  )
}

export default RedirectOrder