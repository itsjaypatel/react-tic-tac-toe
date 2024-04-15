import React, { useEffect, useState } from "react";
import { Square } from "./Square";
import { Result } from "./Result";
import { Button } from "./Button";
import { ScoreCard } from "./ScoreCard";
import tapSoundSource from '../sounds/tap-notification-180637.mp3'
import resetIcon from '../svg/undo-arrow-icon.svg'

export const Board = () => {
    const squareButtonCSS = [
        ["square square-border-top square-border-left square-top-left-rounded-border player-x","square square-border-top square-border-left square-top-left-rounded-border player-o"],
        ["square square-border-left square-border-right square-border-top player-x","square square-border-left square-border-right square-border-top player-o"],
        ["square square-border-top square-border-right square-top-right-rounded-border player-x","square square-border-top square-border-right square-top-right-rounded-border player-o"],
        ["square square-border-top square-border-bottom square-border-left player-x","square square-border-top square-border-bottom square-border-left player-o"],
        ["square square-border-left square-border-right square-border-top square-border-bottom player-x","square square-border-left square-border-right square-border-top square-border-bottom player-o"],
        ["square square-border-top square-border-bottom square-border-right player-x","square square-border-top square-border-bottom square-border-right player-o"],
        ["square square-border-left square-border-bottom square-bottom-left-rounded-border player-x","square square-border-left square-border-bottom square-bottom-left-rounded-border player-o"],
        ["square square-border-left square-border-right square-border-bottom player-x","square square-border-left square-border-right square-border-bottom player-o"],
        ["square square-border-right square-border-bottom square-bottom-right-rounded-border player-x","square square-border-right square-border-bottom square-bottom-right-rounded-border player-o"]
    ];
    const playerTurnDisplayCSS=["button player-x-move-display", "button player-o-move-display"];
    const [state,setState] = useState(new Array(9));
    const [isXTurn,setXTurn] = useState(false);
    const [gameResult,setGameResult] = useState();
    const winningStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[0,4,8],[2,4,6]];
    const [scorecard,setScoreCard] = useState([0,0,0]);
    const tapSound = new Audio(tapSoundSource);
    function handleClick(index){
        
        if(gameResult === undefined && state[index] === undefined){
            tapSound.volume = 0.75
            tapSound.play()
            const copyState = [...state];
            copyState[index] = isXTurn ? "X" : "O";
            isGameOver(copyState,index);
        }else{
            // square already filled or game is over
        }
    }
    function isGameOver(square,index){
        for (const winningState of winningStates) {
            const [a,b,c] = winningState;
            if(gameResult === undefined && square[a] !== undefined &&  square[a] === square[b] && square[b] === square[c]){
                    setGameResult(`Game Over. Player ${square[index]} wins!`);
                    setState(square);
                    setXTurn(!isXTurn);
                    setScoreCard([scorecard[0] + (square[index] === "X" ? 1 : 0),scorecard[1],scorecard[2] + (square[index] === "O" ? 1 : 0)]);
                    return;
                }
        }    
        let emptySquare = 0;
        square.forEach((cell)=>{
            if(cell !== "O" && cell !== "X"){
                emptySquare++;
            }
        });
        if(emptySquare === 0){
            setGameResult("Draw");
            setScoreCard([scorecard[0],scorecard[1] + 1,scorecard[2]]);
        }

        setState(square);
        setXTurn(!isXTurn);
    }

    function handleReset(){
        setGameResult(undefined);
        setXTurn(false);
        setState(new Array(9));
    }
    
    return (
        <div className="board-container">
            <div>
            <div className="scorecard-row">
                <ScoreCard value="Player X" score={scorecard[0]} className="score-card player-x-scorecard"/>
                <ScoreCard value="Draw"  score={scorecard[1]} className="score-card draw-scorecard"/>
                <ScoreCard value="Player O" score={scorecard[2]} className="score-card player-o-scorecard"/>
            </div>    
            {/* <Button text="Tic Tac Toe" className="button heading"/> */}
            <div className="board-row">
                <Square onClick={() => handleClick(0)} value={state[0]} className={state[0] === "X"  ? squareButtonCSS[0][0] : squareButtonCSS[0][1]}/>
                <Square onClick={() => handleClick(1)} value={state[1]} className= {state[1] === "X" ? squareButtonCSS[1][0] : squareButtonCSS[1][1]}/>
                <Square onClick={() => handleClick(2)} value={state[2]} className={state[2] === "X" ? squareButtonCSS[2][0] : squareButtonCSS[2][1]}/>
            </div>
            <div className="board-row">
                <Square onClick={() => handleClick(3)} value={state[3]} className={state[3] === "X" ? squareButtonCSS[3][0] : squareButtonCSS[3][1]}/>
                <Square onClick={() => handleClick(4)} value={state[4]} className={state[4] === "X" ? squareButtonCSS[4][0] : squareButtonCSS[4][1]}/>
                <Square onClick={() => handleClick(5)} value={state[5]} className={state[5] === "X" ? squareButtonCSS[5][0] : squareButtonCSS[5][1]}/>
            </div>
            <div className="board-row">
                <Square onClick={() => handleClick(6)} value={state[6]} className={state[6] === "X" ? squareButtonCSS[6][0] : squareButtonCSS[6][1]}/>
                <Square onClick={() => handleClick(7)} value={state[7]} className={state[7] === "X" ? squareButtonCSS[7][0] : squareButtonCSS[7][1]}/>
                <Square onClick={() => handleClick(8)} value={state[8]} className={state[8] === "X" ? squareButtonCSS[8][0] : squareButtonCSS[8][1]}/>
            </div>
            </div>
            {gameResult === undefined && <Button text={isXTurn ? "X Turn" : "O Turn"} className={isXTurn ? playerTurnDisplayCSS[0] : playerTurnDisplayCSS[1]}/>}
            {gameResult !== undefined && <Button text={gameResult} className="button result-ribbon"/>}
            { gameResult !== undefined && <Button onClick={handleReset} text="Play Again" className="button reset-button" icon={resetIcon}/>}
        </div>
    );
}