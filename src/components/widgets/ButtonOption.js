import React from 'react';

/**
 * 
 * @param {command, title} options 
 * @returns HTML
 */
export const ButtonOption  = ({onDidClick, cssClass, innerCssClass, options, hidden, id, style, innerStyle}) =>{
    
    const onTriggerClick = (action) =>{
        onDidClick?.();
        action?.();
    }

    return(
        <div hidden={hidden} className={`${cssClass}`} style={{zIndex:"99",...style}} id={id}>
            {options?.map((opt, key)=>(
                <button
                    onClick={()=>onTriggerClick(opt?.command)}
                    className={`btn btn-hover block max-width ${innerCssClass}`}
                    style={{padding:"2px",marginTop:"1px",borderRadius:"3px",...innerStyle}}
                    key={key}
                >{opt?.title}</button>
            ))}
        </div>
    )
}