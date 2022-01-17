import api from '../../../../services/api';
import { formatData } from '../../../sistema';
import setNomeReserva from '../../../cadastro/pessoa-fisica/setNomeReserva';
import setNomeCracha from '../../../cadastro/pessoa-fisica/setNomeCracha';

async function save(url, form, props) {
  const { dispatch, history } = props;
  const res = await api.put(url, form, { auth: props.auth });
  dispatch({ type: '@HOTSITE_PARTICIPANTE_ID_PFISICA', payload: res.data.retorno });

  const { id_projeto, id_hash } = props.match.params;
  history.push(`/hotsite/participante/fim/${id_projeto}/${id_hash}`);
}

const saveDadosPessoais = (props) => {
  //console.log('1 - Save DadosPessoais');

  const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));
  const { id_pfisica } = userData;

  const step_1 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_DADOS_PESSOAIS'));
  const {
    cpf,
    dt_nascimento,
    estado_civil,
    genero,
    nac_id_pais,
    nacionalidade,
    pro_id_aeroporto,
    pro_aeroporto,
    nome_completo,
    nome_cracha,
    nome_reserva,
    rg,
    rne,
  } = step_1;

  let _nome_reserva; let
    _nome_cracha;
  nome_reserva === '' ? _nome_reserva = setNomeReserva(nome_completo) : _nome_reserva = nome_reserva;
  nome_cracha === '' ? _nome_cracha = setNomeCracha(nome_completo) : _nome_cracha = nome_cracha;

  const form = {
    id: id_pfisica,
    cpf,
    dt_nascimento: formatData(dt_nascimento),
    estado_civil,
    genero,
    nac_id_pais,
    nacionalidade,
    pro_id_aeroporto,
    pro_aeroporto,
    nome_completo,
    nome_cracha: _nome_cracha,
    nome_reserva: _nome_reserva,
    situacao: true,
    rg,
    rne,
    inc_usuario: 0,
    alt_usuario: 0,
  };

  const url = '/TsmPFISICA/PESSOAL_GRAVA';
  save(url, form, props);
};

export default saveDadosPessoais;
