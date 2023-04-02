export interface Token {
  _id: string;
  exp: number;
  iat: number;
  username: string;
}

export interface UserData {
  username: string;
  password: string;
}

export interface Nuzlocke {
  _id?: string;
  name: string;
  game: string;
  description: string;
  status?: string;
  user?: string;
  pokemon?: Array<Pokemon>;
}

export interface UpdateNuzlockeData {
  nuzlockeId: string;
  nuzlocke: Nuzlocke;
}

export interface Pokemon {
  _id?: string;
  species: PokemonSpecies;
  nickname: string;
  location: string;
  obtained: string;
  original: boolean;
  sprite: string;
  fainted: boolean;
  types: PokemonTypes;
}

export interface PokemonSpecies {
  codedSpecies: string;
  formattedSpecies: string;
}

export interface PokemonTypes {
  first: string;
  second: string;
}

export interface CreatePokemonData {
  nuzlockeId: string;
  pokemon: Pokemon;
}
export interface UpdatePokemonData {
  nuzlockeId: string;
  pokemonId: string;
  pokemon: Pokemon;
}

export interface DeletePokemonData {
  nuzlockeId: string;
  pokemonId: string;
}

export interface PokemonSpeciesDataFromApi {
  name: string;
  url: string;
}

export interface Video {
  name: string;
  channel: string;
  url: string;
}

export interface Filters {
  alive: false;
  fainted: false;
  caught: false;
  gifted: false;
  hatched: false;
  traded: false;
  not: false;
}
