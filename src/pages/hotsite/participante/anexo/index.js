///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import {
  faUserAlt, faPlane, faArchive, faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../_header';
import { CardAnexo } from '../../../../components';
import { base64, getDados } from '../../../../functions/sistema';

function Hotsite(props) {
  const stepAtual = 8;
  const { id_hash } = props.match.params;
  const initial = {
    titulo: '', tamanho: 0, extensao: '', arquivo: '',
  };

  const [firstLoad, setFirst] = useState(true);
  const [campos, set_campos] = useState({});

  const [visibilityFoto, set_visibilityFoto] = useState('hide');
  const [visibilityRG, set_visibilityRG] = useState('hide');
  const [visibilityCPF, set_visibilityCPF] = useState('hide');
  const [visibilityPass, set_visibilityPass] = useState('hide');
  const [visibilityVisto, set_visibilityVisto] = useState('hide');

  const [file_foto, set_file_foto] = useState(initial);
  const [file_rg, set_file_rg] = useState(initial);
  const [file_cpf, set_file_cpf] = useState(initial);
  const [file_pass, set_file_pass] = useState(initial);
  const [file_visto, set_file_visto] = useState(initial);

  const updateFile = useCallback((file, id) => {
    base64(file, async (doc) => {
      const {
        filename, size, filetype, base64,
      } = doc;

      const data = {
        id: 0,
        titulo: filename,
        tamanho: parseInt(size / 1000, 10),
        extensao: '.jpg', //filetype,
        arquivo: base64,
      };

      switch (id) {
        case 'file-1': set_file_foto(data); break;
        case 'file-2': set_file_rg(data); break;
        case 'file-3': set_file_cpf(data); break;
        case 'file-4': set_file_pass(data); break;
        case 'file-5': set_file_visto(data); break;
        default: break;
      }
    });
  }, []);

  const handleUpdate = useCallback((ws, store) => {
    let ficha;
    store !== null ? ficha = store : ficha = ws;

    const {
      file_foto,
      file_rg,
      file_cpf,
      file_pass,
      file_visto,
    } = ficha;

    set_file_foto(file_foto);
    set_file_rg(file_rg);
    set_file_cpf(file_cpf);
    set_file_pass(file_pass);
    set_file_visto(file_visto);
  }, []);

  const handleVisibility = useCallback((form) => {
    const { modulo_regs } = form;
    modulo_regs.forEach((modulo) => {
      switch (modulo.permissao) {
        case 8:
          modulo.campo_regs.forEach((campo) => {
            if (campo.acesso) {
              switch (parseInt(campo.permissao, 10)) {
                case 1: set_visibilityFoto(''); break;
                case 2: set_visibilityRG(''); break;
                case 3: set_visibilityCPF(''); break;
                case 4: set_visibilityPass(''); break;
                case 5: set_visibilityVisto(''); break;
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
      set_campos(form);

      const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));
      const { id_pfisica } = userData;

      const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_ANEXO'));

      const _ws_1 = await getDados(props, `/TsmPFISICA/FOTO_FICHA/${id_pfisica}`, '');
      const _ws_2 = await getDados(props, `/TsmANEXO/HOTSITE/${id_pfisica}/1`, '');
      const _ws_3 = await getDados(props, `/TsmANEXO/HOTSITE/${id_pfisica}/2`, '');
      const _ws_4 = await getDados(props, `/TsmANEXO/HOTSITE/${id_pfisica}/3`, '');
      const _ws_5 = await getDados(props, `/TsmANEXO/HOTSITE/${id_pfisica}/4`, '');

      const _ficha = {
        file_foto: {
          id: _ws_1.id,
          titulo: 'FOTO_PESSOAL.jpg',
          extensao: '.jpg',
          tamanho: 500,
          arquivo: _ws_1.foto,
        },
        file_rg: {
          id: _ws_2.id,
          titulo: 'FOTO_RG.jpg',
          // extensao: '.jpg',
          tamanho: _ws_2.tamanho,
          arquivo: _ws_2.arquivo,
        },
        file_cpf: {
          id: _ws_3.id,
          titulo: 'FOTO_CPF.jpg',
          extensao: '.jpg',
          tamanho: _ws_3.tamanho,
          arquivo: _ws_3.arquivo,
        },
        file_pass: {
          id: _ws_4.id,
          titulo: 'FOTO_PASSAPORTE.jpg',
          extensao: '.jpg',
          tamanho: _ws_4.tamanho,
          arquivo: _ws_4.arquivo,
        },
        file_visto: {
          id: _ws_5.id,
          titulo: 'FOTO_VISTO.jpg',
          extensao: '.jpg',
          tamanho: _ws_5.tamanho,
          arquivo: _ws_5.arquivo,
        },
      };

      handleUpdate(_ficha, _store);
      handleVisibility(form);
    }
    render();
  }, [props, handleVisibility, handleUpdate]);

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
        file_foto,
        file_rg,
        file_cpf,
        file_pass,
        file_visto,
      };
      localStorage.setItem('HOTSITE_PARTICIPANTE_ANEXO', JSON.stringify(Form));
    }
  }, [firstLoad, file_cpf, file_foto, file_pass, file_rg, file_visto]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faArchive}
          title="Anexo"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULARIO ***/}
        <Col sm={12} className="p-0 pt-4">
          <Row>

            <Col sm={3} className={visibilityFoto}>
              <CardAnexo
                {...props}
                id="file-1"
                title="Foto pessoal"
                file={file_foto}
                icon={faUserAlt}
                onChange={(e) => updateFile(e.target.files, 'file-1')}
              />
            </Col>

            <Col sm={3} className={visibilityRG}>
              <CardAnexo
                {...props}
                id="file-2"
                title="RG"
                file={file_rg}
                icon={faIdCard}
                onChange={(e) => updateFile(e.target.files, 'file-2')}
              />
            </Col>

            <Col sm={3} className={visibilityCPF}>
              <CardAnexo
                {...props}
                id="file-3"
                title="CPF"
                file={file_cpf}
                icon={faIdCard}
                onChange={(e) => updateFile(e.target.files, 'file-3')}
              />
            </Col>

            <Col sm={3} className={visibilityPass}>
              <CardAnexo
                {...props}
                id="file-4"
                title="Passaporte"
                file={file_pass}
                icon={faPlane}
                onChange={(e) => updateFile(e.target.files, 'file-4')}
              />
            </Col>

            <Col sm={3} className={visibilityVisto}>
              <CardAnexo
                {...props}
                id="file-5"
                title="Visto"
                file={file_visto}
                icon={faIdCard}
                onChange={(e) => updateFile(e.target.files, 'file-5')}
              />
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
