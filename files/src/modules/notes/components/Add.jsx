// import React, { useContext, useRef, useState } from 'react'
import {useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Button, TextField, Alert} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NoteContext } from '../context/note-context';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
// import { useApi } from '../../../shared/hooks/api-hooks';
import {useDispatch, useSelector} from 'react-redux';
import { addNote, noteAdd } from '../redux/note-slice';
// import { useLocation } from 'react-router-dom'

// Add & Update Screens will be same
const Add = ({id}) => {

  

  console.log(id); //not working
  

  const noteState = useSelector((state)=>state.noteReducer);

  const [dateValue, setDateValue] = useState(dayjs());

  const {register, handleSubmit, formState:{errors}, reset} = useForm();

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  
   
  // const apiCall = useApi('POST');

  const params = useParams();
  // console.log('Params are '.params);

  // const nameRef = useRef(); //we can get a DOM element from this hook(useRef())
  // const descRef = useRef();
  // const dateRef = useRef();

  // const noteContext = useContext(NoteContext);

  // const takeInput = () => {
  //   const noteObject = {
  //     title: nameRef.current.value,
  //     desc: descRef.current.value,
  //     date: dateRef.current.value
  //   }
  //   noteContext.addSingleNote(noteObject);
  //   setMessage('Note Added....');
  //   //console.log('Input is ',noteObject);
  // }

  const errorStyle = {
    color:'red'
  }

  const getFormData = async (formData) =>{
      // console.log('Receive Data from Form: ', formData);
      
      dispatch(noteAdd(formData)); //for API call and get the data
      dispatch(addNote(formData)); //to store the note in an array
      setMessage('Note Added....');
      
      // noteContext.addSingleNote(formData);
      // const result = await apiCall(formData);
      // setMessage(result.message);


  }

  // const giveError = () => {
  //   throw new Error('Error....');
  // }

  return (
    <form onSubmit={handleSubmit(getFormData)}>
      <h1>{params.operationname} Note</h1>
        
      <TextField {...register('title',{required:true,min:3,max:10})} id="outlined-basic" label="Title" variant="outlined" />
      <br/>
      {errors && errors.title && errors.title.type === 'required' && <p style={errorStyle}>Title can't be empty</p>}
      <br/>
      <TextField
          {...register('desc',{
            // custom validation check
            validate:{
              checkLength:(value)=>value.length>7
            }
          })}
          sx={{ width:'80%'}}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
        />
        <br/>
        {errors && errors.desc && errors.desc.type === 'checkLength' && <p style={errorStyle}>Length must be greater than 7</p>}
        <br/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value = {dateValue} {...register('date')} onChange={(newValue) => setDateValue(newValue)} label="Note Date" />
        </LocalizationProvider>
        <br/><br/>

        {/* {giveError()} */}

        <Button type='submit' variant="contained">{params.operationname} Note</Button> &nbsp;&nbsp;
        <Button onClick={()=>{
          reset({title:'',desc:'',date:setDateValue(dayjs())})
          setMessage('')
        }} variant="contained">Reset Note</Button>
        <br/><br/>
        {message && <Alert sx={{ width:'30%'}} severity="success">{message}</Alert>}
        {/* {noteState.message && <Alert sx={{ width:'30%'}} severity="success">{noteState.message}</Alert>} */}
    </form>
  )
}

export default Add