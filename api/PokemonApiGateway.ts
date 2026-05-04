import { EvolutionChain, Pokemon, PokemonSpecies } from '../models/Pokemon';

export interface PokemonApiGateway {
  getPokemonByName(name: string): Promise<Pokemon>;
  getSpeciesByUrl(url: string): Promise<PokemonSpecies>;
  getEvolutionChainByUrl(url: string): Promise<EvolutionChain>;
}
