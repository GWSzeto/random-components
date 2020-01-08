import styled from 'styled-components'
import { 
  blue,
  green,
} from '../../sharedStyles/colorPalette';

export const ProductLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 15px;
  box-shadow: 2px 2px 10px 1px #e6e6e6;
  width: 45%;
  margin: 0.5rem;

  @media screen and (orientation: landscape) {
    width: 30%;
  }
`

// image
export const ProductImageContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
`

export const ProductImage = styled.img`
  max-width: 100%;
`

// content
export const ContentContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 0.5rem;
`

export const ProductPrice = styled.div`
  font-size: 1.25em;
  font-weight: 700;
`

export const ProductTitle = styled.div`
  font-size: 0.75em;
  font-weight: 700;
  flex: 0.35;
`

export const ProductSubText = styled.div`
  font-size: 0.65em;
  flex: 0.15;
`

// counter
export const CounterSide = styled.div`
  display: flex;
  flex: 0.4;
  justify-content: center;
  color: white;
  padding: 0.25rem;
  border-radius: ${props => props.side == "left" ? "0 0 0 15px" : "0 0 15px 0"};

  @media screen and (orientation: landscape) {
    flex: 0 1 auto;
    width: 3rem;
    border-radius: ${props => props.side == "left" ? "15px 0 0 15px" : "0  15px 15px 0"};
  }
`

export const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.75rem;
  flex: 0.2;

  @media screen and (orientation: landscape) {
    flex: 0 1 auto;
    width: 3rem;
  }
`

export const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.35em;
  margin-top: 0.75rem;

  & > ${CounterSide} {
    transition: all 0.2s ease;
    background-color: ${props => props.quantity > 0 ? blue : green}
  }

  & > ${Counter} {
    transition: all 0.2s ease;
    color: ${props => props.quantity > 0 ? blue : green}
  }
`
