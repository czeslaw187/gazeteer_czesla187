const firstState = {
    mapData: [],
    countryData: [],
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.mapData]
            let newState4 = [...state.countryData]
            return {
                ...state,
                mapData: newState.concat(action.payload),
            }
        case "ADD_INFO":
            return {
                ...state,
                countryData: action.payload
            }
    }
}