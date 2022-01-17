///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { DossieTitulo, DossieTemposMov, DossieSubTitulo } from '../../components';

const TemposMov = ({ dados }) => {
  const [tempo_mov, set_tempo_mov] = useState([]);

  useEffect(() => {
    if (dados !== undefined) {
      const { tempo_mov_regs } = dados;
      set_tempo_mov(tempo_mov_regs);
    }
  }, [dados]);

  return (
    <>
      <DossieTitulo titulo="Tempos e Movimentos" />

      <DossieSubTitulo texto="02 de Outubro – quarta-feira" />
      {
        !!tempo_mov && tempo_mov.map((card) => (
          <DossieTemposMov ficha={card} />
        ))
      }
    </>
  );
};

export default TemposMov;
