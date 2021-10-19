'use strict';
const fs = require('fs');
const path = require('path');

const Cards = {
    cards: undefined,

    _getFilePath() {
        return path.join(__dirname, '..', '..', 'data', 'cards.json');
    },

    loadAll() {
        if (!this.cards) {
            const content = fs.readFileSync(this._getFilePath()).toString();
            this.cards = JSON.parse(content);
        }
        return this.cards;
    },

    saveAll() {
        this.loadAll();
        fs.writeFileSync(this._getFilePath(), JSON.stringify(this.cards));
    },

    create(data) {
        this.loadAll();
        const lastId = this.cards[this.cards.length - 1].id;
        data.id = lastId + 1;
        this.cards.push(data);
        this.saveAll();
        return data.id;
    },

    findById(id) {
        return this.loadAll().find(card => card.id === id);
    },

    updateById(id, data) {
        const card = this.findById(id);
        if (card) {
            Object.keys(data).forEach(key => {
                card[key] = data[key];
            });
            this.saveAll();
        }
        return card;
    },
};

module.exports = Cards;
