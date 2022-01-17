///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { calculaTamanho } from '../../functions/anexo';
import { base64 } from '../../functions/sistema';
import './style.css';

function CardAnexo({
  id, icon, title, file, onChange,
}) {
  const [tamanho, set_tamanho] = useState('');
  const [arquivo, set_arquivo] = useState('');
  const [visibility, set_visibility] = useState('hide');

  const upload = useCallback((id) => {
    document.getElementById(id).click();
  }, []);

  const chargeFile = useCallback((input) => {
    base64(input.files, async (doc) => {
      const {
        filename, size, filetype, base64,
      } = doc;

      const data = {
        titulo: filename,
        tamanho: parseInt((size / 1000), 10),
        extensao: filetype,
        arquivo: base64,
      };

      set_tamanho(parseInt((size / 1000), 10));
      set_arquivo(base64);
      set_visibility('');

      return data;
    });
  }, []);

  useEffect(() => {
    if (file !== undefined) {
      const { tamanho, arquivo } = file;
      if (tamanho > 0) {
        set_tamanho(tamanho);
        set_arquivo(arquivo);
        set_visibility('');
      }
    }
  }, [file]);

  return (
    <Card className="card-anexo-body">
      <CardBody className="text-center">

        {/*** CONTAINER IMAGEM ***/}
        <div className="card-anexo-img-container">

          <div className="card-anexo-title">{ title.toUpperCase() }</div>
          { <FontAwesomeIcon icon={icon} className="card-anexo-icon" /> }

          <img
            src={`data:image/jpg;base64, ${arquivo}`}
            alt="Imagem do documento."
            className={`card-anexo-img-upload rounded ${visibility}`}
          />

        </div>

        {/*** BUTTON UPLOAD ***/}
        <div className="mt-3 mb-3">
          <Button onClick={() => upload(id)} color="blue">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            {' '}
ENVIAR
          </Button>
        </div>

        {/*** FORM UPLOAD ***/}
        <form encType="multipart/form-data" action="/upload/image" method="post">
          <input
            id={id}
            type="file"
            className="hide"
            onChangeCapture={(e) => chargeFile(e.target)}
            onChange={onChange}
          />
        </form>

        {/*** CONTAINER INFO ***/}
        <div className="card-anexo-info">
          <p>
                  Tamanho do arquivo:
            <span className="h6 ml-2">{ calculaTamanho(tamanho) }</span>
          </p>
          <p>
                  Tamanho máximo:
            {' '}
            <span className="h6 ml-2">3 mb</span>
          </p>
        </div>

      </CardBody>
    </Card>
  );
}

export default CardAnexo;
