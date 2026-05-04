export type NamedResource = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  weight: number;
  species: NamedResource;
};

export type PokemonSpecies = {
  evolution_chain: {
    url: string;
  };
};

export type EvolutionChainLink = {
  species: NamedResource;
  evolves_to: EvolutionChainLink[];
};

export type EvolutionChain = {
  chain: EvolutionChainLink;
};

export type PokemonWithWeight = {
  name: string;
  weight: number;
};
