// shortcut to create an arrow function - rafc - (only if you have ES7+react/.. library in VSCode)
//rafc - react arrow function component

import { Container } from '@mui/material';
import React,{useState, useEffect} from 'react';
import { Header } from '../../../shared/components/Header';
import {Grid} from '@mui/material';
import { SideBar } from '../components/SideBar';
import { Main } from '../components/Main';
import { useLocation } from 'react-router-dom';
import { NoteContext } from '../context/note-context';
import { getNotes } from '../../../shared/services/api-client';

export const NoteDashboard = () => {
  const [notes, setNotes] = useState([]);

  const getDataFromAPI = async () => {
    const notes = await getNotes();
    setNotes(notes);
    // console.log('All Notes are ',notes);
  }

  //Mounting Style
  useEffect(()=>{
    // Mount Phase
    getDataFromAPI();

  },[]);


  const location = useLocation();
  // console.log('Location is ',location);

  if(location && location.state){
    localStorage.setItem('username',location.state.username);
  }

  const addNote = (nodeObject) => {
    // console.log('Received Note from Add ',nodeObject);
    const cloneNotes = [...notes];
    cloneNotes.push(nodeObject);
    setNotes(cloneNotes);
  } 
  

  return (
    <Container>
      <Header username = {localStorage.getItem('username')}/>
      <Grid container spacing={2}> 
        <Grid item xs={3}>
          {/* Menu */}
          <SideBar/>
        </Grid>
        <Grid item xs={9}>
          {/* Content */}
          <NoteContext.Provider value={{notes:notes, addSingleNote: addNote}}>
            <Main/>
          </NoteContext.Provider>

          {/* <Main/> */}
          
        </Grid>
      </Grid>
    </Container>
  )
}
