import styled from 'styled-components'
import { Field } from 'formik'
import { darkBlue, blue } from '../../sharedStyles/colorPalette';
import { BlueButton } from '../../sharedStyles/buttons';
import { Box } from '../../sharedStyles/containers';

export const ProfileBox = styled(Box)`
  flex: 1;

  @media only screen and (orientation: landscape) {
    max-width: 600px;
  }
`

export const ProfileTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ProfileSubTitleContainer = styled.div`
  margin-top: 1rem;
`

export const ProfileTitle = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`

export const EditButton = styled(BlueButton)`
  font-size: 0.8em;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 1rem;
`

export const InfoSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 1rem;
`


export const InfoName = styled.div`
  font-weight: 700;
  color: ${blue};
  margin-bottom: -0.35rem;
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