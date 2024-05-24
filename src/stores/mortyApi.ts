import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client/core'
import type { Character } from '../types/character'

export const useMortyApi = defineStore('mortyapi',() => {
    const query =   gql`
                    query Characters($status: String, $name: String, $page: Int){
                        characters(page: $page, filter: { status: $status, name: $name }) {
                            info{
                                count
                            }
                            results {
                                id
                                name
                                status
                                image
                            }
                          }
                    }
                `
    const httpLink = createHttpLink({
        uri: 'https://rickandmortyapi.com/graphql'
    })
    const cache = new InMemoryCache()
    const apolloClient = new ApolloClient({
        link: httpLink,
        cache
    })

    const characters = ref<Character[]>()
    const status = [
        {
            value: 'None',
            label: 'None'
        },
        {
            value: 'Alive',
            label: 'Alive'
        },
        {
            value: 'Dead',
            label: 'Dead'
        },
        {
            value: 'unknown',
            label: 'unknown'
        },

    ]
    const selectFilter = ref('')
    const nameFilter = ref('')
    const currentPage = ref(1)
    const lastPage = ref(42)

    const prevPageAction = () => {
        if(currentPage.value>1){ 
            currentPage.value = currentPage.value - 1;
        }
    }
    const nextPageAction = () => {
        if(currentPage.value<lastPage.value){
            currentPage.value = currentPage.value + 1;
        }

    }
    const goToPage = (value: number) => {
        if(value<lastPage.value && value>0){
            currentPage.value = value
        }
    }
    const fetchCharacters = async() => {
        try {
            const response = await apolloClient.query({
                query: query,
                variables: {
                    page: currentPage.value,
                    status: selectFilter.value==='None' ? '' : selectFilter.value,
                    name: nameFilter.value
                }
            });
            characters.value = response.data.characters.results
        } catch (error) {
            console.log(error)
        } 
    }

    const selectedFilter = (value: string) => {
        selectFilter.value = value
    }
    const namedFilter = (value: string) => {
        nameFilter.value = value
    }

    return {
        fetchCharacters, 
        characters, 
        status, 
        selectedFilter, 
        namedFilter, 
        nameFilter, 
        prevPageAction, 
        nextPageAction,
        goToPage,
        currentPage,
        lastPage,
    }
})