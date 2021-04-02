import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';

const CustomizedTooltipLayout = (props: AppointmentTooltip.LayoutProps) => {
  const { appointmentMeta } = props;
  return (
    <AppointmentTooltip.Layout
      {...props}
      showOpenButton={!appointmentMeta?.data.isReadOnly}
      showDeleteButton={!appointmentMeta?.data.isReadOnly}
    />
  );
};

export default CustomizedTooltipLayout;
