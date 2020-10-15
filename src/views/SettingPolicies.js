import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import PrettoSlider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';


const formInit = {
  itemLimit: 20,
  maxOrders: '',
}

export default function SettingPolicies() {

  const [form, setForm] = useState(formInit)

  const handleChange = ({ target }) => setForm({ ...form, [target.name]: target.value })

  const handleSliderChange = (event, newValue) => setForm({ ...form, itemLimit: newValue })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(form)
    setForm(formInit)
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ padding: 10 }}>Set item amount warning limit</label>
        <PrettoSlider style={{ padding: 10, width: 300 }} onChange={handleSliderChange} value={typeof form.itemLimit === 'number' ? form.itemLimit : 0} name="itemLimit" valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
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
          name='maxOrders'
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
