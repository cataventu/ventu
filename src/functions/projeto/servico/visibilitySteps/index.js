const visibilitySteps = (step, visibility) => {
  const element = document.getElementsByClassName(`proservico-step-${step}`);
  visibility === true
    ? element[0].classList.remove('hide')
    : element[0].classList.add('hide');
};

export default visibilitySteps;
