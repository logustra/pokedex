import { httpService } from '@/services'
import PokemonService from './pokemonService'

export const pokemonService = new PokemonService(httpService)
