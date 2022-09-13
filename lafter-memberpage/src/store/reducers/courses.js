import { FETCH_COURSES, STATUS_COURSES, WATCH_COURSES, MESSAGE_COURSES } from 'constants/types/courses'

const initialState = {
    data: {},
    total: 0,
    status: 'idle',
    message: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case STATUS_COURSES:
            return { ...state, status: action.payload }
        case FETCH_COURSES:
            return { ...state, data: action.payload.data, total: action.payload.total }
        case WATCH_COURSES:
            return { ...state, data: { ...state.data, [action.payload.id]: action.payload } }
        case MESSAGE_COURSES:
            return { ...state, message: action.payload }
        default:
            return state
    }
}