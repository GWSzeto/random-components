import styled from 'styled-components'
import { Form, Field } from 'formik'

// general styles
export const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border: 2px solid black;
`

export const Title = styled.div`
  font-size: 2em;
`

export const SubTitle = styled.div`
 font-size: 1.5em;
 margin: 0.5em 0;
`

export const InfoWrapper = styled.div`
  display: flex;
`

// user info styles
export const InfoFieldsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 0.5;
`

export const ImageContainer = styled.div`
  display: flex;
  flex: 0.5;
  flex-flow: column nowrap;
`

export const Image = styled.img`
  max-width: 100%;
  max-height: auto;
`

export const InfoField = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FieldName = styled.div`
  font-weight: 900;
`

export const FieldValue = styled.div`
`

// OTC styles
export const OtcContainer = styled.div`
  margin-top: 1rem;
`

export const TotalContainer = styled.div`
  margin-top: 1rem;
  font-size: 1.5em;
`

// prescription Input styles
export const FormWrapper = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
`

export const LabelInputField = styled.div`
  display: flex;
`

export const Label = styled.label`
  flex: 0.25;
  font-weight: 900;
`

export const Input = styled(Field)`
  flex: 0.75;
`

export const InputList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-left: 2em;
`

export const Button = styled.div`
  border-radius: 5px;
  border: 1px solid #6d6d6d;
  color: #6d6d6d;
  margin-top: 1em;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const BigButton = styled(Button)`
  font-size: 1.5em;
  transition: all 0.25s ease;
  margin: 1em;

  &:hover {
    color: #2AB8DE;
    text-decoration: none;
    border: 1px solid #2AB8DE;
  }
`

export const Submit = styled.button`
  background: none;
  border-radius: 5px;
  border: 1px solid #6d6d6d;
  color: #6d6d6d;
  transition: all 0.25s ease;
  font-size: 1.5em;
  margin: 1em;

  &:hover {
    color: #2AB8DE;
    text-decoration: none;
    border: 1px solid #2AB8DE;
  }
`