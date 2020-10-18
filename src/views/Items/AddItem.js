import React, { useEffect, useState } from 'react';
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

const formInputs = [
  { label: 'Name', name: 'itemName', type: 'text' },
  { label: 'Available Quantity', name: 'availableQty', type: 'number' },
  { label: 'Maximum Quantity', name: 'maxQty', type: 'number' },
  { label: 'Weight per item', name: 'weightPerItem', type: 'number' },
  { label: 'Price', name: 'price', type: 'number' },
  // { label: 'Picture 1', name: 'photoURL11', type: 'number' },
  // { label: 'Picture 2', name: 'photoURL21', type: 'number' },
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

  var [fireBaseConfig,setFireBaseConfig] = useState()

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

  const handleChange = ({ target }) => setForm({ ...form, [target.name]: target.value })

  const handleSubmit = (event) => {
    event.preventDefault()

    if( form.itemName === '' || 
        form.availableQty === '' || 
        form.maxQty === '' || 
        form.price === '' || 
        form.special === '' 
    ) return toast.error("Please fill all column")

    let formF = form
    if(form.special = 'yes')
      formF.category = 'SPECIAL_APPROVAL'
    else
      formF.category = 'NORMAL'

    formF.supplierId = selectedSupp
    formF.weightPerItem = form.weightPerItem
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