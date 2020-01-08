import React, { useState } from 'react'
import { Formik, Form } from 'formik'

// styles
import { 
  StartingFormBox,
  PasswordContainer,
  PasswordEye,
} from './startingFormStyles'
import {
  PageLayout
} from '../../../sharedStyles/containers'
import { 
  Title,
  SubText,
  Clickable
} from '../../../sharedStyles/text'
import {
  InputField,
  Label,
  Input,
  ErrorField,
} from '../../../sharedStyles/formComponents'
import {
  ButtonContainer,
  GreenButton,
} from '../../../sharedStyles/buttons'

const StartingFormView = ({ initialValues, startingSchema, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={startingSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <PageLayout>
          <StartingFormBox>
            <Title>Register</Title>
            <SubText>Have an account? <Clickable to='/login'>Log In</Clickable> here now!</SubText>
            <Form>
              <InputField>
                <Label>Legal First Name</Label>
                <Input type="text" name="firstName"/>
                <ErrorField name="firstName" component="div"/>
              </InputField>
              <InputField>
                <Label>Legal Last Name</Label>
                <Input type="text" name="lastName"/>
                <ErrorField name="lastName" component="div"/>
              </InputField>
              <InputField>
                <Label>Email</Label>
                <Input type="email" name="email"/>
                <ErrorField name="email" component="div"/>
              </InputField>
              <InputField>
                <PasswordContainer>
                  <Label>Password</Label>
                  <PasswordEye src="/images/assets/eye.svg" onClick={() => setShowPassword(!showPassword)} show={showPassword}/>
                </PasswordContainer>
                <Input type={showPassword ? "text" : "password"} name="password"/>
                <ErrorField name="password" component="div"/>
              </InputField>
              <ButtonContainer>
                <GreenButton type="submit" disabled={isSubmitting}>Register</GreenButton>
              </ButtonContainer>
            </Form>
          </StartingFormBox>
        </PageLayout>
      )}
    </Formik>
  )
}

export default StartingFormView