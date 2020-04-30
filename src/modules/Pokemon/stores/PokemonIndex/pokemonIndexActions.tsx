import * as types from './pokemonIndexTypes'
import { API_EXAMPLE } from '../../constants/pokemonConstants'
import { PokemonDataModel } from '../../typings/pokemonIndexTypings'
import { pokemonService } from '../../services'

export async function pokemonRequest (dispatch: Function, payload: {}) {
  dispatch({ type: types.POKEMON_REQUEST })

  try {
    const { data } = await pokemonService.post(API_EXAMPLE, payload) 

    pokemonSuccess(dispatch, data)
  } catch (error) {
    pokemonError(dispatch, error)
  }
}

function pokemonSuccess (dispatch: Function, response: PokemonDataModel) {
  dispatch({ 
    type: types.POKEMON_SUCCESS,
    response
  })
}

function pokemonError (dispatch: Function, response: boolean) {
  dispatch({ 
    type: types.POKEMON_ERROR,
    response
  })
}
