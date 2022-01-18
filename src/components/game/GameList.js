import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { getGames, getGamesByTerm, orderGames } from "./GameManager"
import "./GameList.css"

export const GameList = () => {
    const [games, setGames] = useState([])
    const history = useHistory()
    const [searchTerm, setTerm] = useState("")
    const [display, setDisplay] = useState("")

    useEffect(() => {
        getGames().then(games => setGames(games))
    }, [])

    const handleSearch = (e) => {
        if (e.code === "Enter") {
            getGamesByTerm(searchTerm)
                .then(games => setGames(games))
        }
    }

    const handleSort = (e) => {
        setDisplay(e.target.value)
        if (e.target.value !== "") {
            orderGames(e.target.value)
                .then(games => setGames(games))
        } else {
            getGames().then(games => setGames(games))
        }
    }

    console.log(games)

    return (<>

        <h2>Games</h2>
        <div className="gameActions">
            <button onClick={() =>
                history.push("/games/new")
            }>Create Game</button>
            <fieldset className="sortGames">
                <label htmlFor="sortGames">Sort: </label>
                <select name="sortGames"
                    defaultValue="0"
                    onChange={handleSort}>
                    <option value="0" disabled>Sort by...</option>
                    <option value="title">Reset</option>
                    <option value="year_released">Year released</option>
                    <option value="time_to_play">Estimated time to play</option>
                    <option value="designer">Designer</option>
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="search">Search Games: </label>
                <input type="text" name="search" onChange={(e) => setTerm(e.target.value)} onKeyPress={handleSearch} />
            </fieldset>
        </div>

        <ul>

            {games.map(game => {
                return <li key={game.id}>
                    <Link to={`/games/${game.id}`}>{game.title}</Link>&nbsp;
                    {display === "year_released" ?
                        `${game.year_released}` :
                        display === "designer" ?
                            `${game.designer}` :
                            display === "time_to_play" ?
                                `${game.time_to_play} minutes` :
                                display === "rating" ?
                                    `Rating: ${game.average_rating}`
                                    : ""
                    }
                </li>
            })}
        </ul>
    </>)
}