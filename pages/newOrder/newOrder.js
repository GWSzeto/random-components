import React from 'react'
import PageWrapper from '../../components/pageWrapper'
import { v4 } from 'uuid'

import { useRouter } from '../../routerHistory/context'

// styles
import {
  NewOrderBody,
  OptionCard,
  IconContainer,
  Icon,
  DescriptionContainer,
  DescriptionTitle,
  DescriptionSubText,
  ArrowContainer,
  Arrow,
} from './newOrderStyles'
import {
  darkPink,
  darkOrange,
  darkGreen,
  darkViolet,
} from '../../sharedStyles/colorPalette'

const orderOptions = [
  {
    title: "Upload Prescription",
    description: "Snap a photo or upload an image of your prescription!",
    background: darkPink,
    src: "/images/assets/upload.svg",
    path: "/upload",
  },
  {
    title: "Transfer Prescription",
    description: "Let us know which pharmacy has your prescription and we'll handle the transfer!",
    background: darkOrange,
    src: "/images/assets/transfer.svg",
    path: "/transfer",
  },
  {
    title: "Non-Prescriptions",
    description: "Browse our selection of OTC medications like Tylenol, Tums and more!",
    background: darkGreen,
    src: "/images/assets/OTC.svg",
    path: "/otc",
  },
  {
    title: "Refill Prescriptions",
    description: "Request a refill on a current prescription you may have on MedMe",
    background: darkViolet,
    src: "/images/assets/refill.svg",
    path: "/refill",
  },
]

const NewOrder = () => {
  const { history } = useRouter()

  return (
    <PageWrapper>
      <NewOrderBody>
        {orderOptions.map(({ title, description, background, src, path }) => (
          <OptionCard background={background} key={v4()} onClick={() => history.push(path)}>
            <IconContainer>
              <Icon src={src}/>
            </IconContainer>
            <DescriptionContainer>
              <DescriptionTitle>{title}</DescriptionTitle>
              <DescriptionSubText>{description}</DescriptionSubText>
            </DescriptionContainer>
            <ArrowContainer>
              <Arrow src='/images/assets/iconmonstr-arrow-24.svg'/>
            </ArrowContainer>
          </OptionCard>
        ))}
      </NewOrderBody> 
    </PageWrapper>
  )
}

export default NewOrder