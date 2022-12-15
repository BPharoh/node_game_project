'use strict';

const {CODES,MESSAGES} = require('./statusCodes');

const {
    getAllFromStorage,
    getFromStorage,
    addToStorage,
    updateStorage,
    removeFromStorage
}=require('./storageLayer');

//Datastorage class

module.exports = class Datastorage{
    get CODES(){
        return CODES;
    }

    getAll(){
        return getAllFromStorage();
    } //end getAll

    getOne(number){
        return new Promise(async (resolve,reject)=>{
            if(!number){
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else{
                const result = await getFromStorage(number);
                if(result){
                    resolve(result);
                }
                else{
                    reject(MESSAGES.NOT_FOUND(number))
                }
            }
        });
    } //end of getOne

    insert(game){
        return new Promise(async (resolve,reject)=>{
            if(game){
                if(!game.number){
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if(await getFromStorage(game.number)){
                    reject(MESSAGES.ALREADY_IN_USE(game.number))
                }
                else if(await addToStorage(game)){
                    resolve(MESSAGES.INSERT_OK(game.number))
                }
                else{
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else{
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    } //end of insert

    update(game){
        return new Promise(async (resolve,reject)=>{
            if(game){
                if(await updateStorage(game)){
                    resolve(MESSAGES.UPDATE_OK(game.number));
                }
                else{
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            else{
                reject(MESSAGES.NOT_UPDATED());
            }
        });
    } //end update

    remove(number){
        return new Promise(async (resolve,reject)=>{
            if(!number){
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else if(await removeFromStorage(number)){
                resolve(MESSAGES.REMOVE_OK(number));
            }
            else{
                reject(MESSAGES.NOT_REMOVED(number));
            }
        });
    } //end of remove
}