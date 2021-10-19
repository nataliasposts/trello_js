/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board/board.css":
/*!*****************************!*\
  !*** ./src/board/board.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://trello/./src/board/board.css?");

/***/ }),

/***/ "./src/card/card.css":
/*!***************************!*\
  !*** ./src/card/card.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://trello/./src/card/card.css?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://trello/./src/index.css?");

/***/ }),

/***/ "./src/board/board.js":
/*!****************************!*\
  !*** ./src/board/board.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _board_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.css */ \"./src/board/board.css\");\n/* harmony import */ var _card_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card/card */ \"./src/card/card.js\");\n\n\n\n\nconst board = {\n    load: function () {\n        return fetch('/board')\n            .then(res => res.json())\n            .then(json => {\n                console.log(json)\n                return json;\n            });\n    },\n\n  \n    drawCards: function (cards) {\n        const toDo = document.getElementById('board-list__todo');\n        const inProgress = document.getElementById('speaker-prograss');\n        const done = document.getElementById('speaker-done');\n\n\n        let counter = 0;\n        for (let i = 0; i < cards.length; i++) {\n            const data = cards[i];\n            const makup = _card_card__WEBPACK_IMPORTED_MODULE_1__.default.render(data);\n            const state = data.state;\n\n            if (state === 0) {\n                toDo.append(makup);\n            } else if (state === 1) {\n                inProgress.append(makup);\n\n                counter++;\n            } else {\n                done.append(makup);\n            }\n        }\n\n        document.querySelector('#counter').innerHTML = counter;\n    },\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (board);\n\n//# sourceURL=webpack://trello/./src/board/board.js?");

/***/ }),

/***/ "./src/card/card.js":
/*!**************************!*\
  !*** ./src/card/card.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _card_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card.css */ \"./src/card/card.css\");\n\n\n\n\n\nconst textDescription = document.getElementById('text-description__modal');\nconst dataAdd = document.getElementById('addDate');\nconst modalIcon = document.querySelector('modal-icon');\n\nconst card = {\n  loadAll: function () {\n    return fetch('/card')\n      .then(res => res.json())\n      .then(json => {\n        console.log(json)\n        return json;\n      });\n  },\n\n  render: function (data) {\n    const dateString = data.finishDate ?(new Date(data.finishDate)).toLocaleDateString() : '';\n\n    const card = document.createElement('li');\n    card.id = `card-${data.id}`;\n\n    card.innerHTML = `\n        <div class=\"board-item__list\">\n          <h4 class=\"board-list__title\">\n              ${data.title}\n          </h4> \n          <p>\n              ${data.description}\n          </p>\n          <span class=\"list-date\">${dateString}</span>\n        </div>\n        `;\n\n    return card;\n  },\n};\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);\n\n\n//# sourceURL=webpack://trello/./src/card/card.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _board_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board/board */ \"./src/board/board.js\");\n/* harmony import */ var _card_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./card/card */ \"./src/card/card.js\");\n\n\n\n\n\n\n\nconsole.log('Loading...');\n\nPromise.all([\n    _board_board__WEBPACK_IMPORTED_MODULE_1__.default.load(),\n    _card_card__WEBPACK_IMPORTED_MODULE_2__.default.loadAll()\n]).then(array => {\n    const boardData = array[0];\n    const cardsData = array[1];\n    console.log(boardData, cardsData);\n\n    _board_board__WEBPACK_IMPORTED_MODULE_1__.default.drawCards(cardsData);\n});\n\n\nconst buttonTodo = document.getElementById('button-todo');\nconst modal = document.getElementById('modal');\nconst contantModal = document.getElementById('modal-container');\n\nlet stateElem = 0;\nlet addDate = 0;\n\n//Запуск модального окна по нажатию кнопки button-todo\nbuttonTodo.addEventListener('click', function () {\n    modal.classList.add('modal-visibal');\n    contantModal.classList.add('modal-container__todo');\n    stateElem = 0;\n    addDate = 0;\n    return stateElem, addDate;\n});\n\n//Запуск модального окна по нажатию кнопки progress-button\nconst buttonProgress = document.getElementById('button-in-progress');\nbuttonProgress.addEventListener('click', function () {\n    modal.classList.add('modal-visibal');\n    contantModal.classList.add('modal-container__prograss');\n    stateElem = 1;\n    addDate = 0;\n    return stateElem, addDate;\n});\n\n//Запуск модального окна по нажатию кнопки done-button__item\nconst buttonDone = document.getElementById('done-button__item');\nbuttonDone.addEventListener('click', function () {\n    modal.classList.add('modal-visibal');\n    contantModal.classList.add('modal-container__done');\n    stateElem = 2;\n    addDate = new Date();\n    return stateElem, addDate;\n});\n\n//Закрываем модальное окно\nconst modalCancel = document.getElementById('cancelModal-add');\nmodalCancel.addEventListener('click', function () {\n    modal.classList.remove('modal-visibal');\n    if (stateElem === 0) {\n        contantModal.classList.remove('modal-container__todo');\n        title.value = '';\n        textDescription.value = '';\n    } else if (stateElem === 1) {\n        contantModal.classList.remove('modal-container__prograss');\n        title.value = '';\n        textDescription.value = '';\n    } else {\n        contantModal.classList.remove('modal-container__done');\n        title.value = '';\n        textDescription.value = '';\n    }\n});\n\n//Добавляем карточку кнопкой добавить в модальном окне в ul элементов To Do\nconst buttonModalAdd = document.getElementById('submitModal-add');\nconst textDescription = document.getElementById('text-description__modal');\nconst title = document.getElementById('text-title__modal');\nconst toDoAdd = document.getElementById('board-list__todo');\nconst inProgressAdd = document.getElementById('speaker-prograss');\nconst doneAdd = document.getElementById('speaker-done');\nlet counter = 0;\n\n\n\nfunction counterProgress() {\n    const num = inProgressAdd.getElementsByTagName('li').length;\n    console.log(num);\n    counter = num;\n    return counter;\n}\n\n\n\nbuttonModalAdd.addEventListener('click', function () {\n    const data = { state: stateElem, title: title.value, description: textDescription.value, finishDate: addDate };\n\n    fetch(\n        '/card',\n        {\n            method: 'POST',\n            body: JSON.stringify(data),\n        }\n    ).then(response => response.text()).then(text => {\n        const id = parseInt(text);\n        data.id = id;\n        const addCard = _card_card__WEBPACK_IMPORTED_MODULE_2__.default.render(data);\n\n\n        if (data.state === 0) {\n            toDoAdd.append(addCard);\n        } else if (data.state === 1) {\n            inProgressAdd.append(addCard);\n            counterProgress();\n        } else {\n            doneAdd.append(addCard);\n        }\n\n        document.querySelector('#counter').innerHTML = counter;\n        console.log('OK');\n        modal.classList.remove('modal-visibal');\n        title.value = '';\n        textDescription.value = '';\n    });\n});\n\n\n\n\n\n//# sourceURL=webpack://trello/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;