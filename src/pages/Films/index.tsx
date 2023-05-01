import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { Card } from "../../components/CharacterTile";

import { api } from "../../services/api";

import "./styles.scss";
import { getUrlId } from "../../Utils/getUrlId";
import { Film } from "../../types/Film.type";
import SelectButton from "../../components/SelectButton";
import { RootState } from "../../store";
import { MdOutlineInput } from "react-icons/md";

export default function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isFavouriteSelected, setIsFavouriteSelected] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const filmsFavourite = useSelector((state: RootState) => state.film);

  const getData = useCallback(async () => {
    try {
      const response = await api.get("films/");

      const returnedData = await response.data;

      setFilms(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`films/?search=${inputSearch}`);

      const returnedData = await response.data;

      setFilms(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [inputSearch]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputSearch(event.target.value);
  }

  const debouncedOnChange = debounce(handleInputChange, 500);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData]);

  useEffect(() => {
    setIsLoading(true);
    getFilteredData();
  }, [getFilteredData]);

  return (
    <div className="filmsContainer">
      <div className="title">
        <h1>Star Wars: Films</h1>
      </div>

      <div className="header">
        <div className="select">
          <SelectButton
            isSelected={isFavouriteSelected === false}
            onClick={() => setIsFavouriteSelected(false)}
          >
            Todos
          </SelectButton>
          <SelectButton
            isSelected={isFavouriteSelected === true}
            onClick={() => setIsFavouriteSelected(true)}
          >
            Favourites
          </SelectButton>
        </div>
        {!isFavouriteSelected && (
          <input
            className="inputSearch"
            type="text"
            placeholder="Type the name of the movie you want to search for..."
            onChange={(event) => debouncedOnChange(event)}
          />
        )}
        <div className="pagination"></div>
      </div>

      {isLoading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : !isFavouriteSelected ? (
        <div className="cards">
          {films.map((film) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/films/${getUrlId(
                film.url
              )}.jpg`}
              name={film.title}
              key={film.title}
              id={getUrlId(film.url)}
              type="films"
              isFavourited={filmsFavourite.some(
                (data) => data.title === film.title
              )}
            />
          ))}
        </div>
      ) : filmsFavourite.length > 0 ? (
        <div className="cards">
          {filmsFavourite.map((film) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/films/${film.id}.jpg`}
              name={film.title}
              key={film.title}
              id={film.id}
              type="films"
              isFavourited
            />
          ))}
        </div>
      ) : (
        <div className="no-favourite">
          <span>No favorite movie selected</span>
        </div>
      )}
    </div>
  );
}
