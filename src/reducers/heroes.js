const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading'
      }
    case 'HERO_CREATED':
      return {
        ...state,
        heroes: [...state.heroes, action.payload]
      }
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroesLoadingStatus: 'idle',
        heroes: action.payload
      }
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error'
      }
    case 'HERO_DELETED':
      return {
        ...state,
        heroes: state.heroes.filter(el => el.id !== action.payload)
      }
    default: return state
  }
}

export default heroes;