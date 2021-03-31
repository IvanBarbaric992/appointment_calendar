import { Typography } from '@material-ui/core';

const Legend = () => (
  <div className="container">
    <div className="container__box">
      <div className="container__box--available" />
      <Typography variant="h6">Available</Typography>
    </div>
    <div className="container__box">
      <div className="container__box--not-available" />
      <Typography variant="h6">Not available</Typography>
    </div>
    <div className="container__box">
      <div className="container__box--reserved" />
      <Typography variant="h6">Reserved</Typography>
    </div>
    <div className="container__box">
      <div className="container__box--lunch" />
      <Typography variant="h6">Lunch time</Typography>
    </div>
    <div className="container__box">
      <div className="container__box--weekend" />
      <Typography variant="h6">Weekend</Typography>
    </div>
  </div>
);

export default Legend;
