import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { NoteContext } from '../context/note-context';
import Chip from '@mui/material/Chip';
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button, TextField} from '@mui/material';
// import { getNotes } from '../../../shared/services/api-client';
import DeleteIcon from '@mui/icons-material/Delete';
// import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { getNotesFromApi } from '../redux/note-slice';
import { NavLink } from "react-router-dom"
import Add from './Add';


const View = () => {

  // const getDataFromAPI = async () => {
  //   const notes = await getNotes();
  //   console.log('All Notes are ',notes);
  // }

  // //Mounting Style
  // useEffect(()=>{
  //   // Mount Phase
  //   getDataFromAPI();

  // },[]);

  // //Updation Style
  // useEffect(()=>{
  //   // Update Phase Code

  // });

  // //UnMounting Style
  // useEffect(()=>{
  //   return function(){
  //     // Un Mount Code

  //   }
  // },[]);

  const dispatch = useDispatch();
  const noteState = useSelector(state => state.noteReducer);

  useEffect(()=>{
      dispatch(getNotesFromApi());

  },[]);
  

  var temp = {};
  var found = false;
  var foundNote = {};
  
  var [deleteAll, setDelete] = useState(false);
  const [arr, setArray] = useState([]);

  const {register, handleSubmit, formState:{errors}, reset} = useForm();

  var search = false;

  const searchParams = useSearchParams();
  // console.log('Search Params are ', searchParams);

  var [check, setCheck] = useState(false);

  var show = 0;
  var icon = '';
  var updateIcon = '';
  let val = '';
  // const color1 = {color:'black'};
  // const color2 = {color:'red'};
  // const [color, setColor] = useState(color1);

  const[data, setData] = useState(0);


  for(let [key, value] of searchParams[0].entries()){
    
    val = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
    if(val === 'Delete'){
      show = 1;
      icon = <DeleteIcon/>;

    }else if(val === 'Search'){
      show = 2;
      search = true;
      found = false;
      deleteAll = false;
      check = false;

    }else if(val === 'Update'){
      show = 3;
      // icon = <EditNoteIcon />
      updateIcon = <NavLink style={{textDecoration: 'none'}} to="/dashboard/add-note/Add" state={{ id: 'id sent from View to Add' }}><EditNoteIcon /></NavLink>
      found = false;
      deleteAll = false;
      check = false;
      search = false;

    }else{
      show = 0;
      found = false;
      deleteAll = false;
      check = false;
      search = false;
    }
  }

  // const [count, setCount] = useState(0);
  
  // const arr = [];
  const clicked = (index) => {
    
    if(show === 1){
      //delete
      
      // console.log('index is ',index);
      const d = document.getElementById(index);
      setDelete(true);
      if(d.style.backgroundColor === 'white'){
        // arr.push(index);
        setArray(oldArray => [...oldArray, index]);
        // setDelete(true);
        d.style.backgroundColor = 'red';
        
      }
      else{
        
        // arr.pop();
        setArray(oldArray => arr.filter(function (letter) {
          return letter !== index;
        }));
        d.style.backgroundColor = 'white';
        if(arr.length <= 1){
          setDelete(false);
        }
      }
      // console.log(arr);
    

    }else if(show === 2){
      //search
      

    }else if(show === 3){
      //update
      
      setData(index);
      console.log('update section');
      console.log(data); 
      return <Add id={data}/> //not sending id
      
    }
    
  }
  
  
  const getFormData = (formData) =>{
    const printDiv = document.querySelector("#printNote");
    if(check === true && printDiv.hasChildNodes){
      printDiv.innerHTML = '';
      setCheck(false);
    }

    temp.map((note)=>{

      if(note.title === formData.title){
        
        found = true;
        
        foundNote = note;
        // console.log("getFormData ",foundNote);

        const printDiv = document.querySelector("#printNote");
        const pTagTitle = document.createElement('p');
        pTagTitle.innerText = `Title: ${foundNote.title}`;
        printDiv.appendChild(pTagTitle);

        const pTagDesc = document.createElement('p');
        pTagDesc.innerText = `Description: ${foundNote.desc}`;
        printDiv.appendChild(pTagDesc);

        const pTagDate = document.createElement('p');
        pTagDate.innerText = `Date: ${foundNote.date}`;
        printDiv.appendChild(pTagDate);
        
        setCheck(true);

        const hrTag = document.createElement("HR");
        printDiv.appendChild(hrTag);

      }
    })

    if(found === false){
      const printDiv = document.querySelector("#printNote")
      if(check === true && printDiv.hasChildNodes){
        printDiv.innerHTML = '';
        setCheck(false);
      }
      const pTagTitle = document.createElement('p');
      pTagTitle.innerText = 'No Note Found';
      printDiv.appendChild(pTagTitle);
      setCheck(true);
    }
    // printDiv.innerHTML = '';
  }

  

  const v = `No. of Notes: ${noteState.notes.length}`;
  temp = noteState.notes;
  // console.log(temp[0]);
  const deleteRows = () =>{
    for(let i=0;i<arr.length;i++){
      console.log(temp[arr[i]]);
      // delete temp[arr[i]];
      // console.log(temp[arr[i]].id);
      const getRow = document.getElementById(arr[i]);
      getRow.innerHTML = '';
      let id = 1001+arr[i];
      console.log(id);
      if(temp[arr[i]].id === id){

      }
    }
    
    setDelete(false);
    setArray([]);
  }
  return(
    <div>
      <>
        {noteState.isLoading && <p>Loading Notes...</p>}
        <h1>{val} Node</h1>
        <Chip label={v} variant="outlined" />
        <br/><br/>
        {show !== 2 &&<TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {show!==0 && <TableCell>{val}</TableCell>}
                <TableCell>Note Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* {console.log(noteState.notes)} */}
              {temp.map((note, index)=>{
                // console.log(note);
                return (
                <TableRow key={index} id={index} style={{backgroundColor: 'white'}}>
                  {show !== 0 && <TableCell><Button onClick={() => {
                    clicked(index);
                  }}>{show === 3 ? updateIcon: icon}</Button></TableCell>}
                  <TableCell>{index+1}.</TableCell>
                  <TableCell>{note.title}</TableCell>
                  <TableCell>{note.desc}</TableCell>
                  <TableCell>{note.date}</TableCell>
                </TableRow>
              )})}
            </TableBody>

          </Table>
        </TableContainer>}
        <br/>
        {deleteAll && <Button variant="contained" onClick={()=>{deleteRows()}}>Delete All</Button>}
        
        <form onSubmit={handleSubmit(getFormData)}>
          {search && <TextField id="outlined-basic" label="Search by Title" {...register('title',{required:true})}variant="outlined" />} &nbsp;&nbsp;
          {search && <Button id='displayBtn' type='submit' variant="contained">Search</Button>} &nbsp;&nbsp;
          {search && <Button onClick={()=>{
            const printDiv = document.querySelector("#printNote");
            printDiv.innerHTML = '';
        }} variant="contained">Reset</Button>}
          
        </form>
        {search && <div id='printNote'></div>}
        
      </>
    </div>
  )
  
  // return (
  //   <div>
  //     <NoteContext.Consumer>
  //       {(value)=>{
  //         const v = `No. of Notes: ${value.notes.length}`;
  //         temp = value.notes;
  //         return (<>
  //           <h1>{val} Node</h1>
  //           <Chip label={v} variant="outlined" />
  //           <br/><br/>
  //           {show !== 2 &&<TableContainer component={Paper}>
  //             <Table sx={{ minWidth: 650 }} aria-label="simple table">
  //               <TableHead>
  //                 <TableRow>
  //                   {show!==0 && <TableCell>{val}</TableCell>}
  //                   <TableCell>Note Id</TableCell>
  //                   <TableCell>Title</TableCell>
  //                   <TableCell>Description</TableCell>
  //                   <TableCell>Date</TableCell>
  //                 </TableRow>
  //               </TableHead>

  //               <TableBody>
  //                 {value.notes.map((note, index)=>{
  //                   // console.log(note);
  //                   return (
  //                   <TableRow key={index} id={index} style={{backgroundColor: 'white'}}>
  //                     {show !== 0 && <TableCell><Button onClick={() => {
  //                       clicked(index);
  //                     }}>{icon}</Button></TableCell>}
  //                     <TableCell>{index+1}.</TableCell>
  //                     <TableCell>{note.title}</TableCell>
  //                     <TableCell>{note.desc}</TableCell>
  //                     <TableCell>{note.date}</TableCell>
  //                   </TableRow>
  //                 )})}
  //               </TableBody>

  //             </Table>
  //           </TableContainer>}
  //           <br/>
  //           <form onSubmit={handleSubmit(getFormData)}>
  //             {search && <TextField id="outlined-basic" label="Search by Title" {...register('title',{required:true})}variant="outlined" />} &nbsp;&nbsp;
  //             {search && <Button id='displayBtn' type='submit' variant="contained">Search</Button>} &nbsp;&nbsp;
  //             {search && <Button onClick={()=>{
  //               const printDiv = document.querySelector("#printNote");
  //               printDiv.innerHTML = '';
  //           }} variant="contained">Reset</Button>}
              
  //           </form>
  //           {search && <div id='printNote'></div>}
  //           {/* <div id='printNote'></div> */}
            
  //           </>
  //         );
  //       }}
  //     </NoteContext.Consumer> 
  //   </div>
  // )
}



export default View