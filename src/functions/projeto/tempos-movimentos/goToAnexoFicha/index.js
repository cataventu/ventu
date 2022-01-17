import removeTooltipCalendar from '../removeTooltipCalendar';

const goToAnexoFicha = (props, id) => {
  const { history } = props;
  const { id: id_projeto } = props.match.params;

  removeTooltipCalendar();

  const page = `/projeto/painel/${id_projeto}/tempos-movimentos/ficha/${id}/anexo`;
  history.push(page);
};

export default goToAnexoFicha;
