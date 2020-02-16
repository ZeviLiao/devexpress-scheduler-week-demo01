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

import { appointments } from './demo-data/appointments'

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: 'lightGray',
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

const getTodayMessages = locale => todayLocalizationMessages[locale]

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: appointments,
      currentDate: '2020-02-16',
      locale: 'zh-TW',
    }
    this.currentDateChange = currentDate => {
      this.setState({ currentDate })
    }
  }

  render() {
    const { data, currentDate, locale } = this.state

    return (
      <Paper>
        <Scheduler data={data} height={660} locale={locale}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <WeekView />
          <Toolbar />
          <DateNavigator />
          <TodayButton messages={getTodayMessages(locale)} />
          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
    )
  }
}
