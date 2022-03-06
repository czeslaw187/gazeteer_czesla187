const firstState = {
    mapData: [],
    polygon: []
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.mapData]
            let newState2 = [...state.polygon]
            return {
                ...state,
                mapData: newState.concat(action.payload),
                polygon: newState2
            }
        case "ADD_POLYGON":
            newState = [...state.mapData]
            newState2 = [...state.polygon]
            return {
                ...state,
                mapData: newState,
                polygon: newState2.concat(action.payload)
            }
    }
}