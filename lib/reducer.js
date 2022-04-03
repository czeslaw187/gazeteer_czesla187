const firstState = {
    mapData: [],
    polygon: [],
    countries: [],
    countryData: [],
    wikipedia: []
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.mapData]
            let newState2 = [...state.polygon]
            let newState3 = [...state.countries]
            let newState4 = [...state.countryData]
            let newState5 = [...state.wikipedia]
            return {
                ...state,
                mapData: newState.concat(action.payload),
                polygon: newState2,
                countries: newState3,
                countryData: newState4
            }
        case "ADD_POLYGON":
            newState = [...state.mapData]
            newState3 = [...state.countries]
            newState4 = state.countryData
            return {
                ...state,
                mapData: newState,
                polygon: action.payload,
                countries: newState3,
                countryData: newState4
            }
        case "ADD_COUNTRIES":
            newState = [...state.mapData]
            newState2 = [...state.polygon]
            newState3 = [...state.countries]
            newState4 = [...state.countryData]
            return {
                ...state,
                mapData: newState,
                polygon: newState2,
                countries: newState3.concat(action.payload),
                countryData: newState4
            }
        case "ADD_INFO":
            newState = [...state.mapData]
            newState2 = state.polygon
            newState3 = [...state.countries]
            return {
                ...state,
                mapData: newState,
                polygon: newState2,
                countries: newState3,
                countryData: action.payload
            }
        case "ADD_WIKI":
            newState5 = state.wikipedia
            return {
                ...state,
                wikipedia: action.payload
            }
    }
}