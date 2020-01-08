import styled from 'styled-components'
import { Body } from '../../sharedStyles/containers'
import { blue } from '../../sharedStyles/colorPalette';

export const OtcBody = styled(Body)`
  align-items: flex-start;
  flex-flow: row wrap;
  margin-bottom: 3.5rem;

  @media screen and (orientation: landscape) {
    padding: 1rem 5rem;
  }
`

export const OtcFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  align-items: baseline;
  background-color: ${blue};
  border-radius: 15px 15px 0 0;
  height: 3.5rem;
  padding: 0 1.5rem;
  color: white;
`

export const OtcSubTotalContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  margin-right: 0.5rem;
`

export const OtcSubTotal = styled.div`
  font-weight: 700;
  margin-right: 0.5rem;
`
