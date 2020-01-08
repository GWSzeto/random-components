import React, { Fragment } from 'react'
import { Formik, Form } from 'formik'

// styles
import { 
  PhoneVerificationLayout,
  Resend,
  ButtonContainer,
} from './phoneVerificationStyles'
import {
  Box
} from '../../../sharedStyles/containers'
import {
  PageLayout
} from '../../../sharedStyles/containers'
import {
  InputField,
  Label,
  Input,
  ErrorField,
  ErrorText,
  CleaveInput,
} from '../../../sharedStyles/formComponents'
import {
  Title,
  SubText,
} from '../../../sharedStyles/text'
import {
  GreenButton,
  InvertedBlueButton,
} from '../../../sharedStyles/buttons'


const PhoneVerificationView = ({ 
  initialValues,
  verificationSchema,
  onSubmit,
  sendCode,
  tryAnotherNumber,
  resendVerificationCode,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={verificationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, values, setStatus, status, setFieldValue}) => (
      <PageLayout>
        <Box>
          <Title>Confirmation Code</Title>
          <SubText>
            Please enter the confirmation code sent to you below
          </SubText>
          <Form>
            {values.sameNumber ? (
              <InputField>
                <Label>Confirmation Code</Label>
                <Input type="text" name="confirmationCode" inputMode="numeric" pattern="[0-9]*"/>
                <Resend onClick={() => resendVerificationCode()}>Resend code</Resend>
                <ErrorField name="confirmationCode" component="div" />
              </InputField>
            ) : (
              <InputField>
                <Label>Enter Another Phone Number</Label>
                <Input 
                  name="newNumber"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  options={{phone: true, phoneRegionCode: "CA"}}
                  component={CleaveInput} 
                />
                <ErrorField name="newNumber" component="div" />
              </InputField>
            )}
            {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
            <ButtonContainer>
              {values.sameNumber ? (
                <Fragment>
                  <InvertedBlueButton type="button" onClick={() => tryAnotherNumber(setFieldValue)}>
                    Try Another Number
                  </InvertedBlueButton>
                  <GreenButton type="submit" disabled={isSubmitting}>Confirm</GreenButton>
                </Fragment> 
              ) : (
                <InvertedBlueButton type="button" onClick={async () => await sendCode(values, setStatus, setFieldValue)}>
                  Send Code
                </InvertedBlueButton>
              )}
            </ButtonContainer>
          </Form> 
        </Box>
        <div id="sendcode"/>
      </PageLayout>
    )}
  </Formik>
)

export default PhoneVerificationView