import { IGame } from "../interface/game"
import "./loadGames.css"
type cardProps = {
    card : IGame
}

export const CardGame = ({card} : cardProps) => { 
    return <div className="card-game"> 
        <img src={card.background_image}></img>
        <h3>{card.name}</h3>
        <p>{card.released}</p>
    </div>
}