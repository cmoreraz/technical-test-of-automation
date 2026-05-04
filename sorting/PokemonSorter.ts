import { PokemonWithWeight } from '../models/Pokemon';

export interface PokemonSorter {
  sortByName(pokemon: PokemonWithWeight[]): PokemonWithWeight[];
}
