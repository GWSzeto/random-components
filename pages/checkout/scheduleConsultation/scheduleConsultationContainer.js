import React from 'react'
import * as yup from 'yup'
import moment from 'moment'
import _ from 'lodash'
import ScheduleConsultationView from './scheduleConsultationView'

const ScheduleConsultationContainer = ({ goToPage, setConsultationTime }) => {
  // we store the opening hour and 2 hours before closing of
  // each day in an array. 2 hours before, because those are 
  // the only booking hours
  const pharmacyHours = [
    [12, 13], // Sunday
    [10, 16], // Monday
    [10, 16], // Tuesday
    [10, 16], // Wednesday
    [10, 16], // Thursday
    [10, 15], // Friday
    [10, 12], // Saturday
  ]
  // add one since moment().hour() takes the current hour, regardless of the minute, 
  // so don't want 11:59 turning to 11
  const currentHour = moment().hour() + 1 
  const currentDay = moment().day()
  let consultationTimes

  const parseTime = (hour, day) => `${moment(hour, 'H').format('ha')} - ${moment(hour + 1, 'H').format('ha')} ${moment().add(day, 'days').format('MMMM Do YYYY')}`

  // if the current time is before OR during today's closing hours, then display the 
  // times for today and tomorrow by taking the max between the starting time and the current time
  // and taking a range from that point to the end of the day
  if (currentHour < pharmacyHours[currentDay][1]) {
    consultationTimes = [
      _.range(Math.max(currentHour, pharmacyHours[currentDay % 7][0]), pharmacyHours[currentDay % 7][1])
        .map(hour => parseTime(hour, 0)),
      _.range(pharmacyHours[(currentDay + 1) % 7][0], pharmacyHours[(currentDay + 1) % 7][1])
        .map(hour => parseTime(hour, 1))
    ].flat(1)
  }
  // if the current time is after today's opening hours, get tomorrow's time and the
  // day after tomorrow's time
  if (currentHour >= pharmacyHours[currentDay][1]) {
    consultationTimes = [
      _.range(pharmacyHours[(currentDay + 1) % 7][0], pharmacyHours[(currentDay + 1) % 7][1])
        .map(hour => parseTime(hour, 1)),
      _.range(pharmacyHours[(currentDay + 2) % 7][0], pharmacyHours[(currentDay + 2) % 7][1])
        .map(hour => parseTime(hour, 2))
    ].flat(1)
  }

  const initialValues = {
    consultationTime: ''
  }

  const ScheduleConsultationSchema = yup.object().shape({
    consultationTime: yup.string()
      .required('Please select a consultation time frame')
  })

  const onSubmit = (values, actions) => {
    actions.setSubmitting(false)
    const { consultationTime } = values
    setConsultationTime(consultationTime)
    goToPage(1)
  }

  return <ScheduleConsultationView
    consultationTimes={consultationTimes}
    initialValues={initialValues}
    ScheduleConsultationSchema={ScheduleConsultationSchema}
    onSubmit={onSubmit}
    goToPage={goToPage}
  />
}

export default ScheduleConsultationContainer
