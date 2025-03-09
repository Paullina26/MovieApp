import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from '../api/api';
import { Genre } from '../types';
import { FilterValues } from '../types';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

interface MovieFilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ onFilterChange }) => {
  const [query, setQuery] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [minVoteAverage, setMinVoteAverage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('popularity.desc');
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetch(ENDPOINTS.genreList)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGenres(data.genres);
      })
      .catch(err => {
        console.error('Błąd pobierania gatunków:', err);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ query, genre, minVoteAverage, sortBy });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        m: 2,
        p: 0,
        justifyContent: 'center',
      }}
    >
      <TextField
        inputProps={{ sx: { fontSize: '0.8rem' } }}
        label='Nazwa filmu'
        variant='outlined'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <FormControl variant='outlined' sx={{ minWidth: 120, maxWidth: 200 }}>
        <InputLabel id='genre-label'>Kategoria</InputLabel>
        <Select
          sx={{ fontSize: '0.8rem' }}
          labelId='genre-label'
          label='Kategoria'
          value={genre}
          onChange={e => setGenre(e.target.value)}
        >
          <MenuItem value=''>
            <em>Brak</em>
          </MenuItem>
          {genres.map(g => (
            <MenuItem key={g.id} value={g.id.toString()}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        inputProps={{ sx: { fontSize: '0.8rem' } }}
        label='Minimalna ocena'
        variant='outlined'
        type='number'
        value={minVoteAverage}
        onChange={e => setMinVoteAverage(Number(e.target.value))}
      />
      <FormControl variant='outlined' sx={{ maxWidth: 200 }}>
        <InputLabel id='sort-label'>Sortowanie</InputLabel>
        <Select
          sx={{ fontSize: '0.8rem' }}
          labelId='sort-label'
          label='Sortowanie'
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <MenuItem value='primary_release_date.desc'>
            Data premiery (malejąco)
          </MenuItem>
          <MenuItem value='primary_release_date.asc'>
            Data premiery (rosnąco)
          </MenuItem>
          <MenuItem value='popularity.desc'>Popularność (malejąco)</MenuItem>
          <MenuItem value='popularity.asc'>Popularność (rosnąco)</MenuItem>
          <MenuItem value='vote_average.desc'>Ocena (malejąco)</MenuItem>
          <MenuItem value='vote_average.asc'>Ocena (rosnąco)</MenuItem>
        </Select>
      </FormControl>
      <Button
        sx={{
          backgroundColor: 'rgba(0, 247, 255, 0.5)',
          color: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 255, 255)',
          '&:hover': { backgroundColor: 'rgba(0, 255, 229, 0.7)' },
        }}
        variant='contained'
        type='submit'
      >
        Szukaj
      </Button>
    </Box>
  );
};

export default MovieFilter;
