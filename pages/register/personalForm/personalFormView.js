import React from 'react'
import { Formik, Form } from 'formik'

// styles
import {
  PersonalFormBox,
  RadioSection,
  RadioInputField,
  RadioLabel,
  RadioInput,
} from './personalFormStyles'
import {
  PageLayout
} from '../../../sharedStyles/containers'
import {
  Title,
  SubText,
} from '../../../sharedStyles/text'
import {
  InputField,
  Label,
  Input,
  CheckboxField,
  CheckboxLabel,
  Checkbox,
  ErrorField,
  ErrorText,
  CleaveInput,
  AutoCompleteInput,
} from '../../../sharedStyles/formComponents'
import {
  ButtonContainer,
  GreenButton,
} from '../../../sharedStyles/buttons'

const PersonalFormView = ({ initialValues, personalSchema, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={personalSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, values, status, setFieldValue }) => (
      <PageLayout>
        <PersonalFormBox>
          <Title>Personal Info</Title>
          <SubText>
            We ask for this information so that our pharmacists
            can process your prescription and confirm your order
            during the consultation
          </SubText> 
          <Form>
            <InputField>
              <Label htmlFor="birthdate">Birthdate</Label>
              <Input 
                name="birthdate" 
                placeholder="MM/DD/YYYY"
                inputMode="numeric"
                pattern="[0-9]*"
                options={{date: true, datePattern: ["m", "d", "Y"]}} 
                component={CleaveInput}
              />
              <ErrorField name="birthdate" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                name="phoneNumber" 
                placeholder="647 647 6477"
                inputMode="numeric"
                pattern="[0-9]*"
                options={{phone: true, phoneRegionCode: "CA"}} 
                component={CleaveInput} 
              />
              <ErrorField name="phoneNumber" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="sex">Sex</Label>
              <RadioSection>
                <RadioInputField>
                  <RadioInput type="radio" name="sex" id="male" value="male"/>
                  <RadioLabel htmlFor="male">Male</RadioLabel>
                </RadioInputField>
                <RadioInputField>
                  <RadioInput type="radio" name="sex" id="female" value="female"/>
                  <RadioLabel htmlFor="female">Female</RadioLabel> 
                </RadioInputField>
                <RadioInputField>
                  <RadioInput type="radio" name="sex" id="other" value="other"/>
                  <RadioLabel htmlFor="other">Other</RadioLabel>
                </RadioInputField>
              </RadioSection>
              <ErrorField name="sex" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                placeholder="123 street, toronto, ontario"
                type="text"
                name="addressLine1"
                setFieldValue={setFieldValue}
                component={AutoCompleteInput} 
              />
              <ErrorField name="addressLine1" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input type="text" placeholder="Suite Number" name="addressLine2"/>
            </InputField>
            <CheckboxField>
              <Checkbox type="checkbox" name="sameAddress" checked={values.sameAddress}/>
              <CheckboxLabel htmlFor="sameAddress">Same as delivery address</CheckboxLabel>
            </CheckboxField>
            {!values.sameAddress && (
              <Fragment>
                <InputField>
                  <Label htmlFor="shippingAddressLine1">Shipping Address Line 1</Label>
                  <Input
                    placeholder="123 Street, Toronto, Ontario"
                    type="text"
                    name="shippingAddressLine1"
                    setFieldValue={setFieldValue}
                    component={AutoCompleteInput} 
                  />
                  <ErrorField name="shippingAddressLine1" component="div"/>
                </InputField>
                <InputField>
                  <Label htmlFor="shippingAddressLine2">Shipping Address Line 2</Label>
                  <Input type="text" placeholder="Suite Number" name="shippingAddressLine2"/>
                </InputField>
              </Fragment>
            )}
            <InputField>
              <Label htmlFor="referral">Did anyone refer you? (OPTIONAL)</Label>
              <Input type="text" placeholder="Please input name code" name="referral"/>
            </InputField>
            {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
            <ButtonContainer>
              <GreenButton type="submit" disabled={isSubmitting}>Next</GreenButton>
            </ButtonContainer>
          </Form>
        </PersonalFormBox>
        <div id="sendcode"/>
      </PageLayout>
    )}
  </Formik>
)

export default PersonalFormView