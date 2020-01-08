import React from 'react'
import { Formik, Form } from 'formik'

// styles
import {
  CompletionFormBox,
  CenteredCheckboxField,
  Checkbox,
  CheckboxLabel,
} from './completionFormStyles'
import {
  PageLayout,
} from '../../../sharedStyles/containers'
import {
  ErrorField,
  ErrorText
} from '../../../sharedStyles/formComponents'
import {
  Title,
  SubText,
} from '../../../sharedStyles/text'
import {
  ButtonContainer,
  GreenButton,
} from '../../../sharedStyles/buttons'

const CompletionFormView = ({ initialValues, completionSchema, onSubmit, firstName, lastName}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={completionSchema}
    onSubmit={onSubmit}
  >
    {({ status, isSubmitting }) => (
      <PageLayout>
        <CompletionFormBox>
          <Title>Welcome {firstName} {lastName}</Title>
          <SubText>
            I hope you enjoy your stay here, if you
            have any further questions or concerns, please
            don't hesitate to ask one of our pharmacists or team
            members with the blue icon at the bottom right corner
          </SubText>
          <Form>
            <CenteredCheckboxField>
              <Checkbox type="checkbox" name="userAgreement" />
              <CheckboxLabel htmlFor="userAgreement">I accept to the <a href="https://www.medmehealth.ca/terms-of-service" target="_blank">Terms of Service</a></CheckboxLabel>
            </CenteredCheckboxField>
            <ErrorField name="userAgreement" component="div"/>
            {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
            <ButtonContainer>
              <GreenButton type="submit" disabled={isSubmitting}>
                Submit
              </GreenButton>
            </ButtonContainer>
          </Form>
        </CompletionFormBox>
      </PageLayout>
    )}
  </Formik>
)

export default CompletionFormView