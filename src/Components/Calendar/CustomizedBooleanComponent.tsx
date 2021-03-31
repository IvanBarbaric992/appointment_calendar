import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const CustomizedBooleanComponent = (props: AppointmentForm.BooleanEditorProps) => {
  const { label } = props;
  if (label) {
    return null;
  }
  return <AppointmentForm.BooleanEditor {...props} />;
};
export default CustomizedBooleanComponent;
