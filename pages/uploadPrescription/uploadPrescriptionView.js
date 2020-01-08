import React, { useState } from 'react'
import PageWrapper from '../../components/pageWrapper'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

// styles
import {
  UploadButtonContainer,
  UploadInput,
  UploadLabel,
  ProgressBarContainer,
} from './uploadPrescriptionStyles'
import {
  Body,
  Box, 
} from '../../sharedStyles/containers'
import {
  Title,
  SubText,
} from '../../sharedStyles/text'
import {
  CheckboxField,
  CheckboxLabel,
  CheckboxInput,
} from '../../sharedStyles/formComponents'
import {
  SpacedButtonContainer,
  GreenButton,
  InvertedGrayButton,
} from '../../sharedStyles/buttons'

const UploadPrescriptionView = ({ 
  readFile,
  uploadPercentage, 
  history,
}) => {
  const [generic, setGeneric] = useState(true)
  return (
    <PageWrapper>
      <Body>
        <Box>
          <Title>Upload Prescription</Title>
          <SubText>
            Please take a photo or upload an image of your prescription
          </SubText>
            <UploadButtonContainer>
              <UploadInput type='file' id='upload' name='prescriptionImage' accept='image/*' onChange={e => readFile(e, generic)}/>
              {uploadPercentage ? (
                <ProgressBarContainer uploadPercentage={uploadPercentage}>
                  <CircularProgressbar value={uploadPercentage} text={uploadPercentage < 100 ? `${uploadPercentage}%` : '✔'}/>
                </ProgressBarContainer>
              ) : (
                <UploadLabel htmlFor='upload'>Upload</UploadLabel>
              )}
              <CheckboxField>
                <CheckboxInput type='checkbox' name='generic' checked={generic} onChange={() => setGeneric(!generic)}/>
                <CheckboxLabel htmlFor='generic'>Generic Brand</CheckboxLabel>
              </CheckboxField>
            </UploadButtonContainer>
            <SpacedButtonContainer>
              <InvertedGrayButton onClick={() => history.push('/new')}>Back</InvertedGrayButton>
              <GreenButton onClick={() => history.push('./checkout')} disabled={uploadPercentage < 100}>Continue</GreenButton>
            </SpacedButtonContainer>
        </Box>
      </Body>
    </PageWrapper>
  )
}

export default UploadPrescriptionView
