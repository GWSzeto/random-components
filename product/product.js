import React from 'react'
import Cart from '../../unstated/cart'

// styles
import {
  ProductLayout,
  ProductImageContainer,
  ProductImage,
  ContentContainer,
  ProductPrice,
  ProductTitle,
  ProductSubText,
  CounterContainer,
  CounterSide,
  Counter,
} from './productStyles'

const Product = ({name, genericName, price, src, id}) => {
  const { cart, addToCart, removeFromCart } = Cart.useContainer()
  const quantity = cart[id] ? cart[id].quantity : 0
  const product = {
    name,
    price,
    src,
    id,
    src,
    type: "otc"
  }

  return (
    <ProductLayout>
      <ProductImageContainer>
        <ProductImage src={src} />
      </ProductImageContainer>
      <ContentContainer>
        <ProductPrice>{`$${price}`}</ProductPrice>
        <ProductTitle>{name}</ProductTitle>
        <ProductSubText>{genericName}</ProductSubText>
      </ContentContainer>
      <CounterContainer quantity={quantity}>
        <CounterSide side='left' onClick={() => quantity != 0 && removeFromCart(product)}>-</CounterSide>
        <Counter>{quantity}</Counter>
        <CounterSide side='right' onClick={() => addToCart(product)}>+</CounterSide>
      </CounterContainer>
    </ProductLayout>
  )
}

export default Product
