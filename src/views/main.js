import { useState, useEffect } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UpdateIcon from '@mui/icons-material/Update'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import firstToUpper from '../helpers/firstToUpperCase'



const Main = () => {

    const [search, setSearch] = useState('')
    const [pokemons, setPokemons] = useState([])
    const [queriedPokemon, setQueriedPokemon] = useState({})
    const [reset, setReset] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {

        const delayDebounceFn = setTimeout(async () => {
            if (search !== '') {
                const response = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)).data
                const pokemon = {
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`,
                    imgJuego: response.sprites.front_default,
                    imgCvg: response.sprites.other.dream_world.front_default,
                    nombre: firstToUpper(response.name),
                    experiencia: response.base_experience,
                    hp: response.stats[0].base_stat,
                    ataque: response.stats[1].base_stat,
                    defensa: response.stats[2].base_stat,
                    especial: response.stats[3].base_stat,
                    defensaEspecial: response.stats[4].base_stat,
                    velocidad: response.stats[5].base_stat,
                    tipos: (response.types.map(type => firstToUpper(type.type.name))).join(' | ')
                }
                setQueriedPokemon(pokemon)
            }
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [search])

    useEffect(() => {
        getData()
    }, [reset])

    const getData = async () => {
        const randomOffsetNumber = Math.floor(Math.random() * (1000 - 100) + 1)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=14&offset=${randomOffsetNumber}`)
        setPokemons(response.data.results)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
    }));

    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const lightTheme = createTheme({ palette: { mode: 'light' } });


    return (
        <div style={{ backgroundColor: !darkMode ? 'white': '#121212', minHeight: '100vh'}}>
            <ThemeProvider theme={!darkMode ? lightTheme : darkTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            PokeDX
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                        >
                            {
                                darkMode ?
                                <LightModeIcon onClick={() => setDarkMode(false)} /> 
                                :
                                <ModeNightIcon onClick={() => setDarkMode(true)} />
                            }
                        </IconButton>
                        {
                            search === '' ?
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    onClick={() => setReset(!reset)} >
                                    <UpdateIcon />
                                </IconButton>
                                :
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    onClick={() => setSearch('')} >
                                    <ArrowBackIcon />
                                </IconButton>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{ padding: 20 }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Buscar"
                    variant="outlined"
                    onChange={handleChange}
                />
                {search !== '' ?
                    <div style={{ marginTop: 10, textAlign: 'center' }}>
                        <img src={queriedPokemon.imgJuego} alt={queriedPokemon.nombre} />
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            {queriedPokemon.nombre}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            Tipos: {queriedPokemon.tipos} 
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            Experiencia: {queriedPokemon.experiencia}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            HP: {queriedPokemon.hp}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            Ataque: {queriedPokemon.ataque}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            Defensa: {queriedPokemon.defensa}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            Ataque Especial: {queriedPokemon.especial}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            Defensa Especial: {queriedPokemon.defensaEspecial}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            Velocidad: {queriedPokemon.velocidad}
                        </Typography>
                    </div>
                    :
                    <Grid container spacing={2} style={{ marginTop: 15 }}>
                        {pokemons.map((pokemon, index) => (
                            <Grid item xs={6} key={index}>
                                <Box
                                    sx={{
                                        p: 1,
                                        bgcolor: 'background.default',
                                        display: 'grid',
                                        gridTemplateColumns: { md: '1fr 1fr' },
                                        gap: 2,
                                    }}
                                    onClick={() => setSearch(pokemon.name)}
                                >
                                    <Item key={pokemon.name}>
                                        {firstToUpper(pokemon.name)}
                                    </Item>
                                </Box>
                            </Grid>
                        ))
                        }
                    </Grid>
                }
            </div>
            </ThemeProvider>
        </div>
    )
}

export default Main