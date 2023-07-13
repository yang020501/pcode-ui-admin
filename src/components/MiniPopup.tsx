import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useMousePosition from '@/utils/mousePosition'
const MiniPopup = (props: any) => {
    const mousePosition = useMousePosition()
    const minipopupFunctionRef = useRef<HTMLDivElement>(null)

    const closeOptionMenu = () => {
        let valid = document.activeElement ? document.activeElement.children[0].classList.value : ""
        if (!(valid === "gridoption")) {
            minipopupFunctionRef.current ? minipopupFunctionRef.current.classList.remove('show') : ""
            props.close()
            // window.removeEventListener('click', closeOptionMenu)
        }

    }
    useEffect(() => {
        if (props.open !== "") {
            // openOptionMenu()
            minipopupFunctionRef.current ? minipopupFunctionRef.current.style.top = `${mousePosition.y ? mousePosition.y + 5 + document.documentElement.scrollTop : '5'}px` : null
            minipopupFunctionRef.current ? minipopupFunctionRef.current.style.left = `${mousePosition.x ? mousePosition.x + 5 : '5'}px` : null
            minipopupFunctionRef.current ? minipopupFunctionRef.current.classList.add('show') : null
            window.addEventListener('click', closeOptionMenu)
        }
        return () => {
            window.removeEventListener('click', closeOptionMenu)
        }
    }, [props.open])
    return (
        <div className="minipopup">
            <div className="minipopup-function" ref={minipopupFunctionRef} >
                {
                    props.actions ?
                        props.actions.map((item: any, index: number) => {
                            return (
                                <div key={index} className="minipopup-function-item" onClick={item.click}>
                                    {item.name}
                                </div>
                            )
                        })

                        : <React.Fragment />
                }
            </div>
        </div>
    )
}

MiniPopup.propTypes = {
    actions: PropTypes.array,
    open: PropTypes.string,
    close: PropTypes.func
}

export default MiniPopup
