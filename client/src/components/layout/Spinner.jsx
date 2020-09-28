import React from 'react'
import spinner from '../../img/spinner.gif'

export default () => {

    const styleSpinner = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px'
    }
    return (
        <>
            <img 
            src={spinner}
            style={styleSpinner}
            alt='Loading...'
            />
        </>
    )
}