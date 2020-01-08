import styled from 'styled-components'
import { Box } from '../../../sharedStyles/containers';
import { blue } from '../../../sharedStyles/colorPalette'

export const ReviewBox = styled(Box)`
  max-width: 600px;
`

export const EmptyCartBox = styled(Box)`
  text-align: center;
`

export const ReviewContent = styled.div`
  flex: 1;
`

export const TabContainer = styled.div`
  display: flex;
  margin: 1rem 1rem;
  margin-bottom: -1rem;
  align-self: flex-start;
`

export const TabButton = styled.div`
  transition: all 0.3s ease;
  border: 1px solid ${blue};
  border-bottom: 0;
  color: ${props => props.selected ? "white" : blue};
  background-color: ${props => props.selected ? blue : "transparent"};
  font-weight: 700;
  border-radius: 10px 10px 0 0;
  padding: 0.25rem 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
`
