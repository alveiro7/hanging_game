import { useEffect, useState } from 'react'
import './App.css'
import { HangImage } from './components/HangImage'
import { getRandomWord } from './helpers/getRandomWord'
import { letters } from './helpers/letters'

function App() {

  const [word, setWord] = useState(getRandomWord())

  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length))

  const [ attempts, setAttempts] = useState(0)

  const [lose, setLose] = useState(false)

  const [won, setWon] = useState(false)

  // Determinar si la persona perdió
  useEffect( () => {
    console.log('El effect ==>', attempts)
    if (attempts >= 9) {
      setLose(true)
    }
  }, [attempts])

  // Determinar si la persona ganó
  useEffect( ()=> {
    console.log(hiddenWord); // _ _ _ _ _ _ _ _ 
    const currentHiddenWord = hiddenWord.split(' ').join('')
    console.log(currentHiddenWord);
    if (currentHiddenWord === word) {
      setWon(true)    
    }
  }, [hiddenWord])

  const checkLetter = ( letter: string) => {

    if (lose) return 
    
    if (!word.includes(letter)) {
      console.log(letter + ' no existe' );
      setAttempts( Math.min( attempts + 1 , 9))
      return
    }

    const hiddenWordArray = hiddenWord.split(' ')
    console.log(hiddenWordArray);

    for (let i = 0; i < word.length; i++) {
      if ( word[i] === letter ) {
        hiddenWordArray[i] =  letter
      }
    }
    console.log(hiddenWordArray);
    console.log(hiddenWordArray.join(' '));
    setHiddenWord( hiddenWordArray.join(' '))
  }

  const newGame = () => {
    const newWord = getRandomWord()
    setWord(newWord)
    setHiddenWord('_ '.repeat(newWord.length))
    setAttempts(0)
    setLose(false)
    setWon(false)
  }

  return (
    <div className="App">
      {/* imagenes del juego */}
      <HangImage imageNumber={attempts}/>

      {/* palabra oculta */}
      <h3>{hiddenWord}</h3>


      {/* contador de intentos */}
      <h3>intentos = {attempts}</h3>

      {/* mensaje si perdio */}
      {
        (lose) 
        ?<h3>GAME OVER...La palabra es {word}</h3>
        : ' '
      }

      {/* mensaje si gano */}
      {
        (won) 
        ?<h3>WINNER...TU ERES UN PRO {word}</h3>
        : ' '
      }

      {/* botones de letras */}
      {
        letters.map( (letter) => (
          <button 
          onClick={ () => checkLetter( letter)}
          key={letter} >{letter}</button>
        ) )
      }
      <div className="card">
        <button onClick={newGame}>
          New Game?
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
