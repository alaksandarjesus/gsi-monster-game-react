import { createSlice } from '@reduxjs/toolkit';
import API from '../../app/api';
const initialState = {
    plays: []
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        save: (state, action) => {
            return Object.assign({}, state, action.payload);
        }
    },
});

export const { save } = gameSlice.actions;

export const store = data => dispatch => {
    API.post('plays', data).then(function (res) {
        if (res.data.success) {
            dispatch(save({ plays: res.data.plays }));
        }
    }).catch(() => {

    })
}

export const plays = store => store.game.plays;

export default gameSlice.reducer;
