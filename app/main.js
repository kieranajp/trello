import config from './config';

import Card from './card';
import template from './card.hbs!text';
import Handlebars from 'handlebars';

import $ from 'jquery';
import Trello from './api';

Trello.setKey(config.trello.key);
if (! Trello.authorized()) {
    Trello.authorize();
}

Trello.boards.get('2KoWhif9', { cards: 'all' }, (data) => {
    let content = data.cards
        .map(card => new Card(card))
        .map(Handlebars.compile(template))
        .join('');

    $('body').append(`<ul>${content}</ul>`);
});
