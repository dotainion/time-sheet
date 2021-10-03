import React from 'react';
import { useHistory } from 'react-router';
import { HelpAdminNav } from './HelpAdminNav';
import { FaHandsHelping } from 'react-icons/fa';


export const Help = () =>{
    const history = useHistory();

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
        <div style={{padding:"0px"}}>
            <HelpAdminNav/>
            {helps.map((info, key)=>(
                <div className="flex" key={key}>
                    <div className="max-width" style={{paddingLeft:"40px"}}>
                        <div style={{fontSize:"40px"}}>{info?.title}</div>
                        <div style={{fontSize:"25px"}}>{info?.subTitle}</div>
                        <div style={{fontSize:"18px"}}>{info?.documentation}</div>
                    </div>
                    <div className="max-width" style={{paddingRight:"40px"}}>
                        {info?.steps.map((info, key2)=>(
                            <div key={key2}>
                                <div style={{fontSize:"40px"}}>{info?.title}</div>
                                <div style={{fontSize:"25px"}}>{info?.subTitle}</div>
                                <div style={{fontSize:"18px"}}>{info?.documentation}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="float-center max-size no-select" style={{backgroundColor:"var(--bg)"}}>
                <div className="max-size relative">
                    <div className="float-center" style={{textAlign:"center",fontSize:"25px"}}>
                        <div style={{fontSize:"100px"}}>
                            <FaHandsHelping/>
                        </div>
                        <p style={{fontSize:"40px"}}>COMING SOON!!!</p>
                        <label onClick={()=>history.goBack()} className="label-hover"><b>Take me back</b></label>
                    </div>
                </div>
            </div>
        </div>
    )
}