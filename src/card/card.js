'use strict';
import './card.css';



const textDescription = document.getElementById('text-description__modal');
const dataAdd = document.getElementById('addDate');
const modalIcon = document.querySelector('modal-icon');

const card = {
  loadAll: function () {
    return fetch('/card')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        return json;
      });
  },

  render: function (data) {
    const dateString = data.finishDate ?(new Date(data.finishDate)).toLocaleDateString() : '';

    const card = document.createElement('li');
    card.id = `card-${data.id}`;

    card.innerHTML = `
        <div class="board-item__list">
          <h4 class="board-list__title">
              ${data.title}
          </h4> 
          <p>
              ${data.description}
          </p>
          <span class="list-date">${dateString}</span>
        </div>
        `;

    return card;
  },
};




export default card;
