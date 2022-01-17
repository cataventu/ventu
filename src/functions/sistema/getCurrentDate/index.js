import moment from 'moment';

const getCurrentDate = () => {
  const today = moment(Date.now()).format('L');
  return today;
};

export default getCurrentDate;
