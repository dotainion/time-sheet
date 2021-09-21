import React from 'react';
import { ADMIN_SIDE_NAV } from '../contents/lists';
import { tools } from '../utils/tools/Tools';

export const HelpAdminNav = () =>{
    return(
        <div style={{backgroundColor:"black",color:"White"}}>
            <div className="inline-block centered" style={{textAlign:"center",cursor:"pointer",whiteSpace:"nowrap"}}>
                <div className="flex" style={{fontSize:"25px"}}>
                    {ADMIN_SIDE_NAV.map((nav, key)=>(
                        <>
                            {
                                nav?.title.toLowerCase() !== "help" && 
                                <div className="pad label-hover" key={key}>{tools.titleCase(nav?.title)}</div>
                            }
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}