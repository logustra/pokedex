export interface PokemonIndexState {
  data: PokemonDataModel[],
  isFetching: boolean,
  isError: boolean
} 

export interface PokemonDataModel {
  id: number,
  title: string
} 

export interface PokemonIndexAction {
  type: string,
  response: any
} 
