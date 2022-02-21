const firstState = {
    coords: []
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = state.coords
            return {
                ...state,
                coords: newState.concat(action.payload)
            }
    }
}