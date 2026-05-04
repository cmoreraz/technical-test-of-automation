import { PokemonWithWeight } from '../models/Pokemon';
import { PokemonSorter } from './PokemonSorter';

export class AlphabeticalPokemonSorter implements PokemonSorter {
  sortByName(pokemon: PokemonWithWeight[]): PokemonWithWeight[] {
    const orderedPokemon: PokemonWithWeight[] = [...pokemon];

    for (let currentIndex: number = 1; currentIndex < orderedPokemon.length; currentIndex++) {
      this.insertPokemonAlphabetically(orderedPokemon, currentIndex);
    }

    return orderedPokemon;
  }

  private insertPokemonAlphabetically(pokemon: PokemonWithWeight[], currentIndex: number): void {
    const currentPokemon: PokemonWithWeight = pokemon[currentIndex];
    let previousIndex: number = currentIndex - 1;

    previousIndex = this.moveGreaterPokemon(pokemon, currentPokemon, previousIndex);
    pokemon[previousIndex + 1] = currentPokemon;
  }

  private moveGreaterPokemon(
    pokemon: PokemonWithWeight[],
    currentPokemon: PokemonWithWeight,
    previousIndex: number,
  ): number {
    while (this.shouldMovePokemon(pokemon, currentPokemon, previousIndex)) {
      pokemon[previousIndex + 1] = pokemon[previousIndex];
      previousIndex--;
    }

    return previousIndex;
  }

  private shouldMovePokemon(
    pokemon: PokemonWithWeight[],
    currentPokemon: PokemonWithWeight,
    previousIndex: number,
  ): boolean {
    return previousIndex >= 0 && pokemon[previousIndex].name.localeCompare(currentPokemon.name) > 0;
  }
}
