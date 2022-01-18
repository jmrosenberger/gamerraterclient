import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createRating, getRatings, getGame, getGameImages, getReviews, uploadGameImg } from "./GameManager";
import "./GameDetails.css"

export const GameDetails = () => {
    const { gameId } = useParams()
    const [game, setGame] = useState([])
    const [reviews, setReviews] = useState([])
    const history = useHistory()
    const [gameImage, setImage] = useState("")
    const [gameImages, setGameImages] = useState([])
    const [gameRating, setGameRating] = useState([])

    useEffect(() => {
        fetchGame()
        getReviews(gameId)
            .then(reviews => setReviews(reviews))
        fetchRatings()
        getImages()
    }, [gameId])

    const getImages = () => {
        getGameImages(gameId).then(images => setGameImages(images))
    }
    const fetchGame = () => {
        getGame(gameId)
            .then(game => setGame(game))
        fetchRatings()
    }

    const fetchRatings = () => {
        getRatings(gameId).then(data => setGameRating(data))
    }

    const oneToTen = () => {
        let array = []
        for (let i = 1; i < 11; i++) array.push(i)
        return array
    }
    const ratings = oneToTen()

    // File reader that converts image data to Base64.
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    // Calls file reader function and converts Base64 to string and saves it as a variable.
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setImage(base64ImageString)
        });
    }

    const createImage = () => {
        const image = {
            game_id: parseInt(gameId),
            url: gameImage
        }
        uploadGameImg(image)
            .then(getImages)
    }


    return (<>

        <h2>{game.title}</h2>
        <div>
            <button onClick={() => history.push(`edit/${game.id}`)}>Edit</button>
        </div>

        <div>Designer: {game.designer}</div>
        <div>Year released: {game.year_released}</div>
        <div>Number of players: {game.num_players}</div>
        <div>Estimated time to play: {game.gameplay_length}</div>
        <div>Age recommendation: {game.age}</div>
        <div>Categories: {game.categories?.map(category => {
            return category.label
        }).join(", ")}</div>

        <h3>Reviews</h3>
        {reviews.length === 0 ? `Be the first to write a review of ${game.title}!` : ""}
        {reviews?.map(review => {
            return <p>
                "{review.review}" by <u>{review.player.user.first_name} {review.player.user.last_name}</u>
            </p>
        })}

        <p>
            <button onClick={() => history.push(`/games/${game.id}/review`)}>
                Write a review</button>
        </p>

        <h3>Rating: <b>{gameRating.rating}</b></h3>
        <div>
            <label htmlFor="rating">Rate this game: </label>
            <select name="rating" defaultValue={0}
                onChange={(e) => createRating({ rating: parseInt(e.target.value), gameId: game.id }).then(fetchGame())}>
                <option value={0} disabled>Rating</option>
                {ratings.map(num => {
                    return <option value={num}>{num}</option>
                })}
            </select>
        </div>

        <div>
            <h3>User Uploaded Images</h3>
            <div className="gameImages">

                {gameImages?.map(img => {
                    return <>
                        <div className="gameImg">
                            <img src={img?.image} alt={`game-${img?.image}`} />
                        </div>
                    </>
                })
                }
            </div>
            <input type="file" id="game_image" onChange={createGameImageString} />
            <input type="hidden" name="game_id" value={game.id} />
            <button onClick={createImage}>Upload</button>
        </div>

    </>)
}
