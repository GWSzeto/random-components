import styled from 'styled-components'
import { SubText } from '../../../sharedStyles/text'
import { 
  darkBlue
} from '../../../sharedStyles/colorPalette'

export const Resend = styled(SubText)`
  font-size: 0.8em;
  color: ${darkBlue};
  text-decoration: underline;
  transition: all ease 0.2s;

  &:hover{
    color: #27aae1;
  }
`

export const ButtonContainer = styled.div`
  display: flex;

  @media screen and (orientation: landscape){
    height: 3rem;
    margin-top: 1rem;
    flex-flow: row nowrap;
    justify-content: space-around;

    & > button {
      margin: 0;
    }
  }
  @media screen and (orientation: portrait){
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-end;
  }
`