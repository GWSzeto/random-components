import React from 'react'
import { Formik, Form } from 'formik'
import PageWrapper from '../../components/pageWrapper'

// styles
import { Body } from '../../sharedStyles/containers'
import { TransferBox } from './transferStyles'
import { Title, SubText } from '../../sharedStyles/text'
import { SpacedButtonContainer, InvertedGrayButton, GreenButton } from '../../sharedStyles/buttons'
import { 
  InputField, 
  Label, 
  Input, 
  ErrorField,
  ErrorText,
  CleaveInput,
  AutoCompleteInput,
  CheckboxField,
  Checkbox,
  CheckboxLabel,
} from '../../sharedStyles/formComponents'

const TransferView = ({ initialValues, transferSchema, onSubmit, history }) => (
  <Formik
    initialValues={initialValues}
    transferSchema={transferSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, status, setFieldValue, values }) => (
      <PageWrapper>
        <Body>
          <TransferBox>
            <Title>Trasnfer Prescription</Title>
            <SubText>
              Let us know which pharmacy has your prescription and we will facilitate the transfer
            </SubText>
            <Form>
              <InputField>
                <Label htmlFor='pharmacyName'>Pharmacy Name</Label>
                <Input type='text' name='pharmacyName'/>
                <ErrorField name='pharmacyName' component='div'/>
              </InputField>
              <InputField>
                <Label htmlFor='pharmacyPhoneNumber'>Pharmacy Phone Number</Label>
                <Input
                  name='pharmacyPhoneNumber' 
                  inputMode='numeric'
                  pattern='[0-9]*'
                  options={{phone: true, phoneRegionCode: 'CA'}}
                  component={CleaveInput}
                />
                <ErrorField name='pharmacyPhoneNumber' component='div'/>
              </InputField>
              <InputField>
                <Label htmlFor="pharmacyAddress">Pharmacy Address</Label>
                <Input 
                  type='text' 
                  name='pharmacyAddress' 
                  setFieldValue={setFieldValue}
                  component={AutoCompleteInput}
                />
                <ErrorField name='pharmacyAddress' component='div'/>
              </InputField> 
              <CheckboxField>
                <Checkbox type='checkbox' name='transferAll' checked={values.transferAll}/>
                <CheckboxLabel> Transfer all medications</CheckboxLabel>
              </CheckboxField>
              {!values.transferAll && (
                <InputField>
                  <Label htmlFor='medicationToTransfer'>Medication(s) to transfer</Label>
                  <Input type='text' name='medicationToTransfer' placeholder='Seperate with commas'/>
                </InputField>
              )}
              {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
              <SpacedButtonContainer>
                <InvertedGrayButton type='button' onClick={() => history.push('/new')}>Back</InvertedGrayButton>
                <GreenButton type='submit' disabled={isSubmitting}>Continue</GreenButton>
              </SpacedButtonContainer>
            </Form>
          </TransferBox>
        </Body>
      </PageWrapper>
    )}
  </Formik>
)

export default TransferView
