import { gql } from 'apollo-boost'

export default gql`
  query getPokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      image
      classification
      resistant
      weaknesses
      types
      maxHP
      maxCP
      fleeRate
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      evolutions {
        id
        name
        image
        evolutionRequirements {
          name
          amount
        }
      }
    }
  }
`
