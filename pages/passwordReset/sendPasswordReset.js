import React from 'react'
import { Formik, Form } from 'formik'
import { useRouter } from '../../routerHistory/context';

// styles
import { 
  PasswordResetLayout,
  PasswordResetBox,
  PasswordResetButtonContainer
} from './passwordResetStyles'
import {
  Title,
  SubText,
} from '../../sharedStyles/text'
import {
  InputField,
  Label,
  Input,
  ErrorField,
  ErrorText,
} from '../../sharedStyles/formComponents'
import {
  GreenButton,
  InvertedGrayButton,
} from '../../sharedStyles/buttons'

const SendPasswordReset = ({ initialValues, passwordResetSchema, onSubmit }) => {
  const { history } = useRouter()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordResetSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <PasswordResetLayout>
          <PasswordResetBox>
            <Title>Password Reset</Title>
            <SubText>
              Please type in the email associated with the password you want to reset
            </SubText>
            <Form>
              <InputField>
                <Label htmlFor="email">Email</Label>
                <Input type="text" name="email"/>
                <ErrorField name="email" component="div"/>
              </InputField>
              {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
              <PasswordResetButtonContainer>
                <InvertedGrayButton type="button" onClick={() => history.push('/login')}>Back</InvertedGrayButton>
                <GreenButton type="submit" disabled={isSubmitting}>Reset</GreenButton>
              </PasswordResetButtonContainer>
            </Form>
          </PasswordResetBox>
        </PasswordResetLayout>
      )}
    </Formik>
  )
}

export default SendPasswordReset