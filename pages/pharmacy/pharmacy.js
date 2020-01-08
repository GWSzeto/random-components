import React from 'react'
import styled from 'styled-components'
import Main from '../../components/main'

const PharmacyLayout = styled.div`
  display: grid;
  grid-template:
    "side-bar main  profile" 100vh /
        20vw   60vw  20vw;
`

const SidebarLayout = styled.div`
  grid-area: side-bar;
`

const MainLayout = styled.div`
  grid-area: main;
`

const ProfileLayout = styled.div`
  grid-area: profile;
`
const PharmacySide = () => (
  <PharmacyLayout>
    <SidebarLayout>
    </SidebarLayout>
    <MainLayout>
      <Main />
    </MainLayout>
    <ProfileLayout>
    </ProfileLayout>
  </PharmacyLayout>
)

export default PharmacySide