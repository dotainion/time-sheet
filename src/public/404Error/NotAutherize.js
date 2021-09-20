import React from 'react';
import { useHistory } from 'react-router-dom';
import { adminWelcome } from '../../contents/Sentences';
import { useStore } from '../../state/stateManagement/stateManagement';


export const NotAutherize = () =>{
    const { onContinue } = useStore();

    return (
        <div className="no-select" style={{width:"100%",height:"100vh",color:"white",backgroundColor:"rgb(0,0,0,0.95)"}}>
            <div className="float-center " style={{fontSize:"25px",textAlign:"center",fontWeight:"bold"}}>
                <div style={{color:"black",backgroundColor:"white",marginBottom:"10px"}}>{adminWelcome.toUpperCase().replace(".","")}</div>
                <div style={{border:"3px solid white"}}>
                    <div style={{color:"black",backgroundColor:"white"}}>YOU ARE NOT AUTHORIZED</div>
                    <div>TO ACCESS THIS PAGE</div>
                </div>
                <div onClick={onContinue} className="label-hover" style={{fontSize:"15px",color:"orange",marginTop:"20px"}}>GO HOME</div>
            </div>
        </div>
    )
}