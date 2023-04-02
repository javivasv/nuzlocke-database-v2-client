// User and authentication-related
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

// Nuzlocke-related
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

// Pokemon-related
export interface Pokemon {
  _id?: string;
  originalSpecies: boolean;
  species: PokemonSpecies;
  nickname: string;
  location: string;
  obtained: string;
  sprite: string;
  fainted: boolean;
  types: PokemonTypes;
  originalAbility: boolean;
  ability: PokemonAbility;
}

export interface PokemonSpecies {
  codedSpecies: string;
  formattedSpecies: string;
}

export interface PokemonTypes {
  first: string;
  second: string;
}

export interface PokemonAbility {
  codedAbility: string;
  formattedAbility: string;
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

export interface BasicDataFromApi {
  name: string;
  url: string;
}

export interface Filters {
  status: Array<string>;
  obtained: Array<string>;
  type: Array<string>;
}

export interface Filter {
  value: string;
  type: string;
}

// Video-related
export interface Video {
  name: string;
  channel: string;
  url: string;
}
