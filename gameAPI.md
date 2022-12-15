# Game data storage

## otulugbu_alexander_games.json

```json
[
    {
        "number": 1,
        "name": "Amnesia 2030",
        "quantity": 7,
        "genre": "adventure",
        "rating": "*****"
    },
    {
        "number": 5,
        "name": "The Rise and Fall of an Empire 22",
        "quantity": 30,
        "genre": "platformer",
        "rating": "*"
    }
]
```

number is unique!

### Public API (methods of Datastorage class)

#### dataStorageLayer.js
-   getAll()
    -   returns an array of all games / []
-   getOne(number)
    -   returns an game object / NOT_FOUND
-   insert(newGame)
    -   returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE
-   update(updatedGame)
    -   returns UPDATE_OK / NOT_UPDATED
-   remove(number)
    -   REMOVE_OK / NOT_FOUND / NOT_REMOVED
-   getters for status codes
    -   returns an array of status codes

### Private API

#### readerWriter.js

-   readStorage(storageFile)
    -   returns an array of games / []

-   writeStorage(storageFile, data)
    -   returns true/false

#### storageLayer.js
-   getAllFromStorage()
    -   returns an array of games / []

-   getFromStorage(number)
    -   returns an game object / null

-   addToStorage(newgame)
    -   returns true / false

-   updateStorage(updatedgame)
    -   returns true / false

-   removeFromStorage(number)
    -   returns true / false

#### statusCodes.js

```js
const CODES={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ...
}
```

The format of an status/error message is:

```js
const MESSAGES={
    PROGRAM_ERROR: ()=> ({
        message:'Sorry! Error in our program',
        code:CODES.PROGRAM_ERROR,
        type:'error'
    }),
    NOT_FOUND: number=>({
        message:`No game found with number ${number}`,
        code:CODES.NOT_FOUND,
        type:'error'
    }),
    INSERT_OK: number=>({
        message:`game ${number} was inserted`,
        code:CODES.INSERT_OK,
        type:'info'
    })
}
```
status types are `error` or `info`