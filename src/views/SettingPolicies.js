import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import PrettoSlider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


//initial state
const formInit = {
  criticalPercentage: 20,
  limitPrice: '',
}

export default function SettingPolicies() {

  const [form, setForm] = useState(formInit)

  //change state when input field changes
  const handleChange = ({ target }) => setForm({ ...form, [target.name]: target.value })

  //change state when slider changes 
  const handleSliderChange = (event, newValue) => setForm({ ...form, criticalPercentage: newValue })

  //run this function when user clicks the submit button
  const handleSubmit = async (event) => {
    event.preventDefault()

    //check for empty values
    if (form.criticalPercentage === '' || form.limitPrice === '') return toast.error("Please fill all column")

    //call post method
    const result = await axios.post('http://localhost:8000/settings/', form)

    //check whether the data submitted to the database
    if (!result) return toast.error("Failed to save")

    //notify the user
    toast.success("Successfully submitted")

    //reset the state
    setForm({
      criticalPercentage: 20,
      limitPrice: '',
    })
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <ToastContainer />
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ padding: 10 }}>Set item amount warning limit</label>
        <PrettoSlider style={{ padding: 10, width: 300 }} onChange={handleSliderChange} value={typeof form.criticalPercentage === 'number' ? form.criticalPercentage : 0} name="criticalPercentage" valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
      </section>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ padding: 10 }}>Set maximum amount of orders without approval</label>
        <TextField
          style={{ width: 400 }}
          variant="outlined"
          margin="normal"
          required
          id="regular"
          label='Rs:'
          name='limitPrice'
          autoFocus
          type='number'
          onChange={handleChange}
        />
      </section>
      <Button
        style={{ marginTop: 20, padding: 15, width: 400 }}
        type="submit"
        variant="contained"
        color="primary"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </Button>
    </form>
  );
}
