import { expect } from '@playwright/test';
import { PokemonWithWeight } from '../models/Pokemon';

export class PokemonAssertions {
  static expectPokemonMembersWithValidWeights(pokemon: PokemonWithWeight[]): void {
    expect(pokemon.length).toBeGreaterThan(0);
    pokemon.forEach((pokemonMember: PokemonWithWeight): void => this.expectValidPokemonMember(pokemonMember));
  }

  static expectPokemonNamesInAlphabeticalOrder(pokemon: PokemonWithWeight[]): void {
    for (let currentIndex: number = 1; currentIndex < pokemon.length; currentIndex++) {
      const previousPokemon: PokemonWithWeight = pokemon[currentIndex - 1];
      const currentPokemon: PokemonWithWeight = pokemon[currentIndex];
      expect(previousPokemon.name.localeCompare(currentPokemon.name)).toBeLessThanOrEqual(0);
    }
  }

  private static expectValidPokemonMember(pokemonMember: PokemonWithWeight): void {
    expect(pokemonMember.name.length).toBeGreaterThan(0);
    expect(pokemonMember.weight).toBeGreaterThan(0);
  }
}
