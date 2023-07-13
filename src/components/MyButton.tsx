import React, { PropsWithChildren, ReactNode } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

interface MyButtonProps {
    backgroundColor?: string,
    size?: any,
    type: any,
    // icon: PropTypes.string,
    // animate: PropTypes.bool,
    onclick?: Function,
    fullWidth?: boolean,
    btnType?: string,
    children: string
}
const MyButton = (props: MyButtonProps) => {

    const { backgroundColor, btnType, fullWidth, type, onclick, size, children } = props

    return (
        <Button
            className={`pulse ${btnType ? btnType : ""}`}
            type={type ? type : 'button'}
            fullWidth={fullWidth ? true : false}
            size={size}
            onClick={onclick ? () => { onclick() } : () => { }}
        >
            {
                children
            }
        </Button>
    )
}

MyButton.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    // icon: PropTypes.string,
    // animate: PropTypes.bool,
    onclick: PropTypes.func,
    fullWidth: PropTypes.bool,
    btnType: PropTypes.string
}

export default MyButton