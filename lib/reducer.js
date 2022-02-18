const firstState = {
    state: ''
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = state.state
            return {
                ...state,
                state: newState.concat(action.payload)
            }
    }
}