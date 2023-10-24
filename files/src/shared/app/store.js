import {configureStore} from '@reduxjs/toolkit';
import noteReducer from '../../modules/notes/redux/note-slice';

export const store = configureStore({
    reducer:{
        noteReducer
    }
})