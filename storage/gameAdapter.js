'use strict';

function adapt(item){
    console.log('adapter')
    return Object.assign(item, {
        number:+item.number,
        quantity:+item.quantity
    });
}

module.exports = {adapt}