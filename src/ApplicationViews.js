import React from "react"
import { Route } from "react-router-dom"
import { GameDetails } from "./components/game/GameDetails"
import { GameForm } from "./components/game/GameForm"
import { GameList } from "./components/game/GameList"
import { ReviewForm } from "./components/game/ReviewForm"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/games/edit/:gameId(\d+)">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/review">
                <ReviewForm />
            </Route>

        </main>
    </>
}