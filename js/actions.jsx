const url = 'https://jsonplaceholder.typicode.com/users';

export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
export const GET_DATA_DONE = 'GET_DATA_DONE';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export function getDataRequested() {
    return {
        type: 'GET_DATA_REQUESTED'
    };
}

export function getDataDone(data) {
    return {
        type: 'GET_DATA_DONE',
        payload: data
    };
}

export function getDataFailed(error) {
    return {
        type: 'GET_DATA_FAILED',
        payload: error
    };
}


export function getData() {
    return dispatch => {
        dispatch(getDataRequested());
        fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(getDataDone(data));
            })
            .catch(error => {
                dispatch(getDataFailed(error));
            })
    }
}