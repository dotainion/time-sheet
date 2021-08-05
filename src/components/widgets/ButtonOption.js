import React from 'react';

/**
 * 
 * @param {command, title} options 
 * @returns HTML
 */
export const ButtonOption  = ({cssClass, options, hidden, id, style}) =>{
    return(
        <div hidden={hidden} className={`${cssClass}`} style={{zIndex:"99",...style}} id={id}>
            {options?.map((opt, key)=>(
                <button
                    onClick={opt?.command}
                    className="btn btn-hover block max-width" 
                    style={{padding:"2px",marginTop:"1px",borderRadius:"3px"}}
                    key={key}
                >{opt?.title}</button>
            ))}
        </div>
    )
}