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
  _id: string;
  name: string;
  game: string;
  description: string;
  status: string;
  user: string;
  pokemon: Array<Pokemon>;
}

export interface Pokemon {
  _id: string;
  species: string;
  nickname?: string;
  location: string;
  obtained: string;
  original: boolean;
  sprite?: string;
  fainted: boolean;
}

export interface PokemonData {
  id: string;
  pokemon: Pokemon;
}

export interface Video {
  name: string;
  channel: string;
  url: string;
}
