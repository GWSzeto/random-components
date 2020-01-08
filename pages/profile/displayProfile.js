import React, { Fragment } from 'react'
import { v4 } from 'uuid'
import _ from 'lodash'
import PageWrapper from '../../components/pageWrapper';

// styles
import {
  ProfileBox,
  ProfileTitleContainer,
  ProfileSubTitleContainer,
  ProfileTitle,
  EditButton,
  InfoContainer, 
  InfoSection,
  InfoName 
} from './profileStyles'
import { Body } from '../../sharedStyles/containers';

const DisplayProfile = ({
  userInfo, 
  cardsInfo, 
  insurancesInfo,
  setEditProfile
}) => (
  <PageWrapper>
    <Body>
      <ProfileBox>
        <ProfileTitleContainer>
          <ProfileTitle>Personal Info</ProfileTitle>
          <EditButton onClick={() => setEditProfile(true)}>Edit</EditButton>
        </ProfileTitleContainer>
        {userInfo.map(({ name, value }) => (
          <InfoSection key={v4()}>
            <InfoName>{name}</InfoName>
            <div>{value}</div>
          </InfoSection>
        ))}
        {!_.isEmpty(insurancesInfo) && (
          <Fragment>
            <ProfileSubTitleContainer>
              <ProfileTitle>Insurance Info</ProfileTitle>
            </ProfileSubTitleContainer>
            <div>
              {insurancesInfo.map(insurance => (
                <InfoContainer key={v4()}>
                  {insurance.map(({ name, value }) => (
                    <InfoSection key={v4()}>
                      <InfoName>{name}</InfoName>
                      <div>{value}</div>
                    </InfoSection>
                  ))}
                </InfoContainer>
              ))}
            </div>
          </Fragment>
        )}
        {!_.isEmpty(cardsInfo) && 
          <Fragment>
            <ProfileSubTitleContainer>
              <ProfileTitle>Payment Info</ProfileTitle>
            </ProfileSubTitleContainer>
            <div>
              {cardsInfo.map(card => 
                <InfoContainer key={v4()}>
                  {card.map(({ name, value }) => (
                    <InfoSection key={v4()}>
                      <InfoName>{name}</InfoName>
                      <div>{value}</div>
                    </InfoSection>
                  ))}
                </InfoContainer>
              )}
            </div>
          </Fragment>
        }
      </ProfileBox>
    </Body>
  </PageWrapper>
)

export default DisplayProfile
