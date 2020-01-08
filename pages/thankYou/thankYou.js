import React from 'react'
import PageWrapper from '../../components/pageWrapper';

import { useRouter } from '../../routerHistory/context'

// styles
import { ThankYouBox } from './thankYouStyles.js'
import { Body } from '../../sharedStyles/containers';
import { Title, SubText } from '../../sharedStyles/text';
import { ButtonContainer, BlueButton } from '../../sharedStyles/buttons';

const ThankYou = ({context}) => {
  const { history } = useRouter()

  window.Intercom("update", {last_request_at: parseInt((new Date()).getTime()/1000)})

  return (
    <PageWrapper>
      <Body>
        <ThankYouBox>
          <Title>Thank you for using MedMe!</Title>
          <SubText>
            {context}
          </SubText>
          <ButtonContainer>
            <BlueButton onClick={() => history.push('/new')}>Home</BlueButton>
          </ButtonContainer>
        </ThankYouBox>
      </Body>
    </PageWrapper>
  )
}

export default ThankYou
