const $ = require('jquery');

export default function () {
  $(this).css('z-index', 8);
  $('.TM-tooltip').remove();
}
