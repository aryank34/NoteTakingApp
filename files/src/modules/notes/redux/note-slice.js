import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotes, postNote } from "../../../shared/services/api-client";

export const noteAdd = createAsyncThunk('/note/add',async (noteData)=>{
    try{
        const data = await postNote(noteData);
        return data;
    }catch(err){
        throw err;
    }
});

export const getNotesFromApi = createAsyncThunk('note/get-notes',async ()=>{
    try{
        const notes = await getNotes();
        return notes;
    }catch(err){
        throw err;
    }
    
})

const noteSlice = createSlice({
    name: 'noteSlice',
    initialState: {
        notes:[], total:0, markedNote:0, isLoading:false, error: null, message:''
    },
    reducers:{
        addNote(state, action){
            state.notes.push(action.payload);
            state.message = 'Note Added';
        },
        removeNote(state, action){

        },
        updateNote(state, action){

        },
        searchNote(state, action){

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getNotesFromApi.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(getNotesFromApi.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.notes = [...state.notes, ...action.payload];
            // console.log(state.notes);
        }).addCase(getNotesFromApi.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        builder.addCase(noteAdd.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(noteAdd.fulfilled, (state, action)=>{
            state.isLoading = false;
            // console.log(action.payload);
            state.notes.push(action.payload);//so that the already inserted data is not LOST
            // state.notes = [...state.notes,...action.payload]; 
        }).addCase(noteAdd.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }   
});

export default noteSlice.reducer;
export const {addNote, removeNote, updateNote, searchNote} = noteSlice.actions;