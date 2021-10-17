import React from 'react'
import { Backdrop } from '../../container/Backdrop'
 
/**
 * @value if equal to null then loading will go up and down else accepts number or string
 */
export const LoadingBar = ({isOpen, value}) => {
    return(
        <Backdrop isOpen={isOpen} onTop>
            <div className="float-center progress-bar">
                <div>Please wait...</div>
                <progress value={value} max="100"/>
            </div>
        </Backdrop>
    )
}