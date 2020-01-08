import React from 'react'
import { Formik, Form } from 'formik'

// styles
import {
  LoginLayout,
  LoginBox,
} from './loginStyles'
import {
  Title,
  SubText,
  Clickable,
  SmallClickable,
} from '../../sharedStyles/text'
import {
  InputField,
  Label,
  Input,
  ErrorField,
  ErrorText,
} from '../../sharedStyles/formComponents'
import {
  ButtonContainer,
  GreenButton,
} from '../../sharedStyles/buttons'

const LoginView = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {({ status, isSubmitting }) => (
      <LoginLayout>
        <LoginBox>
          <Title>Login</Title>
          <SubText>Don't have an account? <Clickable to='/register'>Sign Up</Clickable></SubText>
          <Form>
            <InputField>
              <Label>Email</Label>
              <Input type="text" name="email"/>
              <ErrorField name="email" component="div"/>
            </InputField>
            <InputField>
              <Label>Password</Label>
              <Input type="password" name="password"/>
              <SmallClickable to="/reset">Forgot Password?</SmallClickable>
              <ErrorField name="password" component="div"/>
            </InputField>
            {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
            <ButtonContainer>
              <GreenButton type="submit" disabled={isSubmitting}>Login</GreenButton>
            </ButtonContainer>
          </Form> 
        </LoginBox>
      </LoginLayout>
    )}
  </Formik>
)

export default LoginView