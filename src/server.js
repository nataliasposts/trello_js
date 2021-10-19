'use strict';

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const Boards = require('./board/board.server');
const Cards = require('./card/card.server');

const app = express();
app.use(bodyParser.text({ type: '*/*' }));
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Новый REST API

app.get('/boards', (req, res) => {
    // возвращаем список всех досок
    sendJson(res, Boards.loadAll().map(board => board.id));
});
app.get('/boards/create', (req, res) => {
    console.log('TODO создаём доску через GET-запрос', req.query);
});
app.post('/boards/create', (req, res) => {
    console.log('TODO создаём доску через POST-запрос', req.body);
});
app.get('/boards/:id', (req, res) => {
    // возвращаем доску по id
    const id = parseInt(req.params.id);
    const board = Boards.findById(id);
    if (board) {
        sendJson(res, board);
    } else {
        res.status(404).send(`Board with id '${id}' not found`);
    }
});
app.put('/boards/:id', (req, res) => {
    console.log('TODO обновляем доску по id', req.params, req.body);
});
app.delete('/boards/:id', (req, res) => {
    console.log('TODO удаляем доску по id', req.params);
});

app.get('/boards/:id/cards', (req, res) => {
    // возвращаем список карточек доски
    const id = parseInt(req.params.id);
    const board = Boards.findById(id);
    if (board) {
        const cardIds = board.cardIds;
        const cards = Cards.loadAll().filter(c => cardIds.includes(c.id));
        sendJson(res, cards);
    } else {
        res.status(404).send(`Board with id '${id}' not found`);
    }
});

app.get('/cards', (req, res) => {
    // возвращаем список всех карточек
    return sendJson(res, Cards.loadAll());
});
app.get('/cards/create', (req, res) => {
    console.log('TODO создаём карточку через GET-запрос', req.query);
});
app.post('/cards/create', (req, res) => {
    // создаём карточку через POST-запрос
    try {
        const id = Cards.create(JSON.parse(req.body));
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(String(id));
    } catch (e) {
        res.status(500).send(`${e}`);
    }
});
app.get('/cards/:id', (req, res) => {
    // возвращаем карточку по id
    const id = parseInt(req.params.id);
    const card = Cards.findById(id);
    if (card) {
        return sendJson(res, card);
    } else {
        return res.status(404).send(`Card with id '${id}' not found`);
    }
});
app.put('/cards/:id', (req, res) => {
    console.log('TODO обновляем карточку по id', req.params, req.body);
    try {
        const data = JSON.parse(req.body);
        const id = parseInt(req.params.id);
        const updatedCard = Cards.updateById(id, data);
        if (!updatedCard) {
            return res.status(404).send(`Card with id '${id}' not found`);
        }
        sendJson(res, updatedCard);
    } catch (e) {
        res.status(500).send(`${e}`);
    }
});
// Карточки никогда физически не удаляются. Можно только убрать карточку с доски.
// app.delete('/cards/:id', (req, res) => {
//     console.log('TODO удаляем карточку по id', req.params);
// });

// Старый API

app.get('/board', (req, res) => {
    const board = Boards.findById(0);
    sendJson(res, board);
});

app.put('/board', (req, res) => {
    try {
        const data = JSON.parse(req.body);
        const id = data.id;
        if (!Boards.updateById(id, data)) {
            return res.status(404).send(`Board with id '${id}' not found`);
        }
        res.status(200).send();
    } catch (e) {
        res.status(500).send(`${e}`);
    }
});

app.get('/card', (req, res) => {
    if (!req.query.id) {
        const cards = Cards.loadAll();
        return sendJson(res, cards);
    }
    const id = parseInt(req.query.id);
    const card = Cards.findById(id);
    if (card) {
        return sendJson(res, card);
    } else {
        return res.status(404).send(`Card with id '${id}' not found`);
    }
});

app.post('/card', (req, res) => {
    try {
        const id = Cards.create(JSON.parse(req.body));
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(String(id));
    } catch (e) {
        res.status(500).send(`${e}`);
    }
});

app.put('/card', (req, res) => {
    try {
        const data = JSON.parse(req.body);
        const id = data.id;
        if (!Cards.updateById(id, data)) {
            return res.status(404).send(`Card with id '${id}' not found`);
        }
        res.status(200).send();
    } catch (e) {
        res.status(500).send(`${e}`);
    }
});

// Карточки никогда физически не удаляются. Можно только убрать карточку с доски.
// app.delete('/card', (req, res) => {
//     console.log('TODO delete card by id');
//     res.send('TODO delete card by id');
// });

const httpPort = process.env.HTTP_PORT || 3000;
app.listen(httpPort);
console.log(`Server started on port ${httpPort}`);

function sendJson(res, object) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify(object));
}
