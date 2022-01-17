import removeTooltipCalendar from '../removeTooltipCalendar';

const editTM = (props, event) => {

  const { history } = props;
  const { id } = event;
  const { id: id_projeto } = props.match.params;

  removeTooltipCalendar();

  const page = `/projeto/painel/${id_projeto}/tempos-movimentos/ficha/${id}`;
  history.push(page);
};

export default editTM;
