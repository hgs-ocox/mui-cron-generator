/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Minutes from '../minutes-select';
import Hour from '../hour-select';
import LabelBox from '../labelBox'

import styles from '../cron-builder.styl'

const MonthlyCron = ({classes, value, onChange, translate:translateFn}) => {

  const [every, setEvery] = useState(0)


  useEffect(() => {
    if (value[3] === 'L'){
        setEvery("2")
    } else if (value[3] === 'LW') {
        setEvery("3")
    } else if (value[3].startsWith('L')) {
        setEvery("4")
    } else {
        setEvery("1")
    }
  }, [])

  const onDayChange = (e) => {
      if(((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31)) || e.target.value === "") {
          let val = ['0',value[1] === '*' ? '0' : value[1], value[2] === '*' ? '0': value[2], value[3],'1/1', '?','*'];
          val[3] = `${e.target.value}`;
          onChange(val)
      }
  }
  const onLastDayChange = (e) => {
      if(((parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31)) || e.target.value === "") {
          let val = ['0',value[1] === '*' ? '0' : value[1], value[2] === '*' ? '0': value[2], value[3],'1/1', '?','*'];
          val[3] = (e.target.value === '')? '' : `L-${e.target.value}`
          onChange(val)
      }
  }
  const onAtHourChange = (e) => {
      let val = value;
      val[2] = `${e.target.value}`;
      onChange(val)
  }
  const onAtMinuteChange = (e) => {
      let val = value;
      val[1] = `${e.target.value}`;
      onChange(val)
  }

  return (
    <Fragment>
    <LabelBox variant="content">
      <input className={classes.radio} type="radio" onChange={(e) => {setEvery(e.target.value); onChange(['0',this.state.value[1] === '*' ? '0' : value[1], value[2] === '*' ? '0': value[2],'1','1/1', '?','*'])}} value="1" name="MonthlyRadio" checked={every === "1" ? true : false} />
      {translateFn('Day')}
      <input readOnly={every !== "1"} type="number" value={value[3]} onChange={onDayChange}/>
      {translateFn('of every month(s)')}
    </LabelBox>
    <LabelBox variant="content">
      <input className={classes.radio} onChange={(e) => {setEvery(e.target.value); onChange(['0',value[1] === '*' ? '0' : value[1], value[2] === '*' ? '0': value[2],'L','*', '?','*'])}} type="radio" value="2" name="DailyRadio" checked={every === "2" ? true : false}/>
      {translateFn('Last day of every month')}
    </LabelBox>
    <LabelBox variant="content">
      <input className={classes.radio} onChange={(e) => {setEvery(e.target.value); onChange(['0',value[1] === '*' ? '0' :value[1], value[2] === '*' ? '0': value[2] ,'LW','*', '?','*'])}} type="radio" value="3" name="DailyRadio" checked={every === "3" ? true : false}/>
      {translateFn('On the last weekday of every month')}
    </LabelBox>
    <LabelBox variant="content">
      <input className={classes.radio} type="radio"  onChange={(e) => {setEvery(e.target.value);  onChange(['0',value[1] === '*' ? '0' : value[1], value[2] === '*' ? '0': value[2],`L-${1}`,'*', '?','*']) }} value="4" name="MonthlyRadio" checked={every === "4" ? true : false} />

      <input readOnly={every !== "4"} type="number" value={value[3].split('-')[1]} onChange={onLastDayChange}/>
      {translateFn('day(s) before the end of the month')}
    </LabelBox>
    <br/>
    <div style={{display:"flex"}}>
      <Typography variant="body1" gutterBottom>
        {translateFn('Start time')}
        <Hour onChange={onAtHourChange} value={value[2]} />
        <Minutes onChange={onAtMinuteChange} value={value[1]} />
      </Typography>
    </div>
  </Fragment>
  )


}

MonthlyCron.defaultProps = {
  onChange: (value) => {console.log(value)}
}

MonthlyCron.muiName = "MonthlyCron"

export default withStyles(styles)(MonthlyCron)
