import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import alterarSenha from '../../../functions/sistema/alterarSenha';
import { showMSG, AlterarSenha, Login } from '../../../components';

import { getDados} from '../../../functions/sistema';

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from 'reactstrap';

function ResetPassword(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
 
  const [antiga, setAntiga] = useState('');
  const [nova1, setNova1] = useState('');
  const [nova2, setNova2] = useState('');

const [form, setForm] = useState({});


useEffect(() => {
  setForm({
    antiga,
    nova1,
    nova2,
    
  });
}, [ antiga, nova1, nova2]
);

console.log('da ficha ta indo:', antiga, nova1, nova2, props.userID )

return (

  <>
    <div className="text-center mt-4">
      <h1 className="h2">Alterar Senha</h1>
      <p className="lead">Digite os dados para alterar sua senha.</p>
    </div>
    <div class="container col-6">
    <Card  className="m-sm-12 col-12" >
      <CardBody className="m-sm-12 col-12 ml-5 " >
        <div className="col-10 text-roxo-ventu center">
          <Form>
            <FormGroup>
            <div className="p-0 m-0 mt-4 h5 text-roxo-ventu text-left hide">
                 <Row>
                 <Col sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Label>{props.userID}</Label>
                    
                  </FormGroup>
                </Col>
                </Row>
                </div>
         
               {/*** SENHA ATUAL ***/}
                 <div className="p-0 m-0 mt-2 h5 text-roxo-ventu text-left">
                 <Row>
                 <Col sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Label>Senha Atual</Label>
                    <Input
                    bsSize="lg"
                      type="password"
                      id="antiga"
                      value={antiga}
                      className="required"
                      maxLength={30}
                      onChange={(e) => setAntiga(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                </Row>
                </div>
                <hr />
               {/*** NOVA SENHA ***/}
               <div className="p-0 m-0 mt-4 h5 text-roxo-ventu text-left">
                 <Row>
                 <Col sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Label>Nova Senha</Label>
                    <Input
                    bsSize="lg"
                      type="password"
                      id="nova1"
                      value={nova1}
                      className="required"
                      maxLength={30}
                      onChange={(e) => setNova1(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                </Row>
                </div>
               {/*** NOVA SENHA CONFIRMA ***/}
               <div className="p-0 m-0 mt-2 h5 text-roxo-ventu text-left">
                 <Row>
                 <Col sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Label>Confirme a Nova Senha</Label>
                    <Input
                    bsSize="lg"
                      type="password"
                      id="nova2"
                      value={nova2}
                      className="required"
                      maxLength={30}
                      onChange={(e) => setNova2(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                </Row>
                </div>

            </FormGroup>
            <div className="p-0 m-0 mt-2 mb-5 h5 text-roxo-ventu text-right">
                <AlterarSenha save={() => alterarSenha(props, form)} />
               
                </div>
            {/* <div className="text-center mt-3">
              <Link to="/dashboard/default">
                <Button color="primary" size="lg">
                  Redefinir
                </Button>
              </Link>
            </div> */}
          </Form>
        </div>
      </CardBody>
    </Card>
    </div>
  </>
);


}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  alterarSenhaFichaData: state.login.alterarSenhaFichaData,  
  googleUserData: state.google.googleUserData,
  gmailClientID: state.google.gmailClientID,
  userID: state.usuario.userID,
  versao: state.sistema.versao,
  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(ResetPassword);
