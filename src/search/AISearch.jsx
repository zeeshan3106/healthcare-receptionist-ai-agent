import React, { useState } from 'react'
import './search.css'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import toast, { Toaster } from 'react-hot-toast';
import { GrFormNextLink } from "react-icons/gr";
import axios from 'axios'
const makeLinksClickable = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g

  return text.split(urlRegex).map((part, index) => {
    if (part.match(/^https?:\/\//)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline break-all"
        >
          {part}
        </a>
      )
    }

    return part
  })
}


function  AISearch() {


  const [apple,setapple] = useState('')
  const onchange=(e) =>{

    const {value} = e.target
    console.log(value)
    setapple(value)
     setSuccess(false);
     setLoading(false)
    




  }
const [response,setres]=useState('')

  const submit = () =>{
     setres('')
      setLoading(true);
  setSuccess(false);
    axios.post('https://jobs-search-keywords-eight.vercel.app/api/form/form-post',{
    product: apple
  }).then(res => res).catch(err => err)
    axios.post('https://jobs-a-b8q2.vercel.app/get',apple).then(res =>
      {

        setres({})
        
      setres(res.data)
         setLoading(false);
        setSuccess(true);
      


      }).catch(err =>{ 
            console.error('SERVER:', err.response?.data)
               setLoading(false)
               toast.error("Enter a company, skill, or keyword...")
    
      })
  }

console.log(apple)


const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
 
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };





  return (
    <>
    <div className='color flex  justify-center'>
      <div className='bg-white w-[80%] middle shadow '>
    <div className='apple flex items-center justify-center pt-15 pb-5 mobile'>
      <div className='flex '>
        MTHC Reception

      </div>
    
      
      
    </div>
      <div className='flex justify-center items-center mb-10 '>
        <div className='searchinmobile'>
        <input className = "border  p-5 searchbar " type='text'
        placeholder='Find your next job'

          onChange={onchange}
        
        />
      </div></div>
      <div className='ButtonSubmit'>
        <button className='' onClick={submit}>
        <Box sx={{ display: 'flex', alignItems: 'center' }} >
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={{
          ...buttonSx,
          width: 40,
          height: 40,
          minHeight: 40,
        }}
          
        >
          {success ? <CheckIcon /> : <GrFormNextLink className='text-[29px]'/>}
        </Fab>
        {loading && (
          <CircularProgress
            aria-label="Loading…"
            size={48}
            sx={{
            color: green[500],
            position: 'absolute',
            top: -4,
            left: -4,
            zIndex: 1,
          }}
          />
        )}
      </Box>
    
    </Box>

        </button>
           <Toaster />
      </div>
      <div className=' flex justify-center'>
       <div className="flex justify-center w-full">
  <div className="Response w-[85%] break-words overflow-wrap-anywhere pcwidth">
    {makeLinksClickable(response)}
  </div>
</div>


   
        </div></div></div></>
  )
}

export default AISearch