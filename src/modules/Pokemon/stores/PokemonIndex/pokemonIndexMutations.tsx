
import logger from 'use-reducer-logger'

import * as types from './pokemonIndexTypes'
import { 
  PokemonIndexState,
  PokemonIndexAction 
} from '../../typings/pokemonIndexTypings'

function pokemonIndexMutations (state: PokemonIndexState, action: PokemonIndexAction) {
  const { type, response } = action

  switch(type) {
    case types.POKEMON_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case types.POKEMON_SUCCESS:
      return {
        ...state,
        data: response,
        isFetching: false
      }

    case types.POKEMON_ERROR:
      return {
        data: [],
        isFetching: false,
        isError: response
      }
  }
}

export default process.env.NODE_ENV === 'development' ? logger<any>(pokemonIndexMutations) : pokemonIndexMutations
