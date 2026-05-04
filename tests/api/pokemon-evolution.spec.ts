import { APIRequestContext, TestInfo, test } from '@playwright/test';
import { PokeApiClient } from '../../api/PokeApiClient';
import { PokemonAssertions } from '../../assertions/PokemonAssertions';
import { PokemonWithWeight } from '../../models/Pokemon';
import { AlphabeticalPokemonSorter } from '../../utils/AlphabeticalPokemonSorter';
import { PokemonSorter } from '../../utils/PokemonSorter';
import { GetPokemonEvolutionTask } from '../../tasks/GetPokemonEvolutionTask';

test.describe('Pokémon evolutions', () => {
  test('Show Squirtle evolutions with weight in alphabetical order', async ({ request }: { request: APIRequestContext }, testInfo: TestInfo) => {
    const pokeApiClient: PokeApiClient = new PokeApiClient(request);
    const pokemonSorter: PokemonSorter = new AlphabeticalPokemonSorter();
    const getPokemonEvolution: GetPokemonEvolutionTask = new GetPokemonEvolutionTask(pokeApiClient, pokemonSorter);
    let pokemonEvolution: PokemonWithWeight[] = [];

    pokemonEvolution = await getSquirtleEvolution(getPokemonEvolution);
    await listEvolutionWithWeight(pokemonEvolution, testInfo);
    await validatePokemonEvolution(pokemonEvolution);
  });
});

async function getSquirtleEvolution(task: GetPokemonEvolutionTask): Promise<PokemonWithWeight[]> {
  return test.step('Get the evolution chain for the Squirtle species', async () => task.execute('squirtle'));
}

async function listEvolutionWithWeight(pokemonEvolution: PokemonWithWeight[], testInfo: TestInfo): Promise<void> {
  await test.step('List each evolved Pokémon with name and weight in alphabetical order', async () => {
    console.table(pokemonEvolution);
    await attachOrderedEvolutionEvidence(pokemonEvolution, testInfo);
  });
}

async function attachOrderedEvolutionEvidence(pokemonEvolution: PokemonWithWeight[], testInfo: TestInfo): Promise<void> {
  const evidenceBody: string = JSON.stringify(pokemonEvolution, null, 2);

  await testInfo.attach('ordered-squirtle-evolution.json', {
    body: evidenceBody,
    contentType: 'application/json',
  });
}

async function validatePokemonEvolution(pokemonEvolution: PokemonWithWeight[]): Promise<void> {
  await test.step('Validate evolved Pokémon names and weights', async () => {
    PokemonAssertions.expectPokemonMembersWithValidWeights(pokemonEvolution);
    PokemonAssertions.expectPokemonNamesInAlphabeticalOrder(pokemonEvolution);
  });
}
