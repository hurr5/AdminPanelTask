const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HERO_CREATED':
            const newHeroesList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroesList,
                filteredHeroes: state.activeFilter === 'all' ?
                    newHeroesList :
                    newHeroesList.filter(el => el.element === state.activeFilter)
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                    action.payload :
                    action.payload.filter(el => el.element === action.payload)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(el => el.element === action.payload)
            }
        case 'HERO_DELETED':
            const newHeroList = state.heroes.filter(el => el.id !== action.payload)
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: state.activeFilter === 'all' ?
                    newHeroList :
                    newHeroList.filter(el => el.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;