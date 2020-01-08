import styled from 'styled-components'
import { Field } from 'formik'
import {
  Box,
} from '../../../sharedStyles/containers'
import {
  darkBlue,
  blue
} from '../../../sharedStyles/colorPalette'

export const PersonalFormBox = styled(Box)`
  max-width: 450px;
`

export const RadioSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const RadioLabel = styled.label`
  color: ${blue};
  margin: 0;
  border-radius: 5px;
  border: 1.5px solid ${darkBlue};
  text-align: center;
  transition: all 0.25s ease-in-out;
  width: 100%;

  &:hover {
    border: 1.5px solid 
  }
`

export const RadioInput = styled(Field)`
  opacity: 0;
  width: 0;
  height: 0;

  &:active ~ label {
    opacity: 1;
  }

  &:checked ~ label {
    opacity: 1;
    border: none;
    background-color: ${darkBlue};
    color: white;
  }
`

export const RadioInputField = styled.div`
  flex: 0.3;
`