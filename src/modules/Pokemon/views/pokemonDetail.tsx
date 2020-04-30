import React from 'react'
import { Link } from 'react-router-dom'
import { 
  useParams,
  useHistory
} from 'react-router'
import { useQuery } from '@apollo/react-hooks'

import { 
  PokemonTypeAttacksModel,
  PokemonEvolutionsModel
} from '../typings/pokemonTypings'
import { pokemonGraphql } from '../graphql'

import { 
  Row,
  Col,
  Card,
  Divider,
  Tag
} from 'antd'

import {
  PLoading,
  PError
} from 'atoms'
import { PPageHeader } from 'organisms'

import { colors } from '@/styles'

export default function PokemonDetail () {
  const { id, name } = useParams()
  const history = useHistory()

  const { loading, error, data } = useQuery(pokemonGraphql, {
    variables: { id, name }
  })
  const pokemon = data && data.pokemon

  if (loading) return <PLoading mode="full" />
  if (error) return <PError />

  return (
    <div className="p-pokemon-index">
      <PPageHeader
        title="Detail"
        onBack={() => history.goBack()}
      />

      <Card
        bordered={false}
        size="small"
        bodyStyle={{ width: '100%' }}
        className="flex flex-col justify-center items-center rounded mt-12"
        cover={
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-auto p-4 h-40"
          />
        }
      >
        <div className="text-center">
          <h2 className="text-base font-bold tracking-wide mb-0">
            {pokemon.name}
          </h2>

          <p className="text-gray-500 mb-0">
            {pokemon.classification}
          </p>

          <Divider className="my-2" />

          <h2 className="text-base font-bold tracking-wide mb-0">
            Types
          </h2>

          {pokemon.types.map((item: string) => (
            <Tag
              key={`type-${item}`}
              color={colors.green[500]}
              className="my-2"
            >
              {item}
            </Tag>
          ))}

          <Divider className="my-2" />

          <h2 className="text-base font-bold tracking-wide mb-0">
            Resistant
          </h2>

          {pokemon.resistant.map((item: string) => (
            <Tag
              key={`type-${item}`}
              color={colors.blue[500]}
              className="my-2"
            >
              {item}
            </Tag>
          ))}

          <Divider className="my-2" />

          <h2 className="text-base font-bold tracking-wide mb-0">
            Weaknesses
          </h2>

          {pokemon.weaknesses.map((item: string) => (
            <Tag
              key={`type-${item}`}
              color={colors.red[500]}
              className="my-2"
            >
              {item}
            </Tag>
          ))}

          <Divider className="my-2" />

          <h2 className="text-base font-bold tracking-wide mb-0">
            Max. HP
          </h2>

          <p className="text-lg">
            {pokemon.maxHP}
          </p>

          <Divider className="my-2" />

          <h2 className="text-base font-bold tracking-wide mb-0">
            Max. CP
          </h2>

          <p className="text-lg">
            {pokemon.maxCP}
          </p>

          <Divider className="my-2" />

          <h2 className="text-base font-bold tracking-wide mb-0">
            Flee Rate
          </h2>

          <p className="text-lg">
            {pokemon.fleeRate}
          </p>
        </div>
      </Card>

      {Object.keys(pokemon.attacks).splice(0, 2).map(type => (
        <React.Fragment key={`${type}-attack`}>
          <h2 className="text-xl font-bold tracking-wide mt-8 mb-0 text-center capitalize">
            {type} Attacks
          </h2>

          <Row
            gutter={[16, 16]}
            justify="center"
            className="mt-4"
          >
            {pokemon.attacks[type].map((item: PokemonTypeAttacksModel) => (
              <Col
                key={item.id}
                span={12}
              >
                <Card
                  bordered={false}
                  size="small"
                  className="flex flex-col justify-center items-center rounded"
                >
                  <div className="text-center">
                    <h2 className="text-base font-bold tracking-wide mb-0">
                      {item.name}
                    </h2>

                    <p className="text-gray-500">
                      {item.type}
                    </p>

                    <p className="text-lg mb-0">
                      {item.damage}
                    </p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </React.Fragment>
      ))}

      <h2 className="text-xl font-bold tracking-wide mt-8 mb-0 text-center">
        Weight
      </h2>

      <Row
        gutter={[16, 16]}
        justify="center"
        className="mt-4"
      >
        {Object.keys(pokemon.weight).splice(0, 2).map(type => (
          <Col
            key={`${type}-weight`}
            span={12}
          >
            <Card
              bordered={false}
              size="small"
              className="flex flex-col justify-center items-center rounded"
            >
              <div className="text-center">
                <h2 className="text-base font-bold tracking-wide capitalize">
                  {type}
                </h2>

                <p className="text-lg mb-0">
                  {pokemon.weight[type]}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="text-xl font-bold tracking-wide mt-8 mb-0 text-center">
        Height
      </h2>

      <Row
        gutter={[16, 16]}
        justify="center"
        className="mt-4"
      >
        {Object.keys(pokemon.height).splice(0, 2).map(type => (
          <Col
            key={`${type}-height`}
            span={12}
          >
            <Card
              bordered={false}
              size="small"
              className="flex flex-col justify-center items-center rounded"
            >
              <div className="text-center">
                <h2 className="text-base font-bold tracking-wide capitalize">
                  {type}
                </h2>

                <p className="text-lg mb-0">
                  {pokemon.height[type]}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {pokemon.evolutions && (
        <React.Fragment>
          <h2 className="text-xl font-bold tracking-wide mt-8 mb-0 text-center">
            Evolutions
          </h2>

          <Row
            gutter={[16, 16]}
            justify="center"
            className="mt-4"
          >
            {pokemon.evolutions.map((item: PokemonEvolutionsModel) => (
              <Col
                key={item.id}
                span={12}
              >
                <Link 
                  to={`/detail/${item.id}/${item.name}`}
                  className="no-underline"
                >
                  <Card
                    bordered={false}
                    size="small"
                    className="flex flex-col justify-center items-center rounded"
                    cover={
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-auto p-4 h-40"
                      />
                    }
                  >
                    <div className="text-center">
                      <h2 className="text-base font-bold tracking-wide">
                        {item.name}
                      </h2>

                      {item.evolutionRequirements && (
                        <p className="mb-0 leading-tight">
                          You need {item.evolutionRequirements.amount} {item.evolutionRequirements.name} to be {item.name}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </React.Fragment>
      )}
    </div>
  )
}

