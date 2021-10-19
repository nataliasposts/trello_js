'use strict';
import './board.css';
import card from '../card/card';

const board = {
    load: function () {
        return fetch('/board')
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json;
            });
    },

  
    drawCards: function (cards) {
        const toDo = document.getElementById('board-list__todo');
        const inProgress = document.getElementById('speaker-prograss');
        const done = document.getElementById('speaker-done');


        let counter = 0;
        for (let i = 0; i < cards.length; i++) {
            const data = cards[i];
            const makup = card.render(data);
            const state = data.state;

            if (state === 0) {
                toDo.append(makup);
            } else if (state === 1) {
                inProgress.append(makup);

                counter++;
            } else {
                done.append(makup);
            }
        }

        document.querySelector('#counter').innerHTML = counter;
    },
};

export default board;