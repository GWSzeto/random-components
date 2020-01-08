import styled from 'styled-components'
import { blue, green } from '../../sharedStyles/colorPalette'

export const UploadButtonContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;
`

export const UploadInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`

export const UploadLabel = styled.label`
  background-color: #578ED2;
  padding: 1rem 2rem;
  color: white;
  border-radius: 15px;
  font-size: 1.5em;
  font-weight: 700;
  cursor: pointer;
`

export const ProgressBarContainer = styled.div`
  width: 60%;

  & > .CircularProgressbar .CircularProgressbar-path {
    stroke: ${({uploadPercentage}) => uploadPercentage < 100 ? blue : green};
  }

  & > .CircularProgressbar .CircularProgressbar-text {
    ${({uploadPercentage}) => uploadPercentage < 100 ? `
      fill: ${blue};
    ` : `
      fill: ${green};
      font-size: 2em;
    `
  }}
`

export const UploadedText = styled.div`
  color: #80A5D6;
  text-align: center;
`
