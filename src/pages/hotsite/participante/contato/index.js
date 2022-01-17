///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Input,
} from 'reactstrap';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { getPagina, newFormatCelular } from '../../../../functions/sistema';
import Header from '../_header';

function Hotsite(props) {
  const stepAtual = 3;
  const id_hash = props.match.params.id;

  const [firstLoad, setFirst] = useState(true);
  const [campos, set_campos] = useState({});

  const [id_fone, set_id_fone] = useState(0);
  const [descricao_fone, set_descricao_fone] = useState('');
  const [tipo_fone, set_tipo_fone] = useState('FONE');
  const [fone, set_fone] = useState('');

  const [id_celular, set_id_celular] = useState(0);
  const [descricao_celular, set_descricao_celular] = useState('');
  const [tipo_celular, set_tipo_celular] = useState('CELULAR');
  const [celular, set_celular] = useState('');

  const [id_email, set_id_email] = useState(0);
  const [descricao_email, set_descricao_email] = useState('');
  const [tipo_email, set_tipo_email] = useState('E-MAIL');
  const [email, set_email] = useState('');

  const [id_facebook, set_id_facebook] = useState(0);
  const [descricao_facebook, set_descricao_facebook] = useState('');
  const [tipo_facebook, set_tipo_facebook] = useState('FACEBOOK');
  const [facebook, set_facebook] = useState('');

  const [id_instagram, set_id_instagram] = useState(0);
  const [descricao_instagram, set_descricao_instagram] = useState('');
  const [tipo_instagram, set_tipo_instagram] = useState('INSTAGRAM');
  const [instagram, set_instagram] = useState('');

  const [id_twitter, set_id_twitter] = useState(0);
  const [descricao_twitter, set_descricao_twitter] = useState('');
  const [tipo_twitter, set_tipo_twitter] = useState('TWITTER');
  const [twitter, set_twitter] = useState('');

  const [visibility_fone, set_visibility_fone] = useState('hide');
  const [visibility_celular, set_visibility_celular] = useState('hide');
  const [visibility_email, set_visibility_email] = useState('hide');
  const [visibility_facebook, set_visibility_facebook] = useState('hide');
  const [visibility_instagram, set_visibility_instagram] = useState('hide');
  const [visibility_twitter, set_visibility_twitter] = useState('hide');

  const [required_fone, set_required_fone] = useState('');
  const [required_celular, set_required_celular] = useState('');
  const [required_email, set_required_email] = useState('');
  const [required_facebook, set_required_facebook] = useState('');
  const [required_instagram, set_required_instagram] = useState('');
  const [required_twitter, set_required_twitter] = useState('');

  const updateCampos = useCallback((ws, store) => {
    let ficha;
    ////// CASO WS
    if (store === null) {
      ficha = ws;
      const { rcontato_regs } = ficha;

      rcontato_regs.forEach((item) => {
        switch (item.tipo) {
          case 1:
            set_fone(item.endereco);
            set_id_fone(item.id);
            set_descricao_fone(item.descricao);
            break;
          case 2:
            set_celular(item.endereco);
            set_id_celular(item.id);
            set_descricao_celular(item.descricao);
            break;
          case 3:
            set_email(item.endereco);
            set_id_email(item.id);
            set_descricao_email(item.descricao);
            break;
          case 4:
            set_facebook(item.endereco);
            set_id_facebook(item.id);
            set_descricao_facebook(item.descricao);
            break;
          case 5:
            set_instagram(item.endereco);
            set_id_instagram(item.id);
            set_descricao_instagram(item.descricao);
            break;
          case 6:
            set_twitter(item.endereco);
            set_id_twitter(item.id);
            set_descricao_twitter(item.descricao);
            break;
          default:
        }
      });

      ////// CASO STORE
    } else {
      ficha = store;

      const {
        celular,
        descricao_celular,
        descricao_email,
        descricao_facebook,
        descricao_fone,
        descricao_instagram,
        descricao_twitter,
        email,
        facebook,
        fone,
        id_celular,
        id_email,
        id_facebook,
        id_fone,
        id_instagram,
        id_twitter,
        instagram,
        tipo_celular,
        tipo_email,
        tipo_facebook,
        tipo_fone,
        tipo_instagram,
        tipo_twitter,
        twitter,
      } = ficha;

      set_fone(fone);
      set_id_fone(id_fone);
      set_tipo_fone(tipo_fone);
      set_descricao_fone(descricao_fone);

      set_celular(celular);
      set_id_celular(id_celular);
      set_tipo_celular(tipo_celular);
      set_descricao_celular(descricao_celular);

      set_email(email);
      set_id_email(id_email);
      set_tipo_email(tipo_email);
      set_descricao_email(descricao_email);

      set_facebook(facebook);
      set_id_facebook(id_facebook);
      set_tipo_facebook(tipo_facebook);
      set_descricao_facebook(descricao_facebook);

      set_instagram(instagram);
      set_id_instagram(id_instagram);
      set_tipo_instagram(tipo_instagram);
      set_descricao_instagram(descricao_instagram);

      set_twitter(twitter);
      set_id_twitter(id_twitter);
      set_tipo_twitter(tipo_twitter);
      set_descricao_twitter(descricao_twitter);
    }
  }, []);

  const handleVisibility = useCallback((form) => {
    const { modulo_regs } = form;
    modulo_regs.forEach((modulo) => {
      switch (modulo.descricao) {
        case 'CONTATO':
          modulo.campo_regs.forEach((campo) => {
            if (campo.acesso) {
              switch (parseInt(campo.permissao, 10)) {
                case 1: set_visibility_fone(''); set_required_fone('required'); break;
                case 2: set_visibility_celular(''); set_required_celular('required'); break;
                case 3: set_visibility_email(''); set_required_email('required'); break;
                case 4: set_visibility_facebook(''); set_required_facebook('required'); break;
                case 5: set_visibility_instagram(''); set_required_instagram('required'); break;
                case 6: set_visibility_twitter(''); set_required_twitter('required'); break;
                default:
              }
            }
          });
          break;
        default:
      }
    });
  }, []);

  const render = useCallback(() => {
    async function render() {
      const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));
      const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));

      set_campos(form);
      handleVisibility(form);

      const filtro = { id_pfisica: userData.id_pfisica, id_pjuridica: 0 };

      const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_CONTATO'));
      const _ws = await getPagina(props, '/TsmRCONTATO/PAGINA', '', filtro, '');

      await updateCampos(_ws, _store);
    }
    render();
  }, [props, updateCampos, handleVisibility]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setFirst(false);
      render();
    }
  }, [firstLoad, render]);

  ////// HANDLE SAVE
  useEffect(() => {
    if (!firstLoad) {
      const Form = {
        id_fone,
        descricao_fone,
        tipo_fone,
        fone,

        id_celular,
        descricao_celular,
        tipo_celular,
        celular,

        id_email,
        descricao_email,
        tipo_email,
        email,

        id_facebook,
        descricao_facebook,
        tipo_facebook,
        facebook,

        id_instagram,
        descricao_instagram,
        tipo_instagram,
        instagram,

        id_twitter,
        descricao_twitter,
        tipo_twitter,
        twitter,
      };
      localStorage.setItem('HOTSITE_PARTICIPANTE_CONTATO', JSON.stringify(Form));
    }
  }, [celular, descricao_celular, descricao_email, descricao_facebook, descricao_fone, descricao_instagram, descricao_twitter, email, facebook, firstLoad, fone, id_celular, id_email, id_facebook, id_fone, id_instagram, id_twitter, instagram, tipo_celular, tipo_email, tipo_facebook, tipo_fone, tipo_instagram, tipo_twitter, twitter]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faPhoneAlt}
          title="Contatos"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULÁRIO ***/}
        <Col sm={12} className="p-0 pl-3 pr-3">
          <Row>

            <Col sm={3} className={visibility_fone}>
              <FormGroup>
                <Input
                  type="text"
                  value={tipo_fone}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_fone}>
              <FormGroup>
                <Input
                  type="text"
                  maxLength={90}
                  value={fone}
                  className={required_fone}
                  onChange={(e) => set_fone(newFormatCelular(e.target.value))}
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_celular}>
              <FormGroup>
                <Input
                  type="text"
                  value={tipo_celular}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_celular}>
              <FormGroup>
                <Input
                  type="text"
                  maxLength={90}
                  value={celular}
                  className={required_celular}
                  onChange={(e) => set_celular(newFormatCelular(e.target.value))}
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_email}>
              <FormGroup>
                <Input
                  type="text"
                  value={tipo_email}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_email}>
              <FormGroup>
                <Input
                  type="text"
                  maxLength={90}
                  value={email}
                  className={`email ${required_email}`}
                  onChange={(e) => set_email(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_facebook}>
              <FormGroup>
                <Input
                  type="text"
                  value={tipo_facebook}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_facebook}>
              <FormGroup>
                <Input
                  type="text"
                  maxLength={90}
                  value={facebook}
                  className={required_facebook}
                  onChange={(e) => set_facebook(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_instagram}>
              <FormGroup>
                <Input
                  type="text"
                  value={tipo_instagram}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_instagram}>
              <FormGroup>
                <Input
                  type="text"
                  maxLength={90}
                  value={instagram}
                  className={required_instagram}
                  onChange={(e) => set_instagram(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_twitter}>
              <FormGroup>
                <Input
                  type="text"
                  value={tipo_twitter}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col sm={3} className={visibility_twitter}>
              <FormGroup>
                <Input
                  type="text"
                  maxLength={90}
                  value={twitter}
                  className={required_twitter}
                  onChange={(e) => set_twitter(e.target.value)}
                />
              </FormGroup>
            </Col>

          </Row>
        </Col>

      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  step: state.hotsite_participante.step,
  id_pfisica: state.hotsite_participante.id_pfisica,
});
export default connect(() => (mapState))(Hotsite);
