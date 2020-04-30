import Http from '@/services/Http'

export default class PokemonService {
  protected http: Http

  public constructor (http: Http) {
    this.http = http
  }

  public async post (url: string, payload: {}) {
    try {
      return await this.http.get(url, payload)
    } catch (error) {
      throw error
    }
  }
}
