import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { appointments } from './demo-data/appointments'
import moment from 'moment'
// import getQueryVariable from './getQueryVariable'

const style = theme => ({
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
  },
})

const TimeTableCellBase = ({ classes, ...restProps }) => {
  const { startDate } = restProps
  const date = new Date(startDate)
  if (date.getDate() === new Date().getDate()) {
    return (
      <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />
    )
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />
    )
  }
  return <WeekView.TimeTableCell {...restProps} />
}

const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(
  TimeTableCellBase
)

const Appointment = ({ children, style, data, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: data.title === 'Meeting' ? 'lightGray' : 'blue',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
)

const todayLocalizationMessages = {
  'zh-TW': {
    today: '今天',
  },
}

const DayScaleCellBase = ({ classes, ...restProps }) => {
  const { startDate, today } = restProps
  if (today) {
    return <WeekView.DayScaleCell {...restProps} className={classes.today} />
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />
  }
  return <WeekView.DayScaleCell {...restProps} />
}
const getTodayMessages = locale => todayLocalizationMessages[locale]
const DayScaleCell = withStyles(style, { name: 'DayScaleCell' })(
  DayScaleCellBase
)

const TimeScaleLabel = ({ formatDate, ...restProps }) => {
  return (
    <WeekView.TimeScaleLabel
      {...restProps}
      formatDate={t => {
        return moment(t).format('HH')
      }}
    />
  )
}

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: appointments,
      locale: 'en-US', //'zh-TW',
    }
  }

  render() {
    const { data, locale } = this.state

    return (
      <Paper>
        <Scheduler data={data} height={453} locale={locale}>
          <ViewState />
          <WeekView
            startDayHour={10}
            endDayHour={22}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
            cellDuration={60}
            formatDate={'HH:00'}
            timeScaleLabelComponent={TimeScaleLabel}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton messages={getTodayMessages(locale)} />
          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
    )
  }
}
