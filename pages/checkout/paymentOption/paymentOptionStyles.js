import styled from 'styled-components'
import { blue, gray } from '../../../sharedStyles/colorPalette';
import { Box } from '../../../sharedStyles/containers';

export const PaymentOptionBox = styled(Box)`
  flex: 1;
  max-width: 450px;
`

export const CardContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 1rem;
  border: solid ${blue} 2px;
  padding: 0.5rem;
  border-radius: 15px;
  color: ${(({selected}) => selected ? 'white' : 'black' )};
  background-color: ${(({selected}) => selected ? blue : 'transparent')};
  box-shadow: 2px 2px 20px -3px #e6e6e6;
  cursor: pointer;
  transition: all 0.2s;
`

export const CardHolderName = styled.div`
  font-weight: 700;
`

export const AddCardContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 1rem;
  border: dashed ${gray} 2px;
  padding: 0.5rem;
  border-radius: 15px;
  color: ${gray};
  box-shadow: 2px 2px 20px -3px #e6e6e6;
  cursor: pointer;
  font-size: 1.25em;
  font-weight: 700;
`