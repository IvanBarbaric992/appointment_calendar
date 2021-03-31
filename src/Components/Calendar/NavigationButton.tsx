import React from 'react';

import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';

interface NavigationButtonPropsExtended extends DateNavigator.NavigationButtonProps {
  // eslint-disable-next-line no-unused-vars
  handleNavigation(e: { [key: string]: unknown }): void;
}

const Navigation = (props: NavigationButtonPropsExtended) => {
  const { handleNavigation, ...rest } = props;
  return <DateNavigator.NavigationButton {...rest} onClick={handleNavigation} />;
};
export default Navigation;
