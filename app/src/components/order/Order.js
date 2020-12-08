import React, {useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {useMeLazyQuery} from './graphql';
import General from './General';
import Delivery from './Delivery';
import Payment from './Payment';
import GlobalContext from '../context/GlobalContext';
import Done from './Done';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px",
    [theme.breakpoints.down("xs")]: {
        padding: "10px 10px 50px"
    }
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  inner: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "4px",
      marginTop: "50px",
      marginBottom: "50px",
      maxWidth: [theme.breakpoints.values.sm],
      margin: "0 auto"
  },
  step: {
      [theme.breakpoints.down("xs")]: {
        "&>span": {
            display: "flex",
            flexDirection: "column"
        }
      }
  }

}));

function getSteps() {
  return ['General', 'Delivery', 'Payment'];
}

function getStepContent(step, next, submitForm, form, user, data) {
    const props = {
        next, submitForm, form, user
    }
  switch (step) {
    case 0:
      return <General {...props} />;
    case 1:
      return <Delivery {...props} />;
    case 2:
      return <Payment {...props} />
    case 3:
      return <Done data={data}/>;
    default:
      return "Unknown step"
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({});
  const [next, setNext] = useState(null);
  const steps = getSteps();
  const [fetchUser, {data, loading}] = useMeLazyQuery();
  const {user, cart} = useContext(GlobalContext);

  const handleNext = () => {
    setNext(new Date().getTime());
  };

  useEffect(() => {
    if(user) {
      fetchUser({
        variables: {
          id: user.id
        }
      })
    }
  }, [user])

  if(loading) {
    return "loading...";
  }

  function submitForm(formData) {
    setNext(null);
    setForm(prevForm => ({...prevForm, ...formData}));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const fullUser = data?.me;

  return (
    <div className={classes.root}>
      {
        (activeStep != 3) && 
        (
          <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps} className={classes.step}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        )
      }
      <div>

          <div>
              <div className={classes.inner}>
              {getStepContent(activeStep, next, submitForm, form[`form${activeStep}`], fullUser, form)}
              </div>
            <div className="text-center">
              {
                (activeStep != 3) && 
                (
                  <>

              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>

                  </>
                )
              }

            </div>
          </div>

      </div>
    </div>
  );
}
