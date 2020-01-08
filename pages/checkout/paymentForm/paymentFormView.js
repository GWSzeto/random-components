import React from 'react'
import { Formik, Form } from 'formik'
import PageWrapper from '../../../components/pageWrapper';

// styles
import { PaymentFormBox, MultipleInputFieldsContainer, SmallInputField } from './paymentFormStyles'
import { Body } from '../../../sharedStyles/containers';
import { Title, SubText } from '../../../sharedStyles/text';
import { 
  InputField, 
  Label, 
  Input, 
  CleaveInput, 
  ErrorField,
  ErrorText,
} from '../../../sharedStyles/formComponents'
import { 
  SpacedButtonContainer, 
  InvertedGrayButton, 
  GreenButton 
} from '../../../sharedStyles/buttons';

const PaymentFormView = ({ initialValues, paymentSchema, onSubmit, goToPage }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={paymentSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, status }) => (
      <PageWrapper>
        <Body>
          <PaymentFormBox>
            <Title>Add Payment</Title>
            <SubText>
              Please input your payment info in order to process the orders
            </SubText>
            <Form>
              <InputField>
                <Label htmlFor='cardNumber'>Card Number</Label>
                <Input
                  name='cardNumber' 
                  inputMode='numeric'
                  pattern='[0-9]*'
                  options={{creditCard: true}}
                  component={CleaveInput}
                />
                <ErrorField name='cardNumber' component='div'/>
              </InputField>
              <InputField>
                <Label>Name on Card</Label>
                <Input type="text" name="nameOnCard"/>
                <ErrorField name="nameOnCard" component="div"/>
              </InputField>
              <InputField>
                <Label>Card Type</Label>
                <Input component="select" name="cardType">
                  <option value={""}>Select</option>
                  <option value={"Visa"}>Visa</option>
                  <option value={"Visa Debit"}>Visa Debit</option>
                  <option value={"Mastercard"}>Mastercard</option>
                  <option value={"American Express"}>American Express</option>
                </Input>
                <ErrorField name="cardType" component="div"/>
              </InputField>
              <InputField>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  name="expiryDate"
                  placeholder="MM/YY"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  options={{date: true, datePattern: ["m", "y"]}}
                  component={CleaveInput}
                />
                <ErrorField name="expiryDate" component="div"/>
              </InputField>
              <MultipleInputFieldsContainer>
                <SmallInputField>
                  <Label htmlFor='cvv'>CVV</Label>
                  <Input name="cvv" type="number" inputMode="numeric" pattern={"[0-9]*"} />
                  <ErrorField name="cvv" component="div"/>
                </SmallInputField>
                <SmallInputField>
                  <Label htmlFor='postalCode'>Postal Code</Label>
                  <Input type="text" name="postalCode" maxLength={6} />
                  <ErrorField name="postalCode" component="div"/>
                </SmallInputField>
              </MultipleInputFieldsContainer>
              {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
              <SpacedButtonContainer>
                <InvertedGrayButton type='button' onClick={() => goToPage(-1)}>Back</InvertedGrayButton>
                <GreenButton type='submit' disabled={isSubmitting}>Continue</GreenButton>
              </SpacedButtonContainer>
            </Form>
          </PaymentFormBox> 
        </Body>
      </PageWrapper>
    )}
  </Formik>
)

export default PaymentFormView
