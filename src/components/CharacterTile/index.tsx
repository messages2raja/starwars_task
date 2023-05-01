import React, { useState } from "react";
import { MdStarBorder, MdStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setFavouriteCharacter,
  removeFavouriteCharacter,
} from "../../store/slices/Character.slice";
import {
  removeFavoriteFilm,
  setFilmFavourite,
} from "../../store/slices/Film.slice";
import "./styles.scss";

interface ICardProps {
  imageUrl: string;
  name: string;
  id: string;
  type: "characters" | "films" | "starships" | "vehicles" | "planets";
  isFavourited: boolean;
}

export function Card({
  type,
  imageUrl,
  name,
  id,
  isFavourited = false,
}: ICardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavourited);
  const dispatch = useDispatch();

  function handleFavourite() {
    if (isFavourited === false) {
      if (type === "characters") {
        dispatch(setFavouriteCharacter({ name, id }));
      }

      if (type === "films") {
        dispatch(setFilmFavourite({ title: name, id }));
      }
    } else {
      if (type === "characters") {
        dispatch(removeFavouriteCharacter({ name, id }));
      }

      if (type === "films") {
        dispatch(removeFavoriteFilm({ title: name, id }));
      }
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="cardContainer">
      <button type="button" onClick={() => handleFavourite()}>
        {!isFavorite ? (
          <MdStarBorder size={32} data-testid="favourite-icon" />
        ) : (
          <MdStar data-testid="favourite-icon" size={32} />
        )}
      </button>

      <img src={imageUrl} alt={`Images of ${name}`} />

      <div className="card-name">
        <Link to={`/${type}/${id}`}>
          <span>{name}</span>
        </Link>
      </div>
    </div>
  );
}
