import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const CustomizedTextEditorComponent = (props: AppointmentForm.TextEditorProps) => {
  const { type } = props;
  if (type === 'titleTextEditor') {
    return <AppointmentForm.TextEditor {...props} placeholder="Enter your first and last name" />;
  }
  return <AppointmentForm.TextEditor {...props} />;
};
export default CustomizedTextEditorComponent;
