import Typography from '@mui/material/Typography'

const PokeDetails = ({ pokemon }) => {

    return (
        <div style={{ marginTop: 10, textAlign: 'center' }}>
            <img src={pokemon.imgJuego} alt={pokemon.nombre} />
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                {pokemon.nombre}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                Tipos: {pokemon.tipos}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                Experiencia: {pokemon.experiencia}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                HP: {pokemon.hp}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                Ataque: {pokemon.ataque}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                Defensa: {pokemon.defensa}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                Ataque Especial: {pokemon.especial}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                Defensa Especial: {pokemon.defensaEspecial}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
                Velocidad: {pokemon.velocidad}
            </Typography>
        </div>
    )
}

export default PokeDetails;