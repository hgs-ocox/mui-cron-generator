import { createStyles } from '@material-ui/core/styles';


const styles = (theme) => {

  return (
    createStyles({
      labelBox: {
        marginTop:'5px',
        display:"flex",
        backgroundColor:theme.palette.primary.main,
        color:theme.palette.primary.contrastText
      },
      contentBox: {
        marginTop:'5px',
        backgroundColor:theme.palette.grey[100],
        display:'flex',
        borderRadius:5,
        padding:'10px'
      },
      radio: {
        display:"inline",
        padding:"0px !important",
        backgroundColor:'#00ffff',
        maxWidth:'10px !important',
        width:'10px !important',
        border:'0px'
      }
    })
  )
}
export default styles
