import { base64 } from '../../../sistema';

const getAnexoData = (props) => {
  const { dispatch } = props;

  base64(document.getElementById('doc-file').files, async (doc) => {
    const {
      filename, size, filetype, base64,
    } = doc;

    const file = {
      titulo: filename,
      tamanho: parseInt((size / 1000), 10),
      extensao: filetype,
      arquivo: base64,
    };

    dispatch({ type: '@SET_TEMPOMOV_ANEXO_FILE', payload: file });
  });
};

export default getAnexoData;
