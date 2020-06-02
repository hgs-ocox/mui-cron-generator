/* eslint-disable react/no-direct-mutation-state */
import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Minutes from '../minutes-select';
import Hour from '../hour-select';
import LabelBox from '../labelBox'

import styles from '../cron-builder.styl'

const DailyCron = ({classes, value, onChange, translate:translateFn}) => {

  const [every, setEvery] = useState(value[3] !== '?')


  const onDayChange = (e) => {
      if(!e.target.value || (e.target.value > 0 && e.target.value < 32 )) {
          //setValue(['0', this.getValueByIndex(1), this.getValueByIndex(1),'*','*','?','*']);
          onValueChange(3, (e.target.value ? `1/${e.target.value}` : e.target.value));
      }
  }

  const onAtHourChange = (e) => {
      onValueChange(2, e.target.value);
  }

  const onAtMinuteChange = (e) => {
      onValueChange(1, e.target.value);
  }

  const onValueChange = (cronPosition, input) => {
      let val = value;
      val[cronPosition] = input;
      onChange(JSON.parse(JSON.stringify(val)));
  }


  return (
    <Fragment>
      <LabelBox variant="content">
        <input className={classes.radio} type="radio" onChange={(e) => {setEvery(true); onChange();}} value="1" name="DailyRadio" checked={every} />
        <span>{translateFn('Every')}</span>
        <input disabled={!every} type="Number" maxLength="2" onChange={onDayChange} value={value[3].split('/')[1] ? value[3].split('/')[1] :''} />
        <span>{translateFn('day(s)')}</span>
      </LabelBox>
      <LabelBox variant="content">
        <input className={classes.radio} onChange={(e) => {setEvery(false); onChange(['0', value[1], value[2],'?','*', 'MON-FRI','*'])}} type="radio" value="2" name="DailyRadio" checked={!every}/>
        <span>{translateFn('Every week day')}</span>
      </LabelBox>
      <LabelBox variant="content">
        <span>{translateFn('Start time')}</span>
        <Hour onChange={onAtHourChange} value={value[2]} />
        <Minutes onChange={onAtMinuteChange} value={value[1]} />
      </LabelBox>
    </Fragment>
  )


}

DailyCron.muiName = 'DailyCron'

export default withStyles(styles)(DailyCron)
