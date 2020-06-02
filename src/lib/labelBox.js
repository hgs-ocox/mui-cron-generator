/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styles from './cron-builder.styl'

const LabelBox = ({classes, children, variant}) => {
  return (
    <Box
      className={variant && variant === 'label'? classes.labelBox : classes.contentBox}
    >
      <Box m="auto">
        <Typography variant="body1" gutterBottom>
          {children}
        </Typography>
      </Box>
    </Box>
  )
}

LabelBox.defaultProps = {
  variant:"label",
}

export default withStyles(styles)(LabelBox);
