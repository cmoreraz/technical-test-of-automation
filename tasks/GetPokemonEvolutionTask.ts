import { PokemonApiGateway } from '../api/PokemonApiGateway';
import { EvolutionChain, EvolutionChainLink, Pokemon, PokemonSpecies, PokemonWithWeight } from '../models/Pokemon';
import { PokemonSorter } from '../sorting/PokemonSorter';

export class GetPokemonEvolutionTask {
  constructor(
    private readonly pokemonApiGateway: PokemonApiGateway,
    private readonly pokemonSorter: PokemonSorter,
  ) {}

  async execute(pokemonName: string): Promise<PokemonWithWeight[]> {
    const evolutionChain: EvolutionChain = await this.getEvolutionChain(pokemonName);
    const evolutionNames: string[] = this.extractEvolutionNames(evolutionChain.chain);
    const evolutionMembers: PokemonWithWeight[] = await this.getEvolutionMembers(evolutionNames);

    return this.pokemonSorter.sortByName(evolutionMembers);
  }

  private async getEvolutionChain(pokemonName: string): Promise<EvolutionChain> {
    const pokemon: Pokemon = await this.pokemonApiGateway.getPokemonByName(pokemonName);
    const species: PokemonSpecies = await this.pokemonApiGateway.getSpeciesByUrl(pokemon.species.url);

    return this.pokemonApiGateway.getEvolutionChainByUrl(species.evolution_chain.url);
  }

  private extractEvolutionNames(chain: EvolutionChainLink): string[] {
    const names: string[] = [chain.species.name];
    const evolutions: EvolutionChainLink[] = chain.evolves_to;

    for (const evolution of evolutions) {
      names.push(...this.extractEvolutionNames(evolution));
    }

    return names;
  }

  private async getEvolutionMembers(names: string[]): Promise<PokemonWithWeight[]> {
    const evolutionMembers: PokemonWithWeight[] = await Promise.all(
      names.map((name: string): Promise<PokemonWithWeight> => this.getEvolutionMember(name)),
    );

    return evolutionMembers;
  }

  private async getEvolutionMember(name: string): Promise<PokemonWithWeight> {
    const pokemon: Pokemon = await this.pokemonApiGateway.getPokemonByName(name);

    return {
      name: pokemon.name,
      weight: pokemon.weight,
    };
  }
}
