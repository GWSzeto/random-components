import styled from 'styled-components'
import { 
  blue,
  orange,
} from '../../sharedStyles/colorPalette'

export const Menu = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 75vw;
  z-index: 10;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: all 0.3s ease-in-out;

  @media only screen and (orientation: landscape) {
    width: 25vw;
    /* height: 100vh;
    width: ${({ open }) => open ? '25vw' : '0'};
    display: ${({ open }) => open ? 'block' : 'none'};
    position: static; */
  }
`

export const Image = styled.img`
  max-width: 100%;
`

// profile
export const ProfileContainer = styled.div`
  display: flex;
  background-color: white;
  padding: 1rem;
`

export const ProfileImageContainer = styled.div`
width: 25%;
`

export const ProfileContextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 1rem;
`

export const ProfileGreeting = styled.div`
  color: ${blue};
  font-size: 1.25em;
  font-weight: 700;
`

export const ProfileSubtext = styled.div`
  font-size: 0.75em;
  color: ${orange};
`

// nav bar items
export const NavBarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: ${blue};
  color: white;
`

export const NavBarItem = styled.div`
  display: flex;
  padding: 0.75rem 0;
`

export const ItemImageContainer = styled.div`
  width: 10%;
`

export const ItemName = styled.div`
  display: flex;
  margin-left: 0.75rem;
  font-size: 1.15em;
`
