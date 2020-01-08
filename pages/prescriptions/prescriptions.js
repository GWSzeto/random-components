import React from 'react'
import { v4 } from 'uuid'
import PageWrapper from '../../components/pageWrapper';
import PrescriptionCard from '../../components/prescriptionCard/prescriptionCard';

import { useRouter } from '../../routerHistory/context'
import PrescriptionsHook from '../../unstated/prescriptions'

// styles 
import { PrescriptionsBody, EmptyPrescriptionsBox } from './prescriptionsStyles'
import { Title, SubText } from '../../sharedStyles/text';
import { ButtonContainer, BlueButton } from '../../sharedStyles/buttons';


const Prescriptions = () => {
  const { prescriptions } = PrescriptionsHook.useContainer()
  const { history } = useRouter()

  if (prescriptions.length === 0) { 
    return (
      <PageWrapper>
        <PrescriptionsBody>
          <EmptyPrescriptionsBox>
            <Title>No prescriptions yet</Title>
            <SubText>Looks like you don't have any prescriptions yet, upload a prescription slip and we can help you manage your prescriptions for you</SubText>
            <ButtonContainer>
              <BlueButton onClick={() => history.push('/')}>Home</BlueButton>
            </ButtonContainer>
          </EmptyPrescriptionsBox>
        </PrescriptionsBody>
      </PageWrapper>
    )
  } else {
    return (
      <PageWrapper>
        <PrescriptionsBody>
          {prescriptions.map(({ name, quantity, dosage, expiryDate, instructions }) => (
            <PrescriptionCard 
              name={name} 
              quantity={quantity}
              dosage={dosage} 
              expiryDate={expiryDate} 
              instructions={instructions}
              key={v4()}
            />
          ))}
        </PrescriptionsBody>
      </PageWrapper>
    )
  }       
}

export default Prescriptions
