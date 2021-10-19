'use strict';
const fs = require('fs');
const path = require('path');

const STATES = {
    0: 'To Do',
    1: 'In Progress',
    2: 'Done',
    'To Do': 0,
    'In Progress': 1,
    'Done': 2,
};

const Boards = {
    STATES: STATES,
    boards: undefined,

    _getFilePath() {
        return path.join(__dirname, '..', '..', 'data', 'boards.json');
    },

    loadAll() {
        if (!this.boards) {
            const content = fs.readFileSync(this._getFilePath()).toString();
            this.boards = JSON.parse(content);
        }
        return this.boards;
    },

    saveAll() {
        this.loadAll();
        fs.writeFileSync(this._getFilePath(), JSON.stringify(this.boards));
    },

    findById(id) {
        return this.loadAll().find(board => board.id === id);
    },

    updateById(id, data) {
        const board = this.findById(id);
        if (board) {
            Object.keys(data).forEach(key => {
                board[key] = data[key];
            });
            this.saveAll();
        }
        return board;
    },
};

module.exports = Boards;
