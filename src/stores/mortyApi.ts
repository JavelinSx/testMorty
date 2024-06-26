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

    const characters = ref<Character[]>([])
    const status = [
        {
            value: 'None',
            label: 'Выберите статус'
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
    const lastPage = ref(41)

    const pageCounter = (value:number) => {
        lastPage.value = Math.floor(value/20)+1
        if(value<20){
            currentPage.value = 1
        }
    }
    const prevPageAction = async() => {
        try {
            if(currentPage.value>1){ 
                currentPage.value = currentPage.value - 1
                await fetchCharactersNextPrev()          
            }
        } catch (error) {
            console.log(error)
        }

    }
    const nextPageAction = async() => {
        try {
            if (currentPage.value < lastPage.value) {
                currentPage.value = currentPage.value + 1
                await fetchCharactersNextPrev()
            }
        } catch (error) {
            console.log(error)
        }

    }
    const goToPageView = async(value: number) => {
        try {
            currentPage.value = value
            await fetchCharactersNextPrev() 
        } catch (error) {
            console.log(error)
        }

    }
    const fetchCharacters = async() => {
        try {
            const response = await apolloClient.query({
                query: query,
                variables: {
                    page: 1,
                    status: selectFilter.value === 'None' ? '' : selectFilter.value,
                    name: nameFilter.value
                }
            });
    
            characters.value = response.data.characters.results || [];
            const countCharacter = response.data.characters.info.count
            pageCounter(countCharacter)
            currentPage.value = 1
        } catch (error) {
            console.log(error);
        } 
    }
    const fetchCharactersNextPrev = async() => {
        try {
            const response = await apolloClient.query({
                query: query,
                variables: {
                    page: currentPage.value,
                    status: selectFilter.value === 'None' ? '' : selectFilter.value,
                    name: nameFilter.value
                }
            });
            characters.value = response.data.characters.results || [];
            const countCharacter = response.data.characters.info.count
            pageCounter(countCharacter)
        } catch (error) {
            console.log(error);
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
        goToPageView,
        currentPage,
        lastPage,
    }
})