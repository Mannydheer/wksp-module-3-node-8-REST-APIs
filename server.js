'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {
    words
} = require('./data/words');

const PORT = process.env.PORT || 8000;

let wordEnter;
let indexGetter;

const handleWord = (req, res) => {
    let random = Math.floor(Math.random() * 8)
    //    wordEnter = words[random].word
    let wordInfo = {
        id: words[random].id,
        letterCount: words[random].letterCount,
    }
    res.send(wordInfo)

}




const handleEach = (req, res) => {
    let boolBox = [];


    // res.send(words[0].word)
    let letterholder = req.params.letter
    // hold the letter. 
    const gameWord = words.find(word => {
        if (word.id === req.params.wordId) {
            return word
        }
    })
    const currentWord = gameWord.word
    console.log(gameWord)
    //First thing split each letter and insert into an array. 
    let splitWord = currentWord.split('')
    //have a counter which counts the words where I can compare. 
    let wordCount = splitWord.length
    //make an array with bools of false. 
    for (let i = 0; i < wordCount; i++) {
        boolBox.push(false)
    }
    console.log(boolBox)
    // now a button will be pressed and the value of it will be the letter entered.... 
    // do a for each for the booleans which goes and checks if the letter exicsts and if it does, get
    // the array index and also make it into true. Once they are all true, you win....
    splitWord.forEach(letter => {
        if (letter === letterholder) {

            //assign the bool to true. 
            //get the index of the current letter. 
            indexGetter = splitWord.indexOf(letter)
            console.log(indexGetter)
            // letterInsert[indexGetter] = letterentered;
            boolBox[indexGetter] = true;
            // console.log(boolBox)
            //create an object with the information. 
            res.send(boolBox)




        }

    });
    // res.send(wordEnter)
    //this boolean will hold the index of at which we want to insert
    // the letter in the front end 



    //wordId will give me the word. 
    //once I get the word, push into an array and get the length - .length

}

express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({
        extended: false
    }))

    // endpoints
    .get("/hangman/words", handleWord)
    .get("/hangman/guess/:wordId/:letter", handleEach)

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));

// - `GET /hangman/guess/:wordId/:letter` This will return
//     - the appropriate status code
//     - If the letter guessed is in the word, return an array of booleans that map the letter's position in the word. This will be processed by the FE.