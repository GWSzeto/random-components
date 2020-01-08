import React, { useEffect, useRef } from 'react'
import { Formik } from 'formik'

// styles
import {
  Body,
  Header,
  TypeformForm,
  ImageWrapper,
  ArrowContainer, 
  Arrow,
  LogoContainer,
  SmallLogo,
  HeaderText,
  ContinueButtonContainer,
  ContinueButtonText,
  SmallArrowContainer,
  OpacityGradient,
} from './typeformStyles'
import { OffWhitePageLayout } from '../../sharedStyles/containers'
import { ContinueButton } from '../../sharedStyles/buttons'
import { blue } from '../../sharedStyles/colorPalette'
import { ErrorText } from '../../sharedStyles/formComponents'

const Typeform = ({
  step,
  goToPage,
  continueText,
  initialValues,
  validationSchema = {},
  onSubmit,
  isInputValid,
  continueButtonColor = blue,
  back = true,
  children
}) => {
  const bottomButton = useRef()
  const scrollToBottom = () => bottomButton.current.scrollIntoView({ behavior: 'smooth' })

  useEffect(scrollToBottom, [])


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, status, submitForm }) => {


        return (
          <OffWhitePageLayout>
            <Header>
              <ImageWrapper position='left'>
                {back && 
                  <ArrowContainer onClick={() => goToPage(-1)}>
                    <Arrow src='/images/assets/arrow.svg'/>
                  </ArrowContainer>
                }
              </ImageWrapper> 
              <LogoContainer>
                <SmallLogo src='/images/assets/small_logo.svg'/>
              </LogoContainer>
              <ImageWrapper position='right'>
                <HeaderText>{step}</HeaderText>
              </ImageWrapper> 
            </Header>
            <TypeformForm>
              <Body>
                {(typeof children) === 'function' ? children({ submitForm, isSubmitting, values }) : children}
                {status && status.msg && <ErrorText>{status.msg}</ErrorText>}
              </Body>
              <OpacityGradient/>
              <ContinueButtonContainer>
                <ContinueButton type='submit' color={continueButtonColor} ref={bottomButton} disabled={isSubmitting || isInputValid(values)}>
                  <ContinueButtonText>{continueText}</ContinueButtonText>
                  <SmallArrowContainer>
                    <Arrow src='/images/assets/arrow.svg'/>
                  </SmallArrowContainer>
                </ContinueButton>
              </ContinueButtonContainer>  
            </TypeformForm> 
          </OffWhitePageLayout>
        )
      }}
    </Formik> 
  )
}

export default Typeform
