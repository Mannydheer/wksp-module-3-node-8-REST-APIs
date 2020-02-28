
// ... crickets...

// document.getElementById("startGame").addEventListener("click", handleClick);


//Lets make 26 buttons with alphabet and display. 
let gameChecker = [];
let underScore = [];
let boolholder = [];
let idWord;
let winnerCount = 0;
let wordLength = 0;

 

const startGame = () => {
    // event.preventDefault();

    fetch('/hangman/words', 
    {method: 'GET',
    headers: {'Accept': 'application/json',
    'Content-type': 'application/json'},
    })
    .then(wordinfo => {
        let wordObject = wordinfo.json()
        return wordObject
    })
    .then(word => {
        idWord = word.id
        wordLength = word.letterCount;
        //make bool to check and _ array.
        for (let i = 0; i < wordLength; i++) {
            boolholder.push(false);
            underScore.push("_");
            underScores = underScore.toString();
            
            let displayletters = document.getElementById('displayLetters')
            displayletters.innerText = underScores.replace(/,/g," ");

  

        }
    })
}
startGame();
// ----------------------------
const letterClick = (event) => {
    event.preventDefault();
    
let letter = event.target.id
let holder = document.getElementById(letter);
let actualletter = holder.value

        fetch(`/hangman/guess/${idWord}/${actualletter}`, 
        {method: 'GET',
        // body: JSON.stringify(actualletter),
        headers: {'Accept': 'application/json',
        'Content-type': 'application/json'},
        
        // must be sent as STRINGIFY to the backend
        })
        .then(returnedBool => {
           return (returnedBool.json())
        })
        .then(boolChecker => {
            boolChecker.forEach((element, index) => {
                if (element === true) {
                    // boolholder.splice(index,1, true)
                    boolholder[index] = true;
                    //this will keep assinging the bool to true. 
                    // underScore.splice(index,1, `${actualletter}`)
                    underScore[index] = `${actualletter}`
                    //change to string
                    let arraytoString = underScore.toString()
                    //display the letters. 
                    let displayletters = document.getElementById('displayLetters')
                    displayletters.innerText = arraytoString.replace(/,/g," ");

                    // winnerCount++;
                    console.log(winnerCount)
                    console.log(wordLength)
                    if (!boolholder.includes(false)) {
                        winnerEle = document.getElementById('winner')
                        winnerEle.innerText = "YOU WON !!!"
                    }

                } 
                
            });
        })

    }

