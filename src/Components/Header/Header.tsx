import { AppBar, Toolbar, Typography } from '@material-ui/core';

import './Header.scss';

const Header = () => (
  <AppBar position="static" className="header">
    <Toolbar className="header__toolbar">
      <Typography variant="h6" className="header__toolbar__title">
        React Appointment Calendar
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
