import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Radio from "@material-ui/core/Radio";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const formInit = {
  email: '',
  password: '',
  staff: '',
}

export default function SignIn() {
  const classes = useStyles();
  const [form, setForm] = useState(formInit)
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleChange = ({ target }) => {
    const name = target.name
    const value = target.value
    const frm = { ...form, [name]: value }
    setForm(frm)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(form)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography style={{ fontWeight: "bold" }} component="h2" variant="h2">Procura</Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div>
          <Radio
            checked={selectedValue === "Procurement Staff"}
            onChange={(e) => {
              handleChange(e)
              setSelectedValue("Procurement Staff")
            }}
            value="Procurement Staff"
            name="staff"
            aria-label="A"
            icon={<FiberManualRecord className={classes.radioUnchecked} />}
            checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
            classes={{
              checked: classes.radio
            }}
          />
          Procurement Staff
          <Radio
            checked={selectedValue === "Management Staff"}
            onChange={(e) => {
              handleChange(e)
              setSelectedValue("Management Staff")
            }}
            value="Management Staff"
            name="staff"
            aria-label="B"
            icon={<FiberManualRecord className={classes.radioUnchecked} />}
            checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
            classes={{
              checked: classes.radio
            }}
          />
          Management Staff
        </div>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
            </Grid>
            <Grid item  >
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>

          </Grid>
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