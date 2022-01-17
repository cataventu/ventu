///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { DossieTitulo, DossieLinha, DossieContato } from '../../components';

const Contatos = ({ dados }) => {
  const [contatos, set_contatos] = useState([]);

  useEffect(() => {
    if (dados !== undefined) {
      const { contato_regs } = dados;
      set_contatos(contato_regs);
    }
  }, [dados]);

  return (
    <>
      <DossieTitulo titulo="Contatos" />
      {
        !!contatos && contatos.map((contato) => (
          <>
            <DossieLinha position="left">
              <DossieContato
                pjuridica={contato.pjuridica}
                endereco={contato.endereco}
                email={contato.email}
                telefone={contato.telefone}
                obs={contato.obs}
              />
            </DossieLinha>
          </>
        ))
      }
    </>
  );
};

export default Contatos;
