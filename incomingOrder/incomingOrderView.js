import React, { Fragment } from 'react'
import { Formik } from 'formik'
import { v4 } from 'uuid'

// styles
import {
  Layout,
  Title,
  SubTitle,
  InfoWrapper,
  InfoFieldsContainer,
  ImageContainer,
  Image,
  InfoField,
  FieldName,
  FieldValue,
  OtcContainer,
  TotalContainer,
  FormWrapper,
  LabelInputField,
  Label,
  Input,
  InputList,
  Button,
  ButtonContainer,
  BigButton,
  Submit,
} from './incomingOrderStyles'

const IncomingOrderView = ({
  initialValues,
  insuranceInputs,
  medicalInputs,
  doctorInputs,
  prescriptionInputs,
  prescriptionUrls,
  otcItems,
  otcTotal,
  refillPrescriptions,
  insuranceUrl,
  user,
  instructionsCount,
  setInstructionsCount,
  prescriptionsCount,
  setPrescriptionsCount,
  onSubmit,
}) => (
  <Layout>
    <InfoWrapper>
      {user ? (
        <Fragment>
          <InfoFieldsContainer>
            <Title>{!_.isEmpty(prescriptionUrls) && "Prescription"} {!_.isEmpty(otcItems) && "OTC"} {!_.isEmpty(refillPrescriptions) && "Refill"}</Title>
            <SubTitle>General Info</SubTitle>
            {Object.keys(user.generalInfo).map(key => (
              <InfoField key={v4()}>
                <FieldName>{key}:</FieldName>
                <FieldValue>{user.generalInfo[key]}</FieldValue>
              </InfoField>
            ))}
            <SubTitle>Card Info</SubTitle>
              {Object.keys(user.cardInfo).map(key => (
                <InfoField key={v4()}>
                  <FieldName>{key}:</FieldName>
                  <FieldValue>{user.cardInfo[key]}</FieldValue>
                </InfoField>
              ))}
            <SubTitle>Medical Info</SubTitle>
              {Object.keys(user.medicalInfo).map(key => (
                <InfoField key={v4()}>
                  <FieldName>{key}:</FieldName>
                  <FieldValue>{user.medicalInfo[key]}</FieldValue>
                </InfoField>
              ))}
            {!_.isEmpty(otcItems) && (
              <Fragment>
                <SubTitle>OTC Items</SubTitle>
                  {otcItems.map(otcItem => (
                    <OtcContainer key={v4()}>
                      {Object.keys(otcItem).map(key => key != "id" && (
                        <InfoField key={v4()}>
                          <FieldName>{key}:</FieldName>
                          <FieldValue>{otcItem[key]}</FieldValue>
                        </InfoField>
                      ))}
                    </OtcContainer> 
                  ))}
                <TotalContainer>
                  Total: {otcTotal}
                </TotalContainer> 
              </Fragment>
            )}
            {!_.isEmpty(refillPrescriptions) && (
              <Fragment>
                <SubTitle>Refill Prescriptions</SubTitle>
                  {refillPrescriptions.map(refillPrescription => (
                    <OtcContainer key={v4()}>
                      {Object.keys(refillPrescription).map(key => key != "id" && (
                        <InfoField key={v4()}>
                          <FieldName>{key}:</FieldName>
                          <FieldValue>{refillPrescription[key]}</FieldValue>
                        </InfoField>
                      ))}
                    </OtcContainer> 
                  ))}
              </Fragment>
            )}
          </InfoFieldsContainer>
          <ImageContainer>
            {prescriptionUrls.map(prescriptionUrl => (
              <Image key={v4()} src={prescriptionUrl}alt="prescription_image" />
            ))}
            <Image src={insuranceUrl} alt="insurance_image" />
          </ImageContainer>
        </Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </InfoWrapper>
    <Title>Order Input</Title>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({isSubmitting}) => (
          <FormWrapper>
            <SubTitle>Insurance Input</SubTitle>
            {Object.keys(insuranceInputs).map((label, index) => (
              <LabelInputField key={10000 + index}> {/* had to use index here cause of some weird formik bug of using v4 as a key and constantly rerendering on every key stroke */}
                <Label htmlFor={`insuranceInfo.${insuranceInputs[label]}`}>{label}</Label>
                <Input name={`insuranceInfo.${insuranceInputs[label]}`} type="text" />
              </LabelInputField>
            ))}
              <SubTitle>Medical Input</SubTitle>
            {Object.keys(medicalInputs).map((label, index) => (
              <LabelInputField key={100000 + index}> {/* had to use index here cause of some weird formik bug of using v4 as a key and constantly rerendering on every key stroke */}
                <Label htmlFor={`medicalInfo.${medicalInputs[label]}`}>{label}</Label>
                <Input name={`medicalInfo.${medicalInputs[label]}`} type="text" />
              </LabelInputField>
            ))}
            {!_.isEmpty(prescriptionUrls) && (
              <Fragment>
                <SubTitle>Doctor Input</SubTitle>
                <div>
                  {Object.keys(doctorInputs).map((label, index) => (
                    <LabelInputField key={100 + index}> {/* had to use index here cause of some weird formik bug of using v4 as a key and constantly rerendering on every key stroke */}
                      <Label htmlFor={`doctorInfo.${doctorInputs[label]}`}>{label}</Label>
                      <Input name={`doctorInfo.${doctorInputs[label]}`} type="text" required/>
                    </LabelInputField>
                  ))}
                </div>
                <div>
                  {[...Array(prescriptionsCount).keys()].map(scriptIndex => (
                    <div key={10 + scriptIndex}>
                      <SubTitle>Prescription {scriptIndex + 1}</SubTitle>
                      {Object.keys(prescriptionInputs).map((label, index) => (
                        <LabelInputField key={index}> {/* had to use index here cause of some weird formik bug of using v4 as a key and constantly rerendering on every key stroke */}
                          <Label htmlFor={`prescriptions[${scriptIndex}].${prescriptionInputs[label]}`}>{label}</Label>
                          <Input name={`prescriptions[${scriptIndex}].${prescriptionInputs[label]}`} type={label == "Number of Refills" ? "number" : "text"} required/>
                        </LabelInputField>
                      ))}
                      <Label htmlFor="instructions">Instructions</Label>
                        <InputList>
                          {[...Array(instructionsCount).keys()].map(instructIndex => (
                            <Input name={`prescriptions[${scriptIndex}].instructions[${instructIndex}]`} type="text" key={50 + instructIndex}/>
                          ))}
                          <ButtonContainer>
                            <Button onClick={() => setInstructionsCount(instructionsCount + 1)}>Add Instruction</Button>
                          </ButtonContainer>
                        </InputList>
                    </div>
                  ))}
                </div> 
              </Fragment>
            )}
          <ButtonContainer>
            {!_.isEmpty(prescriptionUrls) && <BigButton onClick={() => setPrescriptionsCount(prescriptionsCount + 1)}>Add Another Prescription</BigButton>}
            <Submit type="submit" disabled={isSubmitting}>Submit prescription Info</Submit>
          </ButtonContainer>
        </FormWrapper>
      )}
    </Formik>
  </Layout>
)

export default IncomingOrderView
