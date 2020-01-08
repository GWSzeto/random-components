import styled from 'styled-components'
import { 
  PageLayout,
  Box,
} from '../../sharedStyles/containers'
import {
  ButtonContainer,
} from '../../sharedStyles/buttons'

export const PasswordResetLayout = styled(PageLayout)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PasswordResetBox = styled(Box)`
  max-width: 450px;
`

export const PasswordResetButtonContainer = styled(ButtonContainer)`
  flex-flow: row nowrap;
  justify-content: space-around;
`
