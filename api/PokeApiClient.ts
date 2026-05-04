import { APIRequestContext, APIResponse } from '@playwright/test';
import { HttpStatusValidator } from './HttpStatusValidator';
import { PokemonApiGateway } from './PokemonApiGateway';
import { EvolutionChain, Pokemon, PokemonSpecies } from '../models/Pokemon';

export class PokeApiClient implements PokemonApiGateway {
  constructor(private readonly request: APIRequestContext) {}

  async getPokemonByName(name: string): Promise<Pokemon> {
    const response: APIResponse = await this.request.get(`pokemon/${name.toLowerCase()}`);
    const pokemon: Pokemon = await response.json();

    HttpStatusValidator.ensureOk(response, `pokemon/${name}`);

    return pokemon;
  }

  async getSpeciesByUrl(url: string): Promise<PokemonSpecies> {
    const response: APIResponse = await this.request.get(url);
    const species: PokemonSpecies = await response.json();

    HttpStatusValidator.ensureOk(response, url);

    return species;
  }

  async getEvolutionChainByUrl(url: string): Promise<EvolutionChain> {
    const response: APIResponse = await this.request.get(url);
    const evolutionChain: EvolutionChain = await response.json();

    HttpStatusValidator.ensureOk(response, url);

    return evolutionChain;
  }

}
