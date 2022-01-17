import { toastr } from 'react-redux-toastr';

function showMSG(title, message, type, tempo) {
  const config = {
    title,
    message,
    type,
    timeOut: tempo,
    showCloseButton: true,
    progressBar: true,
    position: 'top-right',
  };

  const options = {
    timeOut: parseInt(config.timeOut, 10),
    showCloseButton: config.showCloseButton,
    progressBar: config.progressBar,
    position: config.position,
  };

  const toastrInstance = config.type === 'info'
    ? toastr.info
    : config.type === 'warning'
      ? toastr.warning
      : config.type === 'error'
        ? toastr.error
        : toastr.success;

  toastrInstance(
    config.title,
    config.message || 'Have fun storming the castle!',
    options,
  );
}

export default showMSG;
