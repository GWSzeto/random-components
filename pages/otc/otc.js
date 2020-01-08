import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import PageWrapper from '../../components/pageWrapper'
import Product from '../../components/product'

// hooks
import { useFirestore } from '../../Firebase/context'
import { useRouter } from '../../routerHistory/context'
import Cart from '../../unstated/cart'

// styles
import { 
  OtcBody,
  OtcFooter,
  OtcSubTotalContainer,
  OtcSubTotal,
} from './otcStyles'
import { GreenButton } from '../../sharedStyles/buttons'

const Otc = () => {
  const [products, setProducts] = useState(null)
  const firestore = useFirestore()
  const { history } = useRouter()
  const subTotal = Object.values(Cart.useContainer().cart)
    .filter(({ type }) => type === 'otc')
    .reduce((acc, { price, quantity}) => acc + (parseFloat(price) * quantity), 0).toFixed(2)

  useEffect(() => {
    const getOtcProducts = async () => {
      const otcProducts = (await firestore.otcs().get())
        .docs
        .map(doc => doc.data())
      setProducts(otcProducts)
    }
    getOtcProducts()
  }, [])

  return (
    <PageWrapper>
      <OtcBody>
        {products && products.map(({name, genericName, price, image, id}) => (
          <Product 
            name={name}
            genericName={genericName}
            price={price}
            src={image}
            id={id}
            key={v4()}
          />
        ))}
      </OtcBody>
      <OtcFooter>
        <OtcSubTotalContainer>
          <OtcSubTotal>${subTotal}</OtcSubTotal> SubTotal
        </OtcSubTotalContainer>
        <GreenButton onClick={() => history.push('/checkout')}>Checkout</GreenButton>
      </OtcFooter>
    </PageWrapper>
  )
}

export default Otc