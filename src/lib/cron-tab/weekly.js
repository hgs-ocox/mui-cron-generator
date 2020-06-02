import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Minutes from '../minutes-select';
import Hour from '../hour-select';
import styles from '../cron-builder.styl'
import LabelBox from '../labelBox'

const DoW = {
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
  SUN: "Sunday"
}


const WeeklyCron = ({classes, value, onChange, translate:translateFn}) => {

  const onAtHourChange = (e) => {
      let val = value;
      val[0] = '0';
      val[2] = `${e.target.value}`;
      onChange(JSON.parse(JSON.stringify(val)))
  }

  const onAtMinuteChange = (e) => {
      let val = value;
      val[0] = '0';
      val[1] = `${e.target.value}`;
      onChange(JSON.parse(JSON.stringify(val)))
  }

  const onCheck = (e) => {
      let val = value;
      val[0] = '0';
      if(e.target.checked) {
          onDayChecked(val, e);
      } else {
          onDayUnChecked(val, e);
      }
      onChange(JSON.parse(JSON.stringify(val)))
  }

  const onDayChecked = (val, e) => {
      val[2] = (`${val[2]}`.split('/').length > 1) ? '0' : val[2].toString();
      val[3] = '?';
      val[4] = '*';
      if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
          val[5] = e.target.value;
      } else {
          val[5] = val[5] + '!' + e.target.value;
      }
  }

  const onDayUnChecked = (val, e) => {
      val[5] = val[5].split('!');
      if (val[5].length > 1) {
          val[5].splice(val[5].indexOf(e.target.value), 1);
          val[5] = val[5].toString().replace(/,/g, '!');
      }
      else {
          val[5] = '*';
      }
  }

  let Checkboxes = Object.keys(DoW).reduce((result, key, i) => {

    result[i % result.length].push(
      <FormControlLabel
        control={<Checkbox value={key} checked={value[5].search(key) !== -1} onChange={onCheck} name={DoW[key]} />}
        label={translateFn(DoW[key])}
      />
    )

    return result
  }, [[],[],[]])

  return (
    <Fragment>
      <LabelBox variant="content">
        {translateFn('Start time')}
        <Hour onChange={onAtHourChange} value={value[2]} />
        <Minutes onChange={onAtMinuteChange} value={value[1]} />
      </LabelBox>
      <LabelBox variant="content">
      {
        Checkboxes.map(box => {
          return (
            <FormControl>
              <FormGroup>
               {box}
              </FormGroup>
          </FormControl>
          )
        })
      }
      </LabelBox>
    </Fragment>
  )


}

WeeklyCron.defaultProps = {
  onChange: (value) => {console.log(value)}
}

WeeklyCron.muiName = 'WeeklyCron'

export default withStyles(styles)(WeeklyCron)
