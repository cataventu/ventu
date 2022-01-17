const checkUrl = (page, id_projeto, id_hash) => {
  let url;
  switch (parseInt(page, 10)) {
    case 0: url = `/hotsite/participante/login/${id_projeto}/${id_hash}`; break;
    case 1: url = `/hotsite/participante/dados-pessoais/${id_projeto}/${id_hash}`; break;
    case 2: url = `/hotsite/participante/dados-comerciais/${id_projeto}/${id_hash}`; break;
    case 3: url = `/hotsite/participante/contatos/${id_projeto}/${id_hash}`; break;
    case 4: url = `/hotsite/participante/enderecos/${id_projeto}/${id_hash}`; break;
    case 5: url = `/hotsite/participante/emergencia/${id_projeto}/${id_hash}`; break;
    case 6: url = `/hotsite/participante/passaportes/${id_projeto}/${id_hash}`; break;
    case 7: url = `/hotsite/participante/perfil/${id_projeto}/${id_hash}`; break;
    case 8: url = `/hotsite/participante/anexos/${id_projeto}/${id_hash}`; break;
    case 9: url = `/hotsite/participante/salvar/${id_projeto}/${id_hash}`; break;
    default: url = `/hotsite/participante/login/${id_projeto}/${id_hash}`; break;
  }
  return url;
};

export default checkUrl;
