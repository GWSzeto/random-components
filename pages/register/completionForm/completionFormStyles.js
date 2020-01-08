import styled from 'styled-components'
import { Field } from 'formik'
import {
  Box,
} from '../../../sharedStyles/containers'
import { blue } from '../../../sharedStyles/colorPalette'

export const CompletionFormBox = styled(Box)`
  text-align: center;
  padding: 1rem;

  @media only screen and (orientation: landscape) {
    max-width: 500px;
  }
`

export const CenteredCheckboxField = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  justify-content: center;
`

export const Checkbox = styled(Field)`
  margin-right: 0.5rem;
`

export const CheckboxLabel = styled.label`
  color: ${blue};
  margin: 0;
  white-space: nowrap;
`
