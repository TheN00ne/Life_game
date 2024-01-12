import React from 'react';
import ReactDOM from 'react-dom';

import { useState, useEffect } from 'react';

import style from "./styles/style.module.css"

const app = document.getElementById("app");

function App(){

  let [field, setField] = useState([]);
  let [id, setId] = useState(0);
  let [times, setTimes] = useState(0);

  function change(cell){
    setField(field.map((row) => (
      row.map((el) => {
        if((el.id == cell.id) && (el.row == cell.row)){
          return(
            {id:el.id, isAlive:!el.isAlive, row:el.row}
          )
        }
        else{
          return el;
        }
      })
    )))
  }

  useEffect(() =>
   {
    for(let i = 0; i < 25; i++){
      let row = [];
      for(let j = 0; j < 25; j++){
        row.push({id:id, isAlive:false, row:i});
        setId(id++);
        console.log("yey");
      }
      field.push(row);
    }
   }, []);

   function run(){
      let arr = field.map((row, id) => {
        let line = row.map((cell, inx) => {
          let prevR;
          let nextR;
  
          let prevC;
          let nextC;
  
          if(id - 1 < 0){
            prevR = 24;
          }
          else{
            prevR = id - 1;
          }
  
          if(id + 1 > 24){
            nextR = 0;
          }
          else{
            nextR = id + 1;
          }
          
          if(inx - 1 < 0){
            prevC = 24;
          }
          else{
            prevC = inx - 1;
          }
  
          if(inx + 1 > 24){
            nextC = 0;
          }
          else{
            nextC = inx + 1;
          }
  
          let value = 0;
  
          if(field[prevR][prevC].isAlive == true){
            value += 1;
          }
          if(field[prevR][inx].isAlive == true){
            value += 1;
          }
          if(field[prevR][nextC].isAlive == true){
            value += 1;
          }
  
          if(field[id][prevC].isAlive == true){
            value += 1;
          }
          if(field[id][nextC].isAlive == true){
            value += 1;
          }
  
          if(field[nextR][prevC].isAlive == true){
            value += 1;
          }
          if(field[nextR][inx].isAlive == true){
            value += 1;
          }
          if(field[nextR][nextC].isAlive == true){
            value += 1;
          }

          if((cell.isAlive == false) && (value == 3)){
            return {id: cell.id, isAlive: true, row:cell.row}
          }

          if((cell.isAlive == true) && ((value == 2) || (value == 3))){
            return {id: cell.id, isAlive: true, row:cell.row}
          }
          else{
            return {id: cell.id, isAlive: false, row:cell.row}
          }
        })
        return line;
   })
      setField(arr);
   }

   useEffect(() => {
    run();
    console.log("+");
   }, [times])

  return(
    <div className={style.outside}>
      <h1>Life game</h1>
      <div className={style.field}>
        {
          field.map((row, inx) => (
            <div className={style.row} key={inx}>
              {
                row.map((cell) => (
                  <span className={`${cell.isAlive == true ? style.cellAlive : style.cellDead}`} tabIndex={1} key={cell.id} onMouseDown={() => {change(cell)}}   onKeyDown={(e) => {if(e.key == " "){change(cell)}}}></span>
                ))
              }
            </div>
          ))
        }
      </div>
      <button onClick={() => {run()}}>Next</button>
      <button onClick={() => {
            setInterval(() => {
              setTimes(times + 1);
            }, 100);
      }}>Start</button>
    </div>
  )
}

ReactDOM.render(<App/>, app);