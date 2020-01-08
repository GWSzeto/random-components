import React from 'react'
import { Formik, Form } from 'formik'
import { v4 } from 'uuid'
import PageWrapper from '../../../components/pageWrapper';

// styles
import { ScheduleConsultationBox } from './scheduleConsultationStyles'
import { Body } from '../../../sharedStyles/containers';
import { Title, SubText } from '../../../sharedStyles/text';
import { InputField, Label, Input, ErrorField } from '../../../sharedStyles/formComponents';
import { SpacedButtonContainer, InvertedGrayButton, GreenButton } from '../../../sharedStyles/buttons';


const ScheduleConsultationView = ({ 
  consultationTimes, 
  initialValues, 
  ScheduleConsultationSchema, 
  onSubmit,
  goToPage 
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={ScheduleConsultationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <PageWrapper>
        <Body>
          <ScheduleConsultationBox>
            <Title>Schedule</Title>
            <SubText>
              During the consultation we go over how to properly adminster the prescription,
              the confirmation of the order and you're overall health and wellbeing!
            </SubText>
            <Form>
              <InputField>
                <Label htmlFor='consultationTime'>Consultation Times</Label>
                <Input name='consultationTime' component='select'>
                  <option value=''>Select</option>
                  {consultationTimes.map(hours => (
                    <option value={hours} key={v4()}>{hours}</option>
                  ))}
                </Input>
                <ErrorField name='consultationTime' component='div'/>
              </InputField>
              <SpacedButtonContainer>
                <InvertedGrayButton type='button' onClick={() => goToPage(-1)}>Back</InvertedGrayButton>
                <GreenButton type='submit' disabled={isSubmitting}>Checkout</GreenButton>
              </SpacedButtonContainer>
            </Form>
          </ScheduleConsultationBox>
        </Body>
      </PageWrapper>
    )}
 </Formik>
)

export default ScheduleConsultationView
