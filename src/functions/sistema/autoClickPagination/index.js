export const autoClickPagination = (paginationList, store_index_pagination, startPagination, retry, setRetry) => {
  if (store_index_pagination > 0 && paginationList.length > 0 && retry && startPagination > 1) {
    //NUMERO DA PAGINACAO FINAL
    const paginationEndElement = paginationList[paginationList.length - 3];
    const paginationTextEnd = parseInt(paginationEndElement.outerText);
    //CONDIÇÃO 01 - PAGINACAO MAIOR QUE O EXIBIDO NA TELA
    if (startPagination > paginationTextEnd) {
      paginationEndElement.click();
    } else {
      //CONDIÇÃO 02 - PROCURAR PAGINA CORRETA DA LISTA EXIBIDA
      for (let p = 0; p <= paginationList.length; p++) {
        const paginationNumber = parseInt(paginationList[p]?.outerText);
        if (startPagination === paginationNumber) {
          paginationList[p].click();
          setRetry(false);
        }
      }
    }
  }
};

export default autoClickPagination;
