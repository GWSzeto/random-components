import React, { forwardRef } from 'react'
import { v4 } from 'uuid'

// hooks
import { useRouter } from '../../routerHistory/context'
import { useAuth } from '../../Firebase/context'
import User from '../../unstated/user'

// styles
import {
  Menu,
  ProfileContainer,
  ProfileImageContainer,
  ProfileContextContainer,
  ProfileGreeting,
  NavBarContainer,
  NavBarItem,
  ItemImageContainer,
  Image,
  ItemName,
  ProfileSubtext,
} from './navBarStyles'

const topNavBarOptions = [
  {
    name: 'New Order',
    src: '/images/assets/new_order.svg',
    path: '/new'
  },
  {
    name: 'My Prescriptions',
    src: '/images/assets/my_medications.svg',
    path: '/prescriptions',
  },
  {
    name: 'Past Orders',
    src: '/images/assets/past_orders.svg',
    path: '/orders',
  },
]

const bottomNavBarOptions = [
  // {
  //   name: 'Terms & Privacy',
  //   src: '/images/assets/terms_and_privacy.svg',
  //   path: '/terms-and-privacy',
  // },
  // {
  //   name: 'Contact Us',
  //   src: '/images/assets/contact_us.svg',
  //   path: '/contact-us',
  // },
  {
    name: 'Sign Out',
    src: '/images/assets/signout.svg',
    path: '/sign-out',
  },
] 

const NavBar = forwardRef(({ open, setOpen }, ref) => {
  const { history } = useRouter()
  const { signOut } = useAuth()
  const { firstName } = User.useContainer().user

  const goToPath = path => {
    if (path === '/sign-out') signOut()
    history.push(path)
    setOpen(false)
  }

  return (
    <div ref={ref}>
      <Menu open={open}>
        <ProfileContainer onClick={() => goToPath('/profile')}>
          <ProfileImageContainer>
            <Image src='/images/assets/profile.svg'/>
          </ProfileImageContainer>
          <ProfileContextContainer>
            <ProfileGreeting>Hi, {firstName}!</ProfileGreeting>
            <ProfileSubtext>My Account</ProfileSubtext>
          </ProfileContextContainer>
        </ProfileContainer>
        <NavBarContainer>
          <div>
            {topNavBarOptions.map(({ name, src, path }) => (
              <NavBarItem key={v4()} onClick={() => goToPath(path)}>
                <ItemImageContainer>
                  <Image src={src}/>
                </ItemImageContainer>
                <ItemName>{name}</ItemName>
              </NavBarItem>
            ))}
          </div> 
          <div>
            {bottomNavBarOptions.map(({ name, src, path }) => (
              <NavBarItem key={v4()} onClick={() => goToPath(path)}>
                <ItemImageContainer>
                  <Image src={src}/>
                </ItemImageContainer>
                <ItemName>{name}</ItemName>
              </NavBarItem>
            ))}
          </div> 
        </NavBarContainer> 
      </Menu>
    </div>
  )
})

export default NavBar
