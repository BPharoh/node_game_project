'use strict';

const fs = require('fs').promises;

async function readStorage(storageFile){
    try{
        const data = await fs.readFile(storageFile,'utf8');
        return JSON.parse(data);
    }
    catch(err){

        return [];
    }
}

async function writeStorage(storageFile,data){
    try{
        await fs.writeFile(storageFile,JSON.stringify(data,null,4),{
            encoding:'utf8',
            flag:'w'
        });
        return true;
    }
    catch(err){
        
        return false;
    }
}

module.exports={ readStorage, writeStorage }

// writeStorage('./otulugbu_alexander_games.json',{ "number":7,"name": "Future 2525", "quantity":15,"genre": "brain-twister", "rating": "****"}).then(console.log).catch(console.log)
// readStorage('./otulugbu_alexander_games.json').then(console.log).catch(console.log);

