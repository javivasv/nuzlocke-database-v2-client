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
  species: Name;
  nickname: string;
  location: string;
  obtained: string;
  sprite: string;
  fainted: boolean;
  types: PokemonTypes;
  originalAbility: boolean;
  ability: Name;
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

// Team-related
export interface Team {
  _id?: string;
  name: string;
  description: string;
  pokemon: Array<TeamPokemon>;
}

export interface TeamPokemon {
  _id?: string;
  pokemonId: string;
  item: Item;
  moves: Moves;
}

export interface Item {
  sprite: string;
  name: Name;
}

export interface Moves {
  first: Move;
  second: Move;
  third: Move;
  fourth: Move;
}

export interface Move {
  name: Name;
  class: string;
  type: string;
}

export interface CreateTeamData {
  nuzlockeId: string;
  team: Team;
}

// Pokeapi response-related
export interface Name {
  codedName: string;
  formattedName: string;
}

// Video-related
export interface Video {
  name: string;
  channel: string;
  url: string;
}
