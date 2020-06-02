import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Minutes from '../minutes-select';
import Hour from '../hour-select';
import LabelBox from '../labelBox'

import styles from '../cron-builder.styl'

const HourlyCron = ({classes, value, translate:translateFn, onChange}) => {

  const [every, setEvery] = useState(value[2].split('/')[1] || value[2] === '*')

  const onHourChange = (e) => {
      if (every && ((e.target.value > 0 && e.target.value < 24) || e.target.value === '')) {
          let val = ['0','0','*','*','*','?','*'];
          val[2] = e.target.value ? `0/${e.target.value}` : e.target.value;
          val[3] = '1/1';
          onChange(val);
      }
  }

  const onAtHourChange = (e) => {
      let val = ['0', value[1],'*','1/1','*','?','*']
      val[2] = `${e.target.value}`;
      onChange(val);
  }

  const onAtMinuteChange = (e) => {
      let val = ['0','*', value[2],'1/1','*','?','*']
      val[1] = `${e.target.value}`;
      onChange(val);
  }


  return (
    <Fragment>
     <LabelBox variant="content">
      <input className={classes.radio} type="radio" onChange={(e) => {setEvery(true); onChange(['0','0','0/1','1/1','*','?','*'])}} checked={every} />
      <span>{translateFn('Every')} </span>
      <input disabled={!every} type="Number" onChange={onHourChange} value={value[2].split('/')[1] ? value[2].split('/')[1] : ''}  />
      <span>{translateFn('hour(s)')}</span>
   </LabelBox>
   <LabelBox variant="content">
     <input className={classes.radio} type="radio" onChange={(e) => {setEvery(false); onChange();}} checked={!every}/>
     <span>{translateFn('At')}</span>
     <Hour disabled={every} onChange={onAtHourChange} value={value[2]} />
     <Minutes disabled={every} onChange={onAtMinuteChange} value={value[1]} />
   </LabelBox>
   </Fragment>
  )
}

HourlyCron.muiName = 'HourlyCron'

export default withStyles(styles)(HourlyCron)
