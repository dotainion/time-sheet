import React from 'react';
import { adminWelcome } from '../../contents/Sentences';
import { useStore } from '../../state/stateManagement/stateManagement';
import { GiDeskLamp } from 'react-icons/gi';


export const Page404 = () =>{
    const { onContinue } = useStore();

    return (
        <div className="no-select" style={{height:"100vh",color:"white",backgroundColor:"rgb(0,0,0,0.95)"}}>
            <div className="float-center" style={{textAlign:"center"}}> 
                <div style={{fontSize:"30px",backgroundColor:"white",color:"black"}}>{adminWelcome.toUpperCase().replace(".","")}</div>
                
                <div style={{marginTop:"10px",fontSize:"30px",backgroundColor:"black",border:"4px solid white"}}>Opps.. page not found</div>
                <div style={{fontSize:"80px"}}>404</div>
                
                <GiDeskLamp style={{fontSize:"100px"}}/>
                <div onClick={onContinue} className="label-hover" style={{marginTop:"40px",color:"orange"}}>GO HOME</div>
            </div>
        </div>
    )
}