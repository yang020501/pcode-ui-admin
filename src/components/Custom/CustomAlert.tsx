import { useEffect } from 'react'
import { Alert, AlertColor } from '@mui/material'

interface CustomAlertProps {
    type: AlertColor,
    message: string,
    close: Function
}
const CustomAlert = (props: CustomAlertProps) => {


    useEffect(() => {
        let timer = setTimeout(() => {
            props.close()
        }, 2500)
        return () => {
            clearTimeout(timer);
        }
    }, [])
    return (
        <Alert onClose={() => { props.close() }} severity={props.type}>{props.message} </Alert>
    )
}



export default CustomAlert
