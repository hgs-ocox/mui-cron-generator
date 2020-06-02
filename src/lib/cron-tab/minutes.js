import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LabelBox from '../labelBox'

import styles from '../cron-builder.styl'


const MinutesCron = ({classes, onChange:handleChange, value, translate:translateFn}) => {

    const onChange = (e) => {
        if((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
            let val = ['0','*','*','*','*','?','*']
            val[1] = e.target.value ? `0/${e.target.value}` : val[1];
            handleChange(val)
        }
    }

    if (value && value.length > 1) {
      value = value[1].split('/')[1];
    }

    return (
      <LabelBox variant="content">
        {translateFn('Every')} <input type="Number" onChange={onChange} value={value} min={1} max={60} /> {translateFn('minute(s)')}
      </LabelBox>
    )

}

MinutesCron.defaultProps = {
  onChange: (value) => {console.log(value)}
}

MinutesCron.muiName = 'MinutesCron'

export default withStyles(styles)(MinutesCron)
