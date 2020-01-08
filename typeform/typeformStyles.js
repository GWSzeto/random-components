import styled from 'styled-components'
import { Form } from 'formik'
import { darkGray, offWhite } from '../../sharedStyles/colorPalette'

// header styles
export const Header = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
`

export const ArrowContainer = styled.div`
  width: 1.5rem;
  transform: scale(-1, 1);
`

export const Arrow = styled.img`
  max-width: 100%;
  filter: invert(45%) sepia(0%) saturate(138%) hue-rotate(161deg) brightness(97%) contrast(88%);
`

export const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${({position}) => position === 'left' ? 'flex-start' : 'flex-end'};
`

export const LogoContainer = styled.div`
  width: 1.25rem;
`

export const SmallLogo = styled.img`
  max-width: 100%;
`

export const HeaderText = styled.div`
  font-weight: 600;
  font-size: 0.75em;
  color: ${darkGray};
`

export const TypeformForm = styled(Form)`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`

// body styles
export const Body = styled.div`
`

// footer styles
export const ContinueButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 0 1rem;
  padding-bottom: 1rem;
  background-color: ${offWhite};
`

export const ContinueButtonText = styled.div`
  flex: 1;
  margin-left: 1rem;
`

export const SmallArrowContainer = styled.div`
  width: 1rem;
  display: flex;
  filter: brightness(999%);
`

export const OpacityGradient = styled.div`
  height: 4rem;
  background-image: linear-gradient(to bottom, rgb(244, 247, 248, 0), rgb(244, 247, 248, 1));
  position: absolute;
  bottom: 2rem;
`