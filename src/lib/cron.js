/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect, useRef, forwardRef} from 'react';
import { withStyles } from '@material-ui/core/styles';
import cronstrue from 'cronstrue/i18n';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LabelBox from './labelBox'
import { metadata, loadHeaders } from './meta';
import styles from './cron-builder.styl'

const defaultValue = ['0','0','00','1/1','*','?','*']

const findTab = (value) => {

  let index = 0

  if((value[1].search('/') !== -1) && (value[2] === '*') && (value[3] === '1/1')) {
      index = 0
  } else if((value[3] === '1/1')) {
      index = 1
  } else if((value[3].search('/') !== -1) || (value[5] === 'MON-FRI')) {
      index = 2
  } else if (value[3] === '?') {
      index = 3
  } else if (value[3].startsWith('L') || value[4] === '1/1') {
      index = 4
  }

  return index
}

const Cron = forwardRef(({options, locale, onChange, translateFn, value:initValue, showResultText, showResultCron, classes, ...props}, ref) => {

  const [headers] = useState(loadHeaders(options))
  const [value, setValue] = useState(initValue)
  const [tabValue, setTabValue] = useState(findTab(value))
  const [tabWidth, setTabWidth] = useState(100)

  const tabRef = useRef(null)

  useEffect(() => {
    onChange(value.toString().replace(/,/g,' ').replace(/!/g, ','))

    if(translateFn && !locale) {
        console.log('Warning !!! locale not set while using translateFn');
    }

    setTabWidth(tabRef.current.offsetWidth/headers.length)
    window.addEventListener('resize', handleResize)

   return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    onChange(value.toString().replace(/,/g,' ').replace(/!/g, ','))
  }, [value])

  useEffect(() => {
    if (value !== initValue) setValue(JSON.parse(JSON.stringify(getMetadata().initialCron)))
  }, [tabValue])


  const handleResize = () => {
    setTabWidth(tabRef.current.offsetWidth/headers.length)
  }

  const onValueChange = (value) => {
    setValue((value && value.length)? value : defaultValue);
  }


  const getVal = () => {
      let val = cronstrue.toString(value.toString().replace(/,/g,' ').replace(/!/g, ','), { locale: locale })
      return (val.search('undefined') === -1)? val : '-'
  }

  const getMetadata = () => {

    let selectedMetaData = metadata.find(data => data.component.muiName === `${headers[tabValue]}Cron`)

    if(!selectedMetaData) {
        selectedMetaData = metadata[tabValue];
    }
    if(!selectedMetaData) {
        throw new Error('Value does not match any available headers.');
    }

    return selectedMetaData
  }


  const getComponent = () => {
      const CronComponent = getMetadata().component;
      return <CronComponent translate={translate} value={value} onChange={onValueChange} />;
  }


  const translate = (key) => {
      let translatedText = key;
      if(translateFn) {
          translatedText = translateFn(key);
          if(typeof translatedText !== 'string') {
              throw new Error('translateFn expects a string translation');
          }
      }
      return translatedText;
  }



  const getHeaders = () => {

    const style = {
      width: `${tabWidth}px !important`,
      maxWidth: `${tabWidth}px`,
      minWidth: `${tabWidth}px`
    };

    return headers.map((d, index) => {
      return  <Tab key={index} label={translate(d)} style={style}/>
    })
  }

  return (
    <Paper ref={ref} {...props}>
      <Tabs
        ref={tabRef}
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        fillWidth
        onChange={(ev, value) => {setTabValue(value)}}
        aria-label="disabled tabs example"
      >
        {getHeaders()}
      </Tabs>
      <div className="cron_builder_bordering">{getComponent()}</div>

      {showResultText && <LabelBox>
        {getVal()}
      </LabelBox>}

      {showResultCron && <LabelBox>
        {value.toString().replace(/,/g,' ').replace(/!/g, ',')}
      </LabelBox>}
    </Paper>
  )

})

Cron.defaultProps = {
  locale:'en',
  value: defaultValue,
  onChange: (value) => {console.log(value)},
  showResultText: true,
  showResultCron: true
}

export default withStyles(styles)(Cron);
