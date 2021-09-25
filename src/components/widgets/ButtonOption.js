import React from 'react';

/**
 * 
 * @param {command, title} options 
 * @returns HTML
 */
export const ButtonOption  = ({onDidClick, cssClass, innerCssClass, options, hidden, id, style, innerStyle}) =>{
    
    const onTriggerClick = (option) =>{
        if (!option?.isActive){
            onDidClick?.();
            option?.command?.();
        }
    }

    return(
        <div hidden={hidden} className={`${cssClass}`} style={{zIndex:"99",...style}} id={id}>
            {options?.map((opt, key)=>(
                <button
                    disabled={opt?.isActive}
                    onClick={()=>onTriggerClick(opt)}
                    className={`btn btn-hover block max-width ${innerCssClass}`}
                    style={{
                        color:opt?.isActive && "white",
                        padding:"2px",
                        marginTop:"1px",
                        borderRadius:"3px",
                        ...innerStyle
                    }}
                    key={key}
                >{opt?.title}</button>
            ))}
        </div>
    )
}