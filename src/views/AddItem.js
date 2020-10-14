import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Link from '@material-ui/core/Link';
import Radio from "@material-ui/core/Radio";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const formInputs = [
  { label: 'Product ID', name: 'productId', type: 'text' },
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Supplier', name: 'supplier', type: 'text' },
  { label: 'Available Quantity', name: 'availableQty', type: 'number' },
  { label: 'Maximum Quantity', name: 'maximumQty', type: 'number' },
  { label: 'Price', name: 'price', type: 'number' },
]
const formRadio = [
  { name: 'special', value: 'yes' },
  { name: 'special', value: 'no' },
]
const formInit = {
  productId: '',
  name: '',
  supplier: '',
  availableQty: '',
  maximumQty: '',
  price: '',
  special: ''
}

export default function AddItem() {
  const classes = useStyles();
  const [form, setForm] = useState(formInit)
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleChange = ({ target }) => setForm({ ...form, [target.name]: target.value })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(form)
    setForm(formInit)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Item
        </Typography>

        <form className={classes.form} noValidate>
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Procura
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
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