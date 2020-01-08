import React from 'react'
import styled from 'styled-components'

const Circle = styled.circle`
  stroke-dashoffset: ${({progress}) =>  progress};
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`

const ProgressCircle = ({ radius, stroke, progress = 25 }) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progress/100 * circumference
  return (
    <svg
    width={radius * 2}
    height={radius * 2}>
      <Circle
        progress={strokeDashoffset}
        strokeDasharray={circumference + ' ' + circumference}
        strokeWidth={stroke}
        stroke="blue"
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  )
}

export default ProgressCircle