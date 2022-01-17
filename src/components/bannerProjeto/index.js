///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useCallback, useEffect } from 'react';
import {
  Button, Col, FormGroup, Label,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { base64 } from '../../functions/sistema';
import { saveBanner, getBanner } from '../../functions/hotsite/projeto';
import './style.css';

function BannerProjeto(props) {
  const { id } = props.match.params;

  const [firstLoad, set_first] = useState(true);
  const [banner, set_banner] = useState('');
  const [visibilityBanner, set_visibilityBanner] = useState('hide');

  ////// BANNER
  const upload = useCallback((id) => {
    document.getElementById(id).click();
  }, []);

  const handleSave = useCallback((banner) => {
    const { id } = props.match.params;
    const { user } = props;
    const form = {
      id_projeto: id,
      banner,
      inc_usuario: user.id,
      alt_usuario: user.id,
    };
    saveBanner(form, props);
  }, [props]);

  const chargeFile = useCallback((input) => {
    base64(input.files, async (doc) => {
      const { base64 } = doc;
      set_banner(base64);
      set_visibilityBanner('');
      handleSave(base64);
    });
  }, [handleSave]);

  const deleteBanner = useCallback((id) => {
    set_banner('');
    set_visibilityBanner('hide');
    document.getElementById(id).value = '';
    handleSave('');
  }, [handleSave]);

  const loadBanner = useCallback(() => {
    async function loadBanner() {
      const res = await getBanner(id, props);
      const { banner } = res;
      if (banner.length > 0 && banner !== 'Registro não Encontrado') {
        set_banner(banner);
        set_visibilityBanner('');
      }
    }
    loadBanner();
  }, [id, props]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      loadBanner();
      set_first(false);
    }
  }, [firstLoad, loadBanner]);

  return (
    <>
      <Col sm={12} className="pb-1">
        <FormGroup>
          <Label>Banner</Label>
          <div className="hotsite-banner rounded">
            {/*** BUTTON DELETE ***/}
            <FontAwesomeIcon
              icon={faTrash}
              className={`text-danger cursor hotsite-delete ${visibilityBanner}`}
              onClick={() => deleteBanner('banner-hotsite-image')}
            />

            {/*** IMAGEM ***/}
            <img
              src={`data:image/jpg;base64, ${banner}`}
              className={visibilityBanner}
              width={1000}
              height={200}
              alt="banner hotsite"
            />

            {/*** BUTTON UPLOAD ***/}
            <div className="hotsite-button">
              <Button onClick={() => upload('banner-hotsite-image')} color="blue">
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                {' '}
ENVIAR
              </Button>
            </div>

          </div>
        </FormGroup>

        {/*** FORM UPLOAD ***/}
        <form encType="multipart/form-data" method="post">
          <input
            id="banner-hotsite-image"
            type="file"
            className="hide"
            onChange={(e) => chargeFile(e.target)}
          />
        </form>
      </Col>
    </>
  );
}

export default BannerProjeto;
