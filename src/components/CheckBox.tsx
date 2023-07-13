import { useRef } from 'react'
import PropTypes from 'prop-types'

const CheckBox = (props: any) => {
    const inputRef = useRef(null)
    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }
    return (
        <label className='custom-checkbox'>
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked}></input>
            <span className='custom-checkbox-checkmark'>
                <i className='bx bx-check' />
            </span>
            {props.label}
        </label>
    )
}

CheckBox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool
}

export default CheckBox