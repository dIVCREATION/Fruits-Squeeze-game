import React, { useEffect, useState } from 'react';
import './App.css';
import grape from './images/grape.jpg';
import banana from './images/banana.jpg';
import berry from './images/berry.jpg';
import cherry from './images/cherry.jpg';
import orange from './images/orange.jpg';
import appricot from './images/appricot.jpg';
import white from './images/white.jpg';
 
const width = 8;
const fruitCrush = [
  grape,
  banana,
  cherry,
  berry,
  orange,
  appricot
]

const  App = () => {
  
  const [currentFruitArrangment, setCurrentFruitArrangment] = useState([]);
  const [squareDrag , setSquareDrag] = useState(null)
  const [squareReplace, setSquareReplace] = useState(null);
  const [score, setScore] = useState(0);

  const checkforcolFour = () =>{
    for(let i=1; i<39 ; i++){
    const colofFour = [i, i+width, i+ width * 2, i + width * 3]
    const desideFruit = currentFruitArrangment[i]

    if(colofFour.every(square => currentFruitArrangment[square] === desideFruit)){
      colofFour.forEach(square => currentFruitArrangment[square] === '')
      return true
    }
    }
  }

  const checkforRowFour = () =>{
    for(let i=0; i<64; i++){
      const rowofFour = [i, i+1, i+3];
      const desideFruit = currentFruitArrangment[i] ;
      const notValid = [5,6,7,13,14,15,22,23,24,29,30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isWhite = currentFruitArrangment[i] === white;
      if(notValid.includes(i)) continue

      if(rowofFour.every(square => currentFruitArrangment[square] === desideFruit && !isWhite)){
rowofFour.forEach(square => currentFruitArrangment[square] = white)
return true
      }
    }
  }
  const checkforColThree = () =>{
    for(let i=0; i<=47; i++){
      const colofThree = [i, i+width, i + width*2];
      const desideFruit = currentFruitArrangment[i];
    
      if( colofThree.every(square => currentFruitArrangment[square] === desideFruit)){
          colofThree.forEach(square => currentFruitArrangment[square] = '')
          return true
      }
    }
      }

  const checkforRowThree = () => {
    for(let i=0; i < 64; i++) {
      const rowofThree = [i, i+1 , i+2]
      const desideFruit = currentFruitArrangment[i];
      const notValid = [6, 7, 14, 15, 22,23, 31, 38, 39, 46, 47,54, 55, 63, 64];
      const isWhite = currentFruitArrangment[i] === white;

      if(notValid.includes(i)) continue

    if( rowofThree.every(square => currentFruitArrangment[square] === desideFruit && !isWhite)) {
          rowofThree.forEach(square => currentFruitArrangment[square] = white)
      return true
      }
    }
    }

   const moveSquareBelow = () =>{
    for(let i=0; i<=55; i++){
      const firstRow  = [0,1,2,3,4,5,6,7]
      const isFirstRow = firstRow.includes(i)

      if(isFirstRow && currentFruitArrangment[i] === white){
          let randumNum = Math.floor(Math.randum() *fruitCrush.length)
currentFruitArrangment[i] = fruitCrush[randumNum]
      }
      if(currentFruitArrangment[i+width] === white){
        currentFruitArrangment[i+width] = currentFruitArrangment[i];
        currentFruitArrangment[i] = white;
      }
    }
   }
const dragStart =(e) =>{
  setSquareDrag(e.target)
}
const dragDrop = (e) =>{
  setSquareReplace(e.target)
}
const dragEnd = (e) =>{
  const squareDragId = parseInt(squareDrag.getAttribute('data-id'))
  const squareReplaceId = parseInt(squareReplace.getAttribute('data-id'))

  currentFruitArrangment[squareDragId] = squareDrag.getAttribute('src')
  currentFruitArrangment[squareReplaceId] = squareReplace.getAttribute('src')
}
    
  const board = ()=>{
    const randumFruitArrangment = []
    for (let i=0; i< width * width; i++){
      const randumFruit = fruitCrush[Math.floor(Math.random()*fruitCrush.length)]
randumFruitArrangment.push(randumFruit)
    }
    setCurrentFruitArrangment(randumFruitArrangment);
    //console.log(randumFruitArrangment);
  }
useEffect(()=>{
  board()
},[])

useEffect(()=>{
 const time = setInterval(()=>{
  checkforcolFour()
  checkforRowFour()
  checkforColThree()
  checkforRowThree()

  setCurrentFruitArrangment([...currentFruitArrangment])
  },100)
  return ()=> clearInterval(time)

},[checkforcolFour,checkforRowFour,checkforColThree,checkforRowThree, currentFruitArrangment])
console.log(currentFruitArrangment)

  return (
    <>
    <div className='app'>
      <div className='board'>
        {
          currentFruitArrangment.map((fruitCrush, index) => (
<img  key={index} src={fruitCrush} alt={fruitCrush} data-id={index}>
</img>
       ))   }
        
      </div>
    </div>
    
    </>
  );
}

export default App;
