//import React from 'react';
//import moment from 'moment';
//const $ = require("jquery");

export default function (event) {
  const { title } = event;
  const eventos = document.getElementsByClassName('fc-title');

  eventos.forEach((evento) => {
    if (title === evento.textContent) {
      const newcontent = document.createElement('div');
      newcontent.setAttribute('class', 'event-menu-calendar');
      newcontent.innerHTML = 'bar';

      evento.appendChild(newcontent);
    }
  });
}
