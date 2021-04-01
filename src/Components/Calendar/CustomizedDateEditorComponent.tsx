import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const CustomizedDateEditorComponent = (props: AppointmentForm.DateEditorProps) => (
  <AppointmentForm.DateEditor readOnly excludeTime style={{ pointerEvents: 'none' }} {...props} />
);

export default CustomizedDateEditorComponent;
