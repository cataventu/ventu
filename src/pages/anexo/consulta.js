///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../components';
import { getConsultaAnexo } from '../../functions/anexo';

///////// ANEXO ///////////////
/////////////////////////////////
function AnexoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  // const [id_pfisica, set_id_pfisica] = useState(0);
  // const [id_pjuridica, set_id_pjuridica] = useState(0);
  // const [id_projeto, set_id_projeto] = useState(0);
  // const [id_proservico, set_id_proservico] = useState(0);
  // const [id_tempomov, set_id_tempomov] = useState(0);
  // const [id_movimento, set_id_movimento] = useState(0);

  const [nome, set_nome] = useState('');
  const [data, set_data] = useState('');
  const [titulo, set_titulo] = useState('');
  const [extensao, set_extensao] = useState('');
  const [tamanho, set_tamanho] = useState('');
  const [arquivo, set_arquivo] = useState('');

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      const { dispatch } = props;
      dispatch({ type: '@RESET_ANEXO_FILE' });
      const id = props.match.params.idAnexo;
      getConsultaAnexo(props, id)
      setFirst(false);
    }
  }, [props, firstLoad,]);

  useEffect(() => {
    const { 
            id,
            // id_pfisica,
            // id_pjuridica,
            // id_projeto,
            // id_proservico,
            // id_tempomov,
            // id_movimento,
            nome,
            data,
            titulo,
            extensao,
            tamanho,
            arquivo 
          } = props.anexoConsulta;

          if (id > 0) {

              setId(id);
              // setSituacao(formatSituacao(situacao));
              // setInc_dusuario(inc_dusuario);
              // setInc_dhsis(formatData(inc_dhsis));
              // setAlt_dusuario(alt_dusuario);
              // setAlt_dhsis(formatData(alt_dhsis));
              // set_id_pfisica(id_pfisica);
              // set_id_pjuridica(id_pjuridica);
              // set_id_projeto(id_projeto);
              // set_id_proservico(id_proservico);
              // set_id_tempomov(id_tempomov);
              // set_id_movimento(id_movimento);
              set_nome(nome);
              set_data(data);
              set_titulo(titulo);
              set_tamanho(tamanho);
              set_extensao(extensao);
             
              if (extensao === '.jpg' || extensao === '.gif' || extensao === '.png' || extensao === '.jpeg'){
                let codifica = (                    
                <img width="50%" src={`data:image/gif;base64, ${arquivo}`}  />         
                );
                set_arquivo(codifica);
              }
              if (extensao === '.pdf' ){
                let codifica = (
                  <iframe width="100%" height="1000px" src={`data:application/pdf;base64, ${arquivo}`}  />   
                  );
                  set_arquivo(codifica);
              }
              if (extensao === '.doc' || extensao === '.docx' || extensao === '.xlsx' || extensao === '.xls' || extensao === '.ppt' || extensao === '.pptx' || extensao === '.ppsx'  ){
                
                  set_arquivo( <h4><i>Documento disponível somente para Download</i></h4>
                  
       
                  );
                
              }
             
            }
          }, [props.anexoConsulta]);
         
  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Anexo" />
            <Row className="p-0 m-0">
            <Col>
              <div className="pb-2" align="center" >
                {arquivo}
              </div>
            </Col>
            </Row>
            <ConsultaFooter />
          </div>
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  anexoFichaData: state.anexo.anexoFichaData,
  anexoConsulta: state.anexo.anexoConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(AnexoConsulta);
