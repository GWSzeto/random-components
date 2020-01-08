import styled from 'styled-components'
import { 
  PageLayout,
  Header,
} from '../../sharedStyles/containers'
import {
  lightBlue,
  blue,
} from '../../sharedStyles/colorPalette'

export const PageWrapperLayout = styled(PageLayout)`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
`

export const Overlay = styled.div`
  position: fixed; 
  width: 100%; 
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2; 
  transition: all 0.1s ease-in;
  overflow-y: scroll;
  background-color: rgba(0,0,0,0.5);
  display: ${({ open }) => open ? 'block' : 'none'};

  /* @media only screen and (orientation: landscape) {
    position: static;
    background-color: transparent;
    & > div {
      opacity: 1;
    }
  } */

`

export const PageWrapperHeader = styled(Header)`
  padding: 0.5rem;
  background-color: ${blue};
`

export const BurgerContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

export const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

export const CartContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > img {
    width: 2.25rem;
  }
`

export const WhiteImage = styled.img`
  max-width: 100%;
  filter: invert(99%) sepia(1%) saturate(236%) hue-rotate(41deg) brightness(119%) contrast(100%);

  @media only screen and (orientation: landscape) {
    width: 3rem;
  }
`

export const LogoImage = styled.img`
  max-width: 80%;

  @media only screen and (orientation: landscape) {
    max-width: 35%;
  }
`

export const CartCircle = styled.div`
  position: relative;
  bottom: 0.6rem;
  left: 1rem;
  color: white;
  z-index: 1;
  display: flex;
  justify-content: center;
  background-color: ${lightBlue};
  align-items: center;
  border-radius: 100%;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.85em;
  font-weight: 700;
`
