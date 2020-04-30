import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { PokemonsModel } from '../typings/pokemonsTypings'
import { pokemonsGraphql } from '../graphql'

import { 
  Row, 
  Col,  
  Card,
  Tag,
  Button
} from 'antd'

import { FilterOutlined } from '@ant-design/icons'

import {
  PLoading,
  PError
} from 'atoms'
import { PPageHeader } from 'organisms'

import { colors } from '@/styles'

export default function PokemonIndex () {
  const [loadMore, setLoadMore] = React.useState(false)
  const [variables, setVariables] = React.useState({ first: 20 })
  const { loading, error, data, fetchMore } = useQuery(pokemonsGraphql, { variables })
  const pokemons = data && data.pokemons

  const  handleScroll = React.useCallback(() => {
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
  }, [fetchMore, variables])

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if (loading && !loadMore) return <PLoading mode="full" />
  if (error) return <PError />

  return (
    <div className="p-pokemon-index">
      <PPageHeader title="Pokémons" />

      <Row 
        justify="center" 
        className="fixed w-full left-0 bottom-0 z-10 p-4"
      >
        <Button
          type="primary"
          shape="round"
          icon={<FilterOutlined />}
          className="flex items-center"
        >
          Filter
        </Button>
      </Row>

      <Row 
        gutter={[16, 16]}
        className="mt-12"
      >
        {pokemons.map((item: PokemonsModel) => (
          <Col 
            key={item.id}
            span={12}
          >
            <Link to={`/detail/${item.id}/${item.name}`}>
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
                  <h2 className="text-base font-bold tracking-wide mb-0">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 mb-0">
                    {item.classification}
                  </p>

                  {item.types.map(type => (
                    <Tag
                      key={`type-${type}`}
                      color={colors.green[500]}
                      className="mt-2"
                    >
                      {type}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Link>
          </Col>
        ))}

        {loadMore && <PLoading />}
      </Row>
    </div>
  )
}

