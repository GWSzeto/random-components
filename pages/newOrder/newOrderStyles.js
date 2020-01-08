import styled from 'styled-components'
import { Body } from '../../sharedStyles/containers'

export const NewOrderBody = styled(Body)`
  flex-flow: column nowrap;
  margin: 0 1rem;
  justify-content: flex-start;

  @media only screen and (orientation: landscape) {
    max-width: 500px;
    margin: auto;
  }
`

export const OptionCard = styled.div`
  display: flex;
  border: none;
  border-radius: 25px;
  background-color: ${props => props.background};
  color: white;
  margin-top: 1rem;
  padding: 1.5rem 0;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  flex: 0.15;
`

export const Icon = styled.img`
  max-width: 100%;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 0.7;
`

export const DescriptionTitle = styled.div`
  font-weight: 700;
`

export const DescriptionSubText = styled.div`
  font-size: 0.75em;
`

export const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.15;
`

export const Arrow = styled.img`
  max-width: 100%;
  filter: invert(100%) sepia(0%) saturate(7482%) hue-rotate(72deg) brightness(99%) contrast(99%);
`