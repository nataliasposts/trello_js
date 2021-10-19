'use strict';

import './index.css';
import board from './board/board';
import card from './card/card';


console.log('Loading...');

Promise.all([
    board.load(),
    card.loadAll()
]).then(array => {
    const boardData = array[0];
    const cardsData = array[1];
    console.log(boardData, cardsData);

    board.drawCards(cardsData);
});


const buttonTodo = document.getElementById('button-todo');
const modal = document.getElementById('modal');
const contantModal = document.getElementById('modal-container');

let stateElem = 0;
let addDate = 0;

//Запуск модального окна по нажатию кнопки button-todo
buttonTodo.addEventListener('click', function () {
    modal.classList.add('modal-visibal');
    contantModal.classList.add('modal-container__todo');
    stateElem = 0;
    addDate = 0;
    return stateElem, addDate;
});

//Запуск модального окна по нажатию кнопки progress-button
const buttonProgress = document.getElementById('button-in-progress');
buttonProgress.addEventListener('click', function () {
    modal.classList.add('modal-visibal');
    contantModal.classList.add('modal-container__prograss');
    stateElem = 1;
    addDate = 0;
    return stateElem, addDate;
});

//Запуск модального окна по нажатию кнопки done-button__item
const buttonDone = document.getElementById('done-button__item');
buttonDone.addEventListener('click', function () {
    modal.classList.add('modal-visibal');
    contantModal.classList.add('modal-container__done');
    stateElem = 2;
    addDate = new Date();
    return stateElem, addDate;
});

//Закрываем модальное окно
const modalCancel = document.getElementById('cancelModal-add');
modalCancel.addEventListener('click', function () {
    modal.classList.remove('modal-visibal');
    if (stateElem === 0) {
        contantModal.classList.remove('modal-container__todo');
        title.value = '';
        textDescription.value = '';
    } else if (stateElem === 1) {
        contantModal.classList.remove('modal-container__prograss');
        title.value = '';
        textDescription.value = '';
    } else {
        contantModal.classList.remove('modal-container__done');
        title.value = '';
        textDescription.value = '';
    }
});

//Добавляем карточку кнопкой добавить в модальном окне в ul элементов To Do
const buttonModalAdd = document.getElementById('submitModal-add');
const textDescription = document.getElementById('text-description__modal');
const title = document.getElementById('text-title__modal');
const toDoAdd = document.getElementById('board-list__todo');
const inProgressAdd = document.getElementById('speaker-prograss');
const doneAdd = document.getElementById('speaker-done');
let counter = 0;



function counterProgress() {
    const num = inProgressAdd.getElementsByTagName('li').length;
    console.log(num);
    counter = num;
    return counter;
}



buttonModalAdd.addEventListener('click', function () {
    const data = { state: stateElem, title: title.value, description: textDescription.value, finishDate: addDate };

    fetch(
        '/card',
        {
            method: 'POST',
            body: JSON.stringify(data),
        }
    ).then(response => response.text()).then(text => {
        const id = parseInt(text);
        data.id = id;
        const addCard = card.render(data);


        if (data.state === 0) {
            toDoAdd.append(addCard);
        } else if (data.state === 1) {
            inProgressAdd.append(addCard);
            counterProgress();
        } else {
            doneAdd.append(addCard);
        }

        document.querySelector('#counter').innerHTML = counter;
        console.log('OK');
        modal.classList.remove('modal-visibal');
        title.value = '';
        textDescription.value = '';
    });
});



