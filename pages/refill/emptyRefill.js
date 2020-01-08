import React from 'react'
import PageWrapper from '../../components/pageWrapper';

// hooks
import { useRouter } from '../../routerHistory/context'

// styles
import { RefillBox } from './refillStyles'
import { Body } from '../../sharedStyles/containers';
import { Title, SubText } from '../../sharedStyles/text';
import { ButtonContainer, BlueButton } from '../../sharedStyles/buttons';

const RefillView = () => {
  const { history } = useRouter()

  return (
    <PageWrapper>
      <Body>
        <RefillBox>
          <Title>Sorry! No Refills</Title>
          <SubText>
            Please upload or transfer your prescriptions to get a refill on them
          </SubText>
          <ButtonContainer>
            <BlueButton onClick={() => history.push('/new')}>Home</BlueButton>
          </ButtonContainer>
        </RefillBox>
      </Body>
    </PageWrapper>
  )
}

export default RefillView
