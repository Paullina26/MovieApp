import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../api/api';
import { Genre, FilterValues } from '../types';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Drawer,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useStatus } from '../context/StatusContext';

interface MovieFilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ onFilterChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [minVoteAverage, setMinVoteAverage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('popularity.desc');
  const [genres, setGenres] = useState<Genre[]>([]);
  const { setLoading, setError } = useStatus();

  useEffect(() => {
    setLoading(true);
    fetch(ENDPOINTS.genreList)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGenres(data.genres);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [setLoading, setError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ query, genre, minVoteAverage, sortBy });
    setOpen(false);
  };
  return (
    <Box>
      <Button
        variant='outlined'
        onClick={() => setOpen(true)}
        startIcon={<FilterListIcon />}
        // sx={{
        //   textTransform: 'none',
        //   m: 2,
        //   position: 'fixed',
        //   top: 2,
        //   right: 0,
        //   zIndex: 2,
        // }}
      >
        Filtry
      </Button>
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '90%',
              mx: 'auto',
            }}
          >
            <TextField
              label='Nazwa filmu'
              variant='outlined'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <FormControl variant='outlined'>
              <InputLabel id='genre-label'>Kategoria</InputLabel>
              <Select
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
              label='Minimalna ocena'
              variant='outlined'
              type='number'
              value={minVoteAverage}
              onChange={e => setMinVoteAverage(Number(e.target.value))}
            />
            <FormControl variant='outlined'>
              <InputLabel id='sort-label'>Sortowanie</InputLabel>
              <Select
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
                <MenuItem value='popularity.desc'>
                  Popularność (malejąco)
                </MenuItem>
                <MenuItem value='popularity.asc'>
                  Popularność (rosnąco)
                </MenuItem>
                <MenuItem value='vote_average.desc'>Ocena (malejąco)</MenuItem>
                <MenuItem value='vote_average.asc'>Ocena (rosnąco)</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{
                backgroundColor: 'rgb(0, 150, 156)',
                color: 'rgb(255, 255, 255)',
                '&:hover': { backgroundColor: 'rgb(0, 195, 202)' },
              }}
              variant='contained'
              type='submit'
            >
              Szukaj
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MovieFilter;
