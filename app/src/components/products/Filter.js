import React, {useState} from 'react';

import {
    makeStyles,
    Button,
    Grid,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    Slider,
    TextField
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import useUrlParams from '../../hooks/useUrlParams';
import {useLocation, Link, useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    button: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transition: "all .3s",
        color: theme.palette.primary.dark,
        fontWeight: "bold",
        textDecoration: "none",
        "&:hover": {
            transform: "scale(1.1)"
        }
    },
    filter: {
        padding: "30px",
        display: "flex",
        justifyContent: "flex-end"
    },
    innerFilter: {
      padding: "30px 70px",
      [theme.breakpoints.down('sm')]: {
        padding: "30px",
      },
    },
    resetButton: {
      backgroundColor: theme.palette.primary.light
    }
}))



const Filter = () => {

    const classes = useStyles();
    const [modal, addModal, removeModal, params] = useUrlParams();
    const {pathname} = useLocation();
    const {push} = useHistory();

    const defaultForm = {
      name: params.get("name") || "",
      new: params.get("new") || "",
      featured: params.get("featured") || "",
      min: params.get("min") || 0,
      max: params.get("max") || 10000
    };

    const [form, setForm] = useState(defaultForm);

    const handleClose = () => {
      push(removeModal);
    };

    function changeHandler(event) {
      const {name, value} = event.target;
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }))
    }

    function changeCheckbox(event) {
      const {name, checked} = event.target;
      setForm(prevForm => ({
        ...prevForm,
        [name]: checked
      }))
    }

    function rangeChange(event, newValue) {
      setForm(prevForm => ({
        ...prevForm,
        min: newValue[0],
        max: newValue[1]
      }))
    }

    function submitHandler(event) {
      event.preventDefault();
      push(`${pathname}?${new URLSearchParams(form).toString()}`);
    }

    function reset() {
      setForm(defaultForm)
    }

    const isFilter = (modal == "filter");

    return (
        <div>
            <div className={classes.filter}>
                <Link className={classes.button} role="button" to={isFilter ? removeModal : addModal("filter")}>
                    <FilterListRoundedIcon /> Filter
                </Link>
            </div>
            <Dialog
            maxWidth="md"
            open={isFilter}
            onClose={handleClose}
          >
        <DialogTitle className="text-center">Products filter</DialogTitle>

        <form className={classes.innerFilter} onSubmit={submitHandler}>

        <div className="mb-30">
        <FormControl component="fieldset" fullWidth>
            <TextField label="Name" name="name" variant="outlined" value={form.name} onChange={changeHandler}/>
          </FormControl>
        </div>

        <div className="mb-30">
        <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">New products</FormLabel>
            <FormControlLabel value="1" control={<Checkbox name="new" onChange={changeCheckbox} value="1" checked={!!form.new}/>} label="Show only new products" />
          </FormControl>
        </div>

        <div className="mb-30">
          <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Featured products</FormLabel>
              <FormControlLabel value="1" control={<Checkbox name="featured" onChange={changeCheckbox} value="1" checked={!!form.featured}/>} label="Show only featured products" />
            </FormControl>
        </div>

        <div className="mb-30">
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={form.gender || ""} onChange={changeHandler}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="mb-30">
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Money Range (лв.)</FormLabel>
            <Slider
              value={[form.min, form.max]}
              onChange={rangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              valueLabelDisplay="off"
              min={0}
              max={10000}
              className="mb-15"
            />
            <div className="d-flex">
              <TextField label="Min" type="number" variant="outlined" value={form.min} onChange={(event) => rangeChange(event, [+event.target.value, form.max])} />
              <TextField label="Max" type="number" variant="outlined" value={form.max} onChange={(event) => rangeChange(event, [form.min, +event.target.value])}/>
            </div>
          </FormControl>
        </div>
      <div className="d-flex justify-content-between">
        <Button variant="contained" color="primary" size="large" type="submit">
          Filter
        </Button>

          <Button variant="contained" color="primary" className={classes.resetButton} onClick={reset}>
          Reset
        </Button>
      </div>


        </form>

      </Dialog>
        </div>
    );
}

export default Filter;
