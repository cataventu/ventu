import { getExcel } from '../../../sistema';

const geraDossie = async (props, form) => {
  const url = '/tsmDOSSIE/EXCEL';
  getExcel(props, url, form);
};

export default geraDossie;
