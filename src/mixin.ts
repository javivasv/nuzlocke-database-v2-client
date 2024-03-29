export default {
  data: () => ({
    pokemonTypes: [
      {
        name: "Normal",
        value: "normal",
        color: "#A8A878",
        on: false,
      },
      {
        name: "Fighting",
        value: "fighting",
        color: "#C03028",
        on: false,
      },
      {
        name: "Flying",
        value: "flying",
        color: "#A890F0",
        on: false,
      },
      {
        name: "Poison",
        value: "poison",
        color: "#A040A0",
        on: false,
      },
      {
        name: "Ground",
        value: "ground",
        color: "#E0C068",
        on: false,
      },
      {
        name: "Rock",
        value: "rock",
        color: "#B8A038",
        on: false,
      },
      {
        name: "Bug",
        value: "bug",
        color: "#A8B820",
        on: false,
      },
      {
        name: "Ghost",
        value: "ghost",
        color: "#705898",
        on: false,
      },
      {
        name: "Steel",
        value: "steel",
        color: "#B8B8D0",
        on: false,
      },
      {
        name: "Fire",
        value: "fire",
        color: "#F08030",
        on: false,
      },
      {
        name: "Water",
        value: "water",
        color: "#6890F0",
        on: false,
      },
      {
        name: "Grass",
        value: "grass",
        color: "#78C850",
        on: false,
      },
      {
        name: "Electric",
        value: "electric",
        color: "#F8D030",
        on: false,
      },
      {
        name: "Psychic",
        value: "psychic",
        color: "#F85888",
        on: false,
      },
      {
        name: "Ice",
        value: "ice",
        color: "#98D8D8",
        on: false,
      },
      {
        name: "Dragon",
        value: "dragon",
        color: "#7038F8",
        on: false,
      },
      {
        name: "Dark",
        value: "dark",
        color: "#705848",
        on: false,
      },
      {
        name: "Fairy",
        value: "fairy",
        color: "#EE99AC",
        on: false,
      },
    ],
  }),
  methods: {
    required(value: string, type: string) {
      if (value) return true;
      return `You must enter ${type === "email" ? "an" : "a"} ${type}`;
    },
    validEmail(value: string) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (emailRegex.test(value)) return true;
      return `You must enter a valid email`;
    },
    passwordMatch(value: string, secondValue: string) {
      if (value === secondValue) return true;
      return "The passwords must match";
    },
  },
};
