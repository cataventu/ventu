import moment from 'moment';

const $ = require('jquery');

export default function (event) {
  const {
    start, end, title, id,
  } = event;

  const momentStart = moment(start).format('L LTS');
  const momentEnd = moment(end).format('L LTS');

  let _start; let
    _end;

  momentStart === 'Invalid date' || momentStart === 'undefined'
    ? _start = '' : _start = momentStart;

  momentEnd === 'Invalid date' || momentEnd === 'undefined'
    ? _end = '' : _end = momentEnd;

  const tooltip = `${'<div class="TM-tooltip">'
                + '<p class="pb-2"><b>'}${title}</b></p>`
                + `<p class="pb-1"><b>ID Evento: </b>${id}</p>`
                + `<p class="pb-1">${_start}</p>`
                + `<p>${_end}</p>`
                + '</div>';

  const $tooltip = $(tooltip).appendTo('body');

  $(this).mouseover(() => {
    $(this).css('z-index', 10000);
    $tooltip.fadeIn('500');
    $tooltip.fadeTo('10', 1.9);
  }).mousemove((e) => {
    $tooltip.css('top', e.pageY + 10);
    $tooltip.css('left', e.pageX + 15);
  });
}
