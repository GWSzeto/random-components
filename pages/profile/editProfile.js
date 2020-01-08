import React from 'react'
import { Formik, Form } from 'formik'
import PageWrapper from '../../components/pageWrapper';

// styles
import {
  ProfileBox,
  ProfileTitleContainer,
  ProfileTitle,
  EditButton,
  RadioSection,
  RadioInputField,
  RadioLabel,
  RadioInput,
} from './profileStyles'
import {
  InputField,
  Label,
  Input,
  ErrorField,
  ErrorText,
  CleaveInput,
  AutoCompleteInput,
} from '../../sharedStyles/formComponents'
import { Body } from '../../sharedStyles/containers';

const EditProfile = ({ 
  initialValues,
  profileSchema,
  onSubmit,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={profileSchema}
    onSubmit={onSubmit}
  >
  {({ isSubmitting, setFieldValue, values, status }) => (
    <PageWrapper>
      <Body>
        <ProfileBox>
          <Form>
            <ProfileTitleContainer>
              <ProfileTitle>Edit Info</ProfileTitle>
              <EditButton type="submit" disabled={isSubmitting}>Save</EditButton>
            </ProfileTitleContainer>
            {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
            <InputField>
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                type="text"
                name="addressLine1"
                setFieldValue={setFieldValue}
                component={AutoCompleteInput} 
              />
              <ErrorField name="addressLine1" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input type="text" name="addressLine2"/>
            </InputField>
            <InputField>
              <Label htmlFor="allergiesAndIntoleracnes">Allergies and Intolerances</Label>
              <Input type="text" name="allergiesAndIntolerances"/>
            </InputField>
            <InputField>
              <Label htmlFor="birthdate">Birthdate</Label>
              <Input 
                name="birthdate" 
                inputMode="numeric"
                pattern="[0-9]*"
                options={{date: true, datePattern: ["m", "d", "Y"]}} 
                component={CleaveInput}
              />
              <ErrorField name="birthdate" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="firstName">First Name</Label>
              <Input type="text" name="firstName"/>
              <ErrorField name="firstName" component="div"/>
            </InputField>              
            <InputField>
              <Label htmlFor="lastName">Last Name</Label>
              <Input type="text" name="lastName"/>
              <ErrorField name="lastName" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Input type="text" name="medicalConditions"/>
            </InputField>
            <InputField>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                name="phoneNumber" 
                inputMode="numeric"
                pattern="[0-9]*"
                options={{phone: true, phoneRegionCode: "CA"}} 
                component={CleaveInput} 
              />
              <ErrorField name="phoneNumber" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="regularMedications">Regular Medications</Label>
              <Input type="text" name="regularMedications"/>
            </InputField>
            <InputField>
              <Label htmlFor="sex">Sex</Label>
              <RadioSection>
                <RadioInputField>
                  <RadioInput type="radio" name="sex" id="male" value="male" checked={values.sex === "male"}/>
                  <RadioLabel htmlFor="male">Male</RadioLabel>
                </RadioInputField>
                <RadioInputField>
                  <RadioInput type="radio" name="sex" id="female" value="female" checked={values.sex === "female"}/>
                  <RadioLabel htmlFor="female">Female</RadioLabel> 
                </RadioInputField>
                <RadioInputField>
                  <RadioInput type="radio" name="sex" id="other" value="other" checked={values.sex === "other"}/>
                  <RadioLabel htmlFor="other">Other</RadioLabel>
                </RadioInputField>
              </RadioSection>
              <ErrorField name="sex" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="shippingAddressLine1">Shipping Address Line 1</Label>
              <Input
                type="text"
                name="shippingAddressLine1"
                setFieldValue={setFieldValue}
                component={AutoCompleteInput} 
              />
              <ErrorField name="shippingAddressLine1" component="div"/>
            </InputField>
            <InputField>
              <Label htmlFor="shippingAddressLine2">Shipping Address Line 2</Label>
              <Input type="text" name="shippingAddressLine2"/>
            </InputField>
          </Form>
        </ProfileBox>        
      </Body>
    </PageWrapper>
  )}
  </Formik>
)

export default EditProfile
