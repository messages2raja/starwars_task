import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCarAlt, FaSpaceShuttle, FaUserAlt } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";
import { BiDna } from "react-icons/bi";
import { api } from "../../services/api";
import "./styles.scss";
import { Film } from "../../types/Film.type";
import { useFilms } from "../../hooks/useFilms";

export default function FilmPage() {
  const [data, setData] = useState<Film>();
  const {
    characters,
    planets,
    species,
    starships,
    vehicles,
    isLoading: isLoadingFilms,
  } = useFilms(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getCharacterData = useCallback(async () => {
    try {
      const response = await api.get(`/films/${id}`);
      setData(response.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  function getUrlId(url: string) {
    const urlId = url.split("/");
    return urlId[urlId.length - 2];
  }

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData]);

  return (
    <div className="filmsContainer">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="characterContainer">
          <div className="films-data">
            <div className="films-data-details">
              <h1>{data?.title}</h1>
              <p>
                Creation date: <span>{data?.release_date}</span>
              </p>

              <p>
                Director: <span>{data?.director}</span>
              </p>

              <p>
                Producer: <span>{data?.producer}</span>
              </p>

              <p>
                Synopsis: <span>{data?.opening_crawl} </span>
              </p>
            </div>

            {isLoadingFilms ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="films-data-characters">
                  <h2>Characters:</h2>
                  <ul>
                    {characters.map((character) => (
                      <li key={character.name}>
                        <Link to={`/characters/${getUrlId(character.url)}`}>
                          <FaUserAlt />
                          {character.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="films-data-others">
                  <div className="films-data-others-data">
                    <h2>Planets</h2>
                    <ul>
                      {planets.map((planet) => (
                        <li key={planet.name}>
                          <IoMdPlanet />
                          {planet.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="films-data-others-data">
                    <h2>Vehicles</h2>
                    <ul>
                      {vehicles.map((vehicle) => (
                        <li key={vehicle.name}>
                          <FaCarAlt />
                          {vehicle.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="films-data-others">
                  <div className="films-data-others-data">
                    <h2>Ships</h2>
                    <ul>
                      {starships.map((starship) => (
                        <li key={starship.name}>
                          <FaSpaceShuttle />
                          {starship.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="films-data-others-data">
                    <h2>Species</h2>
                    <ul>
                      {species.map((specie) => (
                        <li key={specie.name}>
                          <BiDna />
                          {specie.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="film-image">
            <img
              src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`}
              alt={`Images of ${data?.title}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
