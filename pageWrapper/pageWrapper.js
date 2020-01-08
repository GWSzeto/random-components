import React, { useState, useEffect, useRef } from 'react'
import NavBar from '../navBar'

// hooks
import { useRouter } from '../../routerHistory/context'
import Cart from '../../unstated/cart'

// styles 
import { 
  PageWrapperLayout,
  PageWrapperHeader,
  BurgerContainer,
  LogoContainer,
  CartContainer,
  WhiteImage,
  LogoImage,
  Overlay,
  CartCircle,
} from './pageWrapperStyles'

const PageWrapper = ({ children }) => {
  const [open, setOpen] = useState(false)
  const node = useRef()
  const { quantity } = Cart.useContainer()
  const { history } = useRouter()

  useEffect(() => {
    const listener = event => {
      if (!node.current || node.current.contains(event.target)) {
        return
      }
      setOpen(false)
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [node, setOpen])

  return (
    <PageWrapperLayout>
      <NavBar ref={node} open={open} setOpen={setOpen}/>
      <Overlay open={open}/>
      <PageWrapperHeader>
        <BurgerContainer onClick={() => setOpen(!open)}>
          <WhiteImage src='/images/assets/hamburger.svg'/>
        </BurgerContainer>
        <LogoContainer>
          <LogoImage src='/images/assets/logo_white.svg'/>
        </LogoContainer>
        <CartContainer onClick={() => history.push('/checkout')}>
          {quantity !== 0 && <CartCircle>{quantity}</CartCircle>}
          <WhiteImage src='/images/assets/cart.svg'/>
        </CartContainer>
      </PageWrapperHeader>
      {children}
    </PageWrapperLayout>
  )
}

export default PageWrapper
