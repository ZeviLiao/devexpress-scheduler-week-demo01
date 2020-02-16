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

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: appointments,
      currentDate: '2020-02-16',
    }
    this.currentDateChange = currentDate => {
      this.setState({ currentDate })
    }
  }

  render() {
    const { data, currentDate } = this.state

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <WeekView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments appointmentComponent={Appointment} />
        </Scheduler>
      </Paper>
    )
  }
}
