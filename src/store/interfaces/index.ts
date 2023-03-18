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
  number?: string;
  sprite?: string;
  fainted: boolean;
}

export interface Video {
  name: string;
  channel: string;
  url: string;
}
