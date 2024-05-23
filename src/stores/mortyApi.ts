import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client/core'
import type { Character } from '../types/character'
const query =   gql`
                    query {
                        characters(page: 2, filter: { name: "rick" }) {
                            info {
                              count
                            }
                            results {
                              name
                              id
                            }
                          }
                    }
                `
export const useMortyApi = defineStore('mortyapi',() => {
    const httpLink = createHttpLink({
        uri: 'https://rickandmortyapi.com/graphql'
    })
    const cache = new InMemoryCache()
    const apolloClient = new ApolloClient({
        link: httpLink,
        cache
    })

    const characters = ref<Character[]>()
    
    const fetchCharacters = async() => {
        try {
            const response = await apolloClient.query({query});
            characters.value = response.data.characters.results
        } catch (error) {
            console.log(error)
        }
    }
    return {fetchCharacters, characters}
})