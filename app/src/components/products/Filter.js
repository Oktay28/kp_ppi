import React, {useState, useEffect} from 'react';

import {
    makeStyles,
    Button,
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
import {useCategoriesLazyQuery} from './graphql';
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
    const [fetchCategories, {data, loading}] = useCategoriesLazyQuery();

    const defaultForm = {
      name: "",
      new: "",
      featured: 0,
      min: 0,
      max: 10000,
      category: 0
    };

    const [form, setForm] = useState({
      name: params.get("name") || "",
      new: params.get("new") || "",
      featured: +params.get("featured") || 0,
      min: +params.get("min") || 0,
      max: +params.get("max") || 10000,
      category: params.get("category")
    });

    const isFilter = (modal == "filter");

    useEffect(() => {
      if(isFilter) {
        fetchCategories();
      }
    }, [isFilter])

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
        [name]: +checked
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
      console.log(defaultForm)
      setForm(defaultForm)
    }

    if(loading) {
      return "loading..."
    }

    const categories = data?.categories || [];

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
            <FormControlLabel control={<Checkbox name="new" onChange={changeCheckbox} value="1" checked={!!form.new}/>} label="Show only new products" />
          </FormControl>
        </div>

        <div className="mb-30">
          <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Featured products</FormLabel>
              <FormControlLabel control={<Checkbox name="featured" onChange={changeCheckbox} value="1" checked={!!form.featured}/>} label="Show only featured products" />
            </FormControl>
        </div>

        <div className="mb-30">
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup aria-label="category" name="category" value={form.category || ""} onChange={changeHandler}>
              <FormControlLabel value="0" control={<Radio />} label="All" />
              {
                categories.map(category => (
                    <FormControlLabel value={category.id} key={category.id} className="text-capitalize" control={<Radio />} label={category.name} />
                ))
              }
              
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
