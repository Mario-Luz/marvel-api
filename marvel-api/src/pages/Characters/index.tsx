import React, { useCallback, useEffect, useState } from "react";
import { FiChevronDown } from 'react-icons/fi';
import api from "../../services/api";
import { Container, CardList, Card, ButtonMore } from './styles';

interface ResponseData {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<ResponseData[]>([]);

  useEffect(() => {
    api.get('./characters')
      .then(response => {
        setCharacters(response.data.data.results)
        //console.log('segundo log', characters)
      })
      .catch(err => console.log(err))
  }, []);

  const handleMore = useCallback(async () => {
    try {
      const offset = characters.length;
      const response = await api.get('characters', {
        params: {
          offset: offset,
        },
      });
      setCharacters([...characters, ...response.data.data.results]);
    } catch (err) {
      console.log(err);
    }
  }, [characters]);

  return (
    <Container>
      <CardList>
        {characters.map(characters => {
          return (
            <Card key={characters.id} thumbnail={characters.thumbnail}>
              <div id="img" />
              <h2>{characters.name}</h2>
              <p>{characters.description}</p>
            </Card>
          )
        })}
      </CardList>
      <ButtonMore onClick={handleMore}>
        <FiChevronDown size= {20}/>
          Mais
        <FiChevronDown size={20}/>
      </ButtonMore>
    </Container>

  )
};

export default Characters;