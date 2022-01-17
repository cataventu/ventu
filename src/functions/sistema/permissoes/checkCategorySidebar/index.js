import store from '../../../../redux/store';

const { develop } = store.getState().sistema;

const checkCategorySidebar = (name, props) => {
  switch (develop) {
    case true: return 'show';
    default:
      let categoryClass;
      props.visibilityModulo.forEach((item) => {
        if (item.nome === name) {
          item.acesso ? categoryClass = 'show' : categoryClass = 'hide';
        }
      });
      return categoryClass;
  }
};

export default checkCategorySidebar;
