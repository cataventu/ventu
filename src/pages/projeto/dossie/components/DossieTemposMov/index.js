import React, { useState, useEffect } from 'react';
import mapa from '../../../../../assets/img/ventu/example-map.jpg';

function DossieTemposMov({ ficha }) {
  const {
    hora,
    titulo,
    categoria,
    local,
    descricao,
    destaque,
    servicos,
    servico_regs,
    imagem,
  } = ficha;

  const [visibilityServicos, set_visibilityServicos] = useState('hide');
  const [visibilityDestaque, set_visibilityDestaque] = useState('hide');
  const [visibilityLocal, set_visibilityLocal] = useState('hide');
  const [visibilityMapa, set_visibilityMapa] = useState('hide');

  useEffect(() => {
    servicos
      ? set_visibilityServicos('')
      : set_visibilityServicos('hide');

    destaque
      ? set_visibilityDestaque('')
      : set_visibilityDestaque('hide');

    local
      ? set_visibilityLocal('')
      : set_visibilityLocal('hide');

    imagem
      ? set_visibilityMapa('')
      : set_visibilityMapa('hide');
  }, [servicos, destaque, imagem, local]);

  return (
    <div className="pb-3">
      {/*** TITULO ***/}
      <h6 className="pb-1">
        <div style={{
          backgroundColor: categoria,
          width: 16,
          height: 16,
          float: 'left',

        }}
        />
        <b className="ml-2 text-info pr-2">{ hora }</b>
        <span className="text-dark">{ titulo.toString().toUpperCase() }</span>
      </h6>

      {/*** DESCRICAO ***/}
      <p className="mt-2 mb-2 text-dark">
        <b className="pr-2">DESCRIÇÃO:</b>
        { descricao.toString().toUpperCase() }
      </p>

      {/*** LOCAL ***/}
      <p className={`mt-2 mb-2 text-dark ${visibilityLocal}`}>
        <b className="pr-2">LOCAL:</b>
        { local.toString().toUpperCase() }
      </p>

      {/*** DESTAQUE ***/}
      <p className={`mt-2 mb-2 p-2 pl-3 bg-warning text-dark ${visibilityDestaque}`}>
        <i>{ destaque.toString().toUpperCase() }</i>
      </p>

      {/*** IMAGEM ***/}
      <p className={`pb-1 ${visibilityMapa}`}>
        <img src={mapa} alt={titulo} width="545" />
      </p>

      {/*** SERVICOS ***/}
      <div className={`pt-1 ${visibilityServicos}`}>
        <b className="pr-2">SERVIÇOS:</b>
        <ul className="pt-2">
          {
            !!servico_regs && servico_regs.map((servico) => (
              <li className="pt-1 text-info">{ servico.descricao.toString().toUpperCase() }</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
export default DossieTemposMov;
