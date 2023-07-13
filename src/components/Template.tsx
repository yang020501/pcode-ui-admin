import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MyButton from './MyButton'
import { Button } from '@mui/material';

const Template = (props: any) => {
    return (
        <div className='template'>
            {props.children}
        </div>
    )
}
export const TemplateSearch = (props: any) => {
    return (
        <div className='template-search'>
            {props.children}
        </div>
    )
}
export const TemplateTitle = (props: any) => {
    return (
        <div className='template-title'>
            {props.children}
        </div>
    )
}
export const TemplateLineAction = (props: any) => {
    return (
        <div className='template-lineaction'>
            {props.children}
        </div>
    )
}
export const TemplateData = (props: any) => {
    return (
        <div className='template-data'>
            <div className="template-data-container">
                {props.children}
            </div>
        </div>
    )
}
export const TemplateModal = (props: any) => {
    const [open, setOpen] = useState(props.open)
    useEffect(() => {
        setOpen(props.open)
    }, [props.open])
    return (
        <Modal open={open}
            // onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={`template-modal ${props.size ? props.size : 'sm'}`}>
                <div className="template-modal-content">
                    {
                        props.form ?
                            <Box component="form" onSubmit={props.onsubmit}>
                                {
                                    props.children
                                }
                            </Box> :
                            <Box  >
                                {
                                    props.children
                                }
                            </Box>
                    }
                </div>
            </div>
        </Modal >
    )
}
TemplateModal.propsType = {
    open: PropTypes.bool.isRequired,
    size: PropTypes.string,
    form: PropTypes.bool.isRequired,
    onsubmit: PropTypes.func
}
export const TemplateModalTitle = (props: any) => {
    return (
        <div className="template-modal-content-title">
            {
                props.children
            }
        </div>
    )
}
export const TemplateModalBody = (props: any) => {
    return (
        <div className="template-modal-content-body">
            {
                props.children
            }
        </div>
    )
}
export const TemplateModalAction = (props: any) => {
    return (
        <div className="template-modal-content-action">
            {
                props.activeRight ?
                    <div className={``}>
                        <Button variant='contained' type="submit" >{props.activeRight}</Button>
                    </div>
                    :
                    <></>
            }
            <div className={``}>
                <Button    onClick={props.funcError}>Cancel</Button>
            </div>
        </div>
    )
}
TemplateModalAction.propsType = {
    size: PropTypes.string,
    funcError: PropTypes.func.isRequired,
    funcConfirm: PropTypes.func
}
export default Template
