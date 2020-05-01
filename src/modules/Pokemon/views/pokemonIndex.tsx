import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { PokemonsModel } from '../typings/pokemonsTypings'
import { pokemonsGraphql } from '../graphql'

import { 
  Row, 
  Col,  
  Divider,
  Tag,
  Button
} from 'antd'

import { FilterOutlined } from '@ant-design/icons'

import {
  PLoading,
  PError
} from 'atoms'
import { PCard } from 'molecules'
import { PPageHeader } from 'organisms'
import { 
  PContainer,
  POverlay
} from 'templates'

import { colors } from '@/styles'

export default function PokemonIndex () {
  const [loadMore, setLoadMore] = React.useState(false)
  const [variables, setVariables] = React.useState({ first: 20 })
  const { loading, error, data, fetchMore } = useQuery(pokemonsGraphql, { variables })
  const pokemons = data && data.pokemons

  function handleScroll () {
    const innerHeight: number = window.innerHeight
    const scrollTop: number = document.documentElement.scrollTop
    const element: HTMLElement | null = document.getElementById('app')
    const elementHeight = element && element.offsetHeight

    if (innerHeight + scrollTop !== elementHeight) return

    fetchMore({
      variables: { first: variables.first + 10 },
      updateQuery: (prev, { fetchMoreResult, variables }) => {
        if (variables) {
          setLoadMore(true)
          setVariables(variables)
        }

        if (!fetchMoreResult) return prev

        return Object.assign({}, prev, {
          pokemons: [...fetchMoreResult.pokemons]
        })
      }
    })
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [variables]) // eslint-disable-line

  const [pokemonTypes, setPokemonTypes] = React.useState<{}[]>([])

  React.useEffect(() => {
    if (pokemons) {
      const types: string[] = []

      pokemons.forEach((item: any) => {
        item.types.forEach((type: string) => {
          types.push(type)
        })
      })

      const uniqueTypes = Array.from(new Set(types)).map(item => ({
        name: item,
        isActive: false
      }))

      setPokemonTypes(uniqueTypes)
    }
  }, [pokemons])

  if (loading && !loadMore) return <PLoading mode="full" />
  if (error) return <PError />

  return (
    <div>
      <PPageHeader title="Pokémons" />

      <Row 
        gutter={[16, 16]}
        className="mt-12"
      >
        {pokemons.map((item: PokemonsModel) => (
          <Col 
            key={item.id}
            span={12}
          >
            <Link 
              to={`/detail/${item.id}/${item.name}`}
              className="no-underline"
            >
              <PCard
                bodyStyle={{ width: '100%' }}
                cover={
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-auto p-4 h-40"
                  />
                }
              >
                <h2 className="title">
                  {item.name}
                </h2>

                <p className="text-gray-500">
                  {item.classification}
                </p>

                <Divider className="my-4" />

                {item.types.map(type => (
                  <Tag
                    key={`type-${type}`}
                    color={colors.green[500]}
                  >
                    {type}
                  </Tag>
                ))}
              </PCard>
            </Link>
          </Col>
        ))}

        {loadMore && <PLoading />}
      </Row>

      <POverlay
        position="bottom"
        className="z-10"
      >
        <PContainer className="flex justify-center">
          <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            className="flex items-center"
          >
            Filter
          </Button>
        </PContainer>
      </POverlay>

      {/* <PokemonTypes types={pokemonTypes} /> */}
    </div>
  )
}

function PokemonTypes ({ types }) {
  return (
    <POverlay 
      position="top"
      mode="full"
      className="bg-white z-20"
    >
      <PContainer className="mt-12">
        <PPageHeader 
          title="Filter" 
          onBack={() => console.log('pressed')}
        />

        {types.map(item => (
          <div key={`${item.name}-type`}>
            {item.name}
          </div>
        ))}
      </PContainer>
    </POverlay>
  )
}
