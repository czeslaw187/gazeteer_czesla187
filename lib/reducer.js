const firstState = {
    mapData: [],
    countries: [],
    countryData: [],
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.mapData]
            let newState3 = [...state.countries]
            let newState4 = [...state.countryData]
            return {
                ...state,
                mapData: newState.concat(action.payload),
            }
        case "ADD_COUNTRIES":
            newState3 = [...state.countries]
            return {
                ...state,
                countries: newState3.concat(action.payload),
            }
        case "ADD_INFO":
            return {
                ...state,
                countryData: action.payload
            }
    }
}