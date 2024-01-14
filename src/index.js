import React from 'react';
import ReactDOM from 'react-dom';

import { useState, useEffect } from 'react';

import style from "./styles/style.module.css"

const app = document.getElementById("app");

function App(){

  let [field, setField] = useState([]);
  let [id, setId] = useState(0);
  let [isStart, setIsStart] = useState(false);
  let [timer, setTimer] = useState(null);
  let [steps, setSteps] = useState(0);
  let [click, setClick] = useState(0);

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

  function random(){
    setId(0);
    setSteps(0);
    let newField = [];
    for(let i = 0; i < 60; i++){
      let row = [];
      for(let j = 0; j < 70; j++){
        let is = Math.round(Math.random());
        row.push({id:id, isAlive:is, row:i});
        setId(id++);
      }
      newField.push(row);
    }
    setField(newField);
  }

  function clear(){
    setSteps(0);
    let newField = [];
    for(let i = 0; i < 60; i++){
      let row = [];
      for(let j = 0; j < 70; j++){
        row.push({id:id, isAlive:false, row:i});
        setId(id++);
      }
      newField.push(row);
    }
    setField(newField);
  }

  useEffect(clear, []);

   function run(prev) {
    let newArr = prev.map((row, id) => {
      let line = row.map((cell, inx) => {
        let prevR;
        let nextR;

        let prevC;
        let nextC;

        if(id - 1 < 0){
          prevR = field.length - 1;
        }
        else{
          prevR = id - 1;
        }

        if(id + 1 > field.length - 1){
          nextR = 0;
        }
        else{
          nextR = id + 1;
        }
        
        if(inx - 1 < 0){
          prevC = row.length - 1;
        }
        else{
          prevC = inx - 1;
        }

        if(inx + 1 > row.length - 1){
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
      });
      return line;
    });
    setField(newArr);
    setSteps(steps + 1);

    if(isStart){
      setTimer(setTimeout(() => run(newArr), 200));
    }
  }

   useEffect(() => {
    if (isStart) {
      run(field);
      clearTimeout(timer);
    }
    else{
      clearTimeout(timer);
    }
    }, [isStart, timer]);

  return(
    <div>
      <b className={style.steps}>Steps: {steps}</b>
      <div className={style.outside}>
        <h1>Life game</h1>
        <div className={style.field}>
          {
            field.map((row, inx) => (
              <div className={style.row} key={inx}>
                {
                  row.map((cell) => (
                    <span className={`${cell.isAlive == true ? style.cellAlive : style.cellDead}`} onMouseEnter={(e) => {e.currentTarget.style.border = "1px dashed white"}} onMouseLeave={(e) => {e.currentTarget.style.border = ""}} tabIndex={1} key={cell.id} onMouseMove={() => {if(click){change(cell)}}} onMouseDown={() => {setClick(true)}} onMouseUp={() => {setClick(false)}} onClick={() => {change(cell)}} onKeyDown={(e) => {if(e.code == "Enter"){change(cell)}}}></span>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
      <div className={style.buttons}>
        <button className={isStart ? `${style.disBut}` : `${style.but}`} disabled={isStart ? true : false} onClick={() => {run(field)}}>Next</button>
        <button className={style.but} onClick={() => {setIsStart(!isStart)}}>{isStart ? "Stop" : "Start"}</button>
        <button className={isStart ? `${style.disBut}` : `${style.but}`} disabled={isStart ? true : false} onClick={() => {random()}}>Random</button>
        <button className={isStart ? `${style.disBut}` : `${style.but}`} disabled={isStart ? true : false} onClick={() => {clear()}}>Clear</button>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, app);