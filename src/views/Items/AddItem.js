import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Link from '@material-ui/core/Link';
import Radio from "@material-ui/core/Radio";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import baseAxios from 'config/auth/axios';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDLhMCmQczllfaiu2DJiyetrv6xAu1Ao04",
  authDomain: "csseproject-5ca2c.firebaseapp.com",
  databaseURL: "https://csseproject-5ca2c.firebaseio.com",
  projectId: "csseproject-5ca2c",
  storageBucket: "csseproject-5ca2c.appspot.com",
  messagingSenderId: "412130264739",
  appId: "1:412130264739:web:93ea86d47ddccbfd00a116"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storageRef = firebase.storage().ref();

const formInputs = [
  { label: 'Name', name: 'itemName', type: 'text' },
  { label: 'Available Quantity', name: 'availableQty', type: 'number' },
  { label: 'Maximum Quantity', name: 'maxQty', type: 'number' },
  { label: 'Weight per item', name: 'weightPerItem', type: 'number' },
  { label: 'Price', name: 'price', type: 'number' },
  // { label: 'Picture 1', name: 'photoURL11', type: 'file' },
  // { label: 'Picture 2', name: 'photoURL21', type: 'file' },
]
const formRadio = [
  { name: 'special', value: 'yes' },
  { name: 'special', value: 'no' },
]
const formInit = {
  // productId: '',
  itemName: '',
  supplierId: '',
  weightPerItem:'',
  special: '',
  price: '',
  maxQty: '',
  availableQty: '',
  photoURL11:'',
  photoURL21:''
}

export default function AddItem() {
  const classes = useStyles();
  const [form, setForm] = useState(formInit)
  const [selectedValue, setSelectedValue] = React.useState(null);

  const [suppliers,setSuppliers] = useState([])
  const [selectedSupp,setSelectedSupp] = useState(null)

  const[ photo1,setPhoto1] = useState(null)
  const[ photo2,setPhoto2] = useState(null)
  const[photos,setPhotos] = useState([])

  useEffect(()=>{
    baseAxios.get('/supplier/all')
      .then(response => {
        if(response.data.length > 0){
          setSuppliers(response.data)
        }
      })
      .catch(e =>{
        toast.error("Failed to load suppliers. "+e.message)
      })
  },[])

  useEffect(()=>{
    console.log("added photo");
    let isCancelled = false;

    const submitData = async () =>{
      let formF = form
      if(form.special = 'yes')
        formF.category = 'SPECIAL_APPROVAL'
      else
        formF.category = 'NORMAL'

      formF.supplierId = selectedSupp
      formF.weightPerItem = form.weightPerItem
      if(photos.length === 2){
        formF.photoURL11 = photos[0]
        formF.photoURL21 = photos[1]
  
        baseAxios.post("/item/register", formF)
        .then(response =>{
          if(response.data){
            toast.success("Added item succcesfully")
            setForm(formInit)
  
          }
          else{
            toast.error("Failed")
          }
        })
        .catch(e =>{
            toast.error("Failed." +e.message)
        })
      }
    }

    if( form.itemName === '' || 
    form.availableQty === '' || 
    form.maxQty === '' || 
    form.price === '' || 
    form.special === '' 
      ) toast.error("Please fill all column")
    else{
      if(!isCancelled)
      submitData();
    }

    return () => {
      isCancelled = true;
    };
  },[photos])

  const handleChange = ({ target }) => {
    if(target.name === 'photoURL11' || target.name === 'photoURL12') {
      setForm({ ...form, [target.name]: target.files[0] })
    }
    setForm({ ...form, [target.name]: target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await uploadToFirebaseStorage(photo1)
    await uploadToFirebaseStorage(photo2)
  }

  
  const uploadToFirebaseStorage = async (file) => {

    // Create the file metadata
    var metadata = {
      contentType: 'mime'
    };
    var uploadTask =  storageRef.child('Procurement System/Items/item_'+ file.name +'_'+ Date.now().toString()+'.jpg').put(file,metadata)
      
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
    await uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    toast.info('Upload is ' + progress + '% done');
    
    }, function(error) {
      toast.error('Upload error. '+error.message);
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('downloadURL', downloadURL);
        setPhotos([...photos, downloadURL])
        toast.success('File available at'+ downloadURL);
      });
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Item
        </Typography>

        <form className={classes.form} noValidate>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSupp}
              onChange={(e)=>{
                setSelectedSupp(e.target.value)
              }}
            >{
              suppliers.map((val,index)=>{
                return <MenuItem key={val._id} value={val._id}>{val.name + ', ' + val.location}</MenuItem>
              })
            }
            </Select>
        </FormControl>
          {formInputs.map((d, i) =>
            <TextField
              key={i}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="regular"
              label={d.label}
              name={d.name}
              autoFocus
              type={d.type}
              onChange={handleChange}
            />
          )}
            <TextField
              ref={photo1}
              key="photoURL11"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="regular"
              label="Image 1"
              name="photoURL21"
              autoFocus
              type="file"
              onChange={(e)=> setPhoto1(e.target.files[0]) }
            />
              <TextField
              ref={photo2}
              key="photoURL21"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="regular"
              label="Image 2"
              name="photoURL21"
              autoFocus
              type="file"
              onChange={(e)=> setPhoto2(e.target.files[0]) }
            />
          <div>
            Special Approval :
          {formRadio.map((d, i) =>
            <>
              <Radio
                key={i}
                checked={selectedValue === d.value}
                onChange={(e) => {
                  handleChange(e)
                  setSelectedValue(d.value)
                }}
                value={d.value}
                name={d.name}
                aria-label="A"
                icon={<FiberManualRecord className={classes.radioUnchecked} />}
                checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                classes={{
                  checked: classes.radio
                }}
              />
              {d.value}
            </>
          )}
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </form>
      </div>
 
    </Container>
  );
}




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
