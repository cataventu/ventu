import store from '../../../../redux/store';

const { develop } = store.getState().sistema;

const checkModuloPermission = (name, props) => {
  switch (develop) {
    case true: return true;
    default:
      let exibe;
      props.visibilityModulo.forEach((item) => {
        if (item.nome === name) {
          item.acesso ? exibe = true : exibe = false;
        }
      });
      return exibe;
  }
};

export default checkModuloPermission;
