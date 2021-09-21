import React from 'react';
import { HelpAdminNav } from './HelpAdminNav';


export const Help = () =>{
    const helps = [
        {
            title: "title",
            subTitle: "sub-title",
            documentation: "some info",
            steps: [
                {
                    title: "title",
                    subTitle: "sub-title",
                    documentation: "some info"
                },{
                    title: "title",
                    subTitle: "sub-title",
                    documentation: "some info"
                },{
                    title: "title",
                    subTitle: "sub-title",
                    documentation: "some info"
                }
            ]
        }
    ]
    return(
        <div style={{padding:"40px"}}>
            <HelpAdminNav/>
            {helps.map((info, key)=>(
                <div className="flex" key={key}>
                    <div className="max-width">
                        <div style={{fontSize:"40px"}}>{info?.title}</div>
                        <div style={{fontSize:"25px"}}>{info?.subTitle}</div>
                        <div style={{fontSize:"18px"}}>{info?.documentation}</div>
                    </div>
                    <div className="max-width">
                        {info?.steps.map((info, key2)=>(
                            <div style={{}} key={key2}>
                                <div style={{fontSize:"40px"}}>{info?.title}</div>
                                <div style={{fontSize:"25px"}}>{info?.subTitle}</div>
                                <div style={{fontSize:"18px"}}>{info?.documentation}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}