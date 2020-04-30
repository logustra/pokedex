export interface PokemonTypeAttacksModel {
  name: string,
  type: string,
  damage: number
}

export interface PokemonEvolutionsModel {
  id: string,
  name: string,
  image: string,
  evolutionRequirements: {
    name: string,
    amount: number
  }
}
