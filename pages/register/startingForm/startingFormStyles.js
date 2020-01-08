import styled from 'styled-components'
import { 
  Box,
} from '../../../sharedStyles/containers'

export const StartingFormBox = styled(Box)`
  max-width: 340px;
`

export const PasswordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const PasswordEye = styled.img`
  max-width: 10%;
  cursor: pointer;
  filter: ${props => props.show ? "invert(65%) sepia(66%) saturate(420%) hue-rotate(186deg) brightness(91%) contrast(83%)" : "none"};
  transition: all 0.2s ease;
`
