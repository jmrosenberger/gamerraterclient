import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createReview, getGame } from "./GameManager";

export const ReviewForm = () => {
    const [game, setGame] = useState([])
    const { gameId } = useParams()
    const [review, setReview] = useState("")
    const history = useHistory()

    useEffect(() => {
        getGame(gameId).then(game => setGame(game))
    }, [gameId])

    const submitReview = () => {
        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

        const newReview = {
            gameId: parseInt(gameId),
            review: review,
            date: date,
        }
        createReview(newReview)
            .then(response => {
                if (response.ok) { history.push(`/games/${gameId}`) }
            })
    }

    return (<>
        <h2>Review {game.title}</h2>
        <p>
            <textarea cols="50" rows="10" onChange={(event) => setReview(event.target.value)} />
        </p>
        <p>
            <button onClick={submitReview}>Submit Review</button>
        </p>
    </>)
}