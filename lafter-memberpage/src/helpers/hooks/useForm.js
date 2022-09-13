const { useState } = require("react");

export default (initialValue) => {
    const [state, setState] = useState(initialValue);

    return [
        state,
        (e) => {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            });
        },
        (newState) => {
            setState({
                ...state,
                ...newState,
            });
        }
    ];
}