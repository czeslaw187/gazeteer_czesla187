const firstState = {
    mapData: [],
    polygon: [],
    countries: []
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.mapData]
            let newState2 = [...state.polygon]
            let newState3 = [...state.countries]
            return {
                ...state,
                mapData: newState.concat(action.payload),
                polygon: newState2,
                countries: newState3
            }
        case "ADD_POLYGON":
            newState = [...state.mapData]
            newState2 = [...state.polygon]
            newState3 = [...state.countries]
            return {
                ...state,
                mapData: newState,
                polygon: newState2.concat(action.payload),
                countries: newState3
            }
        case "ADD_COUNTRIES":
            newState = [...state.mapData]
            newState2 = [...state.polygon]
            newState3 = [...state.countries]
            return {
                ...state,
                mapData: newState,
                polygon: newState2,
                countries: newState3.concat(action.payload)
            }
    }
}