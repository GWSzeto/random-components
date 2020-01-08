import React from 'react'
import { useRouter } from '../../routerHistory/context';

// styles 
import {
  PasswordResetLayout,
  PasswordResetBox,
} from './passwordResetStyles'
import {
  Title,
  SubText,
} from '../../sharedStyles/text'
import {
  ButtonContainer,
  BlueButton,
} from '../../sharedStyles/buttons'

const PasswordResetSent = () => {
  const { history } = useRouter()

  return (
    <PasswordResetLayout>
      <PasswordResetBox>
        <Title>Password Reset Sent</Title>
        <SubText>Please check your email for further instructions</SubText>
        <ButtonContainer>
          <BlueButton onClick={() => history.push('/login')}>Login</BlueButton>
        </ButtonContainer>
      </PasswordResetBox>
    </PasswordResetLayout>
  )
}

export default PasswordResetSent
