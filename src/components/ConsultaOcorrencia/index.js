///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getDados, formatDataInput, formatData } from '../../functions/sistema';

function ConsultaOcorrencia({ props }) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);

  const [inc_dusuario, setInc_dusuario] = useState(0);
  const [inc_dhsis, setInc_dhsis] = useState(0);
  const [alt_dusuario, setAlt_dusuario] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);

  const [id_pfisica, setId_pfisica] = useState(0);
  const [pfisica, setPfisica] = useState('');
  //const [disablePfisica, setDisablePfisica] = useState(false);

  const [id_pjuridica, setId_pjuridica] = useState(0);
  const [pjuridica, setPjuridica] = useState('');
  //const [disablePjuridica, setDisablePjuridica] = useState(false);

  //const [id_Projeto, setId_Projeto] = useState(0);
  const [projeto, setProjeto] = useState('');
  //const [disableProjeto, setDisableProjeto] = useState(false);

  const [data, setData] = useState('');
  const [hora, setHora] = useState('00:00');
  const [dt_solucao, setDt_solucao] = useState('');
  //const [status, setStatus] = useState('');
  const [dstatus, setDstatus] = useState('');

  const [texto, setTexto] = useState('');

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getDados(props, `/TsmOCORRENCIA/FICHA/${id}`, '@GET_OCORRENCIA_FICHA');
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, id_pfisica, id_pjuridica, pfisica, pjuridica, projeto, data,
      dt_solucao, dstatus, texto, inc_dusuario,
      inc_dhsis, alt_dusuario, alt_dhsis,
    } = props.fichaData;
    if (id > 0) {
      //const _dt_solucao = formatDataInput(dt_solucao.substring(0,10));
      const _data = formatDataInput(data.substring(0, 10));
      const _hora = data.substring(11, 16);

      setId(id);
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));

      setId_pfisica(id_pfisica);
      setId_pjuridica(id_pjuridica);

      setPfisica(pfisica);
      setPjuridica(pjuridica);
      setProjeto(projeto);
      setData(formatData(_data));
      setHora(_hora);
      setDt_solucao(dt_solucao.substring(0, 10));
      //setStatus(status)
      setDstatus(dstatus);
      setTexto(texto);
    }
  }, [props]);

  return (
    <>
      <Row className="p-0 m-0">
        <Col sm={7}>
          {/*PROJETO */}
          <Row className="pl-3 h5 pt-1 text-left">
            <Col sm={12}>
              <span className="pr-3 text-black">Projeto:</span>
              <span className="text-muted">{ projeto }</span>
            </Col>
          </Row>
          {/*DATA */}
          <Row className="pl-3 h5 pt-1 text-left">
            <Col sm={12}>
              <span className="pr-3 text-black">Data:</span>
              <span className="text-muted">{ data }</span>
            </Col>
          </Row>
          {/*HORA */}
          <Row className="pl-3 h5 pt-1 text-left">
            <Col sm={12}>
              <span className="pr-3 text-black">Hora:</span>
              <span className="text-muted">{ hora }</span>
            </Col>
          </Row>
          {/*PF */}
          <Row className="pl-3 h5 pt-1 text-left">
            <Col sm={12}>
              <span className="pr-3 text-black">Pessoa Física:</span>
              <Link className="text-blue" to={`/cadastro/pessoa-fisica/consulta/${id_pfisica}`}>
                { pfisica }
              </Link>
            </Col>
          </Row>
          {/*PJ */}
          <Row className="pl-3 h5 pt-1 text-left">
            <Col sm={12}>
              <span className="pr-3 text-black">Pessoa Jurídica:</span>
              <span className="text-muted">
                <Link className="text-blue" to={`/cadastro/pessoa-juridica/consulta/${id_pjuridica}`}>
                  { pjuridica }
                </Link>
              </span>
            </Col>
          </Row>
          {/*STATUS */}
          <Row className="pl-3 h5 pt-1 text-left">
            <Col sm={12}>
              <span className="pr-3 text-black">Status:</span>
              <span className="text-muted">{ dstatus }</span>
            </Col>
          </Row>
          {/*DT SOLUCAO */}
          <Row className="pl-3 h5 pt-1 text-left">
            <Col sm={12}>
              <span className="pr-3 text-black">Data Solução:</span>
              <span className="text-muted">{ dt_solucao }</span>
            </Col>
          </Row>
        </Col>
        <Col sm={5}>
          {/*ID */}
          <Row className="pr-4 h6 text-right">
            <Col sm={12}>
              <small>
                <span className="pr-3 text-black">Id:</span>
                <span className="text-muted">{ id }</span>
              </small>
            </Col>
          </Row>
          {/*INCLUSAO */}
          <Row className="pr-4 h6 text-right">
            <Col sm={12}>
              <small>
                <span className="pr-3 text-black">Inclusão:</span>
                <span className="text-muted">
                  { inc_dusuario }
                  {' '}
-
                  {' '}
                  { inc_dhsis }
                </span>
              </small>
            </Col>
          </Row>
          {/*ATUALIZACAO */}
          <Row className="pr-4 h6 text-right">
            <Col sm={12}>
              <small>
                <span className="pr-3 text-black">Atualização:</span>
                <span className="text-muted">
                  { alt_dusuario }
                  {' '}
-
                  {' '}
                  { alt_dhsis }
                </span>
              </small>
            </Col>
          </Row>
        </Col>
        <Col sm={12}>
          {/*TEXTO */}
          <Row className="pl-3 h5 pt-1 text-left">
            <Col sm={12}>
              <span className="pr-3 text-black">Texto:</span>
              <span className="text-muted">{ texto }</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default ConsultaOcorrencia;
