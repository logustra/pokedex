export interface PokemonsModel {
  classification: string,
  id: string,
  image: string,
  name: string,
  types: string[]
}

export interface PokemonTypes {
  type: string,
  isActive: boolean
}
