import { ThemeProvider } from '@material-ui/core';

import Layout from 'Components/Layout';
import AppointmentCalendar from 'pages/AppointmentCalendar';
import theme from 'styles/theme';

import 'styles/index.scss';

const App = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <AppointmentCalendar />
    </Layout>
  </ThemeProvider>
);

export default App;
