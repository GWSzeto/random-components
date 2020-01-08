import styled from 'styled-components'
import { InputField } from '../../../sharedStyles/formComponents';
import { Box } from '../../../sharedStyles/containers';

export const PaymentFormBox = styled(Box)`
  max-width: 450px;
`

export const MultipleInputFieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SmallInputField = styled(InputField)`
  flex: 0.45;
`

