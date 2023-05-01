import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { useCharacter } from "../../hooks/useCharacter";
import { api } from "../../services/api";
import { Character } from "../../types/Character.type";
import { getUrlId } from "../../Utils/getUrlId";
import "./styles.scss";

export default function CharacterPage() {
  const [data, setData] = useState<Character>();
  const {
    films,
    homeWorld,
    isLoading: isLoadingCharacter,
  } = useCharacter(data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const getCharacterData = useCallback(async () => {
    try {
      const response = await api.get(`/people/${id}`);
      setData(response.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData]);

  return (
    <div className="characterPageContainer">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="characterContainer">
          <div className="character-data">
            <div className="character-data-details">
              <h1>{data?.name}</h1>
              <p>
                Home Planet: <span>{homeWorld.name}</span>
              </p>

              <p>
                Date of Birth: <span>{data?.birth_year}</span>
              </p>

              <p>
                Gender: <span>{data?.gender}</span>
              </p>

              <p>
                Height: <span>{data?.height} cm</span>
              </p>

              <p>
                Weight: <span>{data?.mass} kg</span>
              </p>

              <p>
                Skin Color: <span>{data?.skin_color}</span>
              </p>

              <p>
                Eye Color: <span>{data?.eye_color}</span>
              </p>

              <p>
                Hair Color: <span>{data?.hair_color}</span>
              </p>
            </div>

            <div className="character-data-others">
              {isLoadingCharacter ? (
                <p>Loading...</p>
              ) : (
                <>
                  {" "}
                  <div className="character-data-others-data">
                    <h2>Films</h2>
                    <ul>
                      {films.map((film) => (
                        <li key={film.title}>
                          <Link to={`/films/${getUrlId(film.url)}`}>
                            <MdMovie />
                            {film.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="character-image">
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt={`Images of ${data?.name}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
