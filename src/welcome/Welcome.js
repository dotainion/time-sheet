import React from 'react';
import { BENEFITS } from '../contents/aboutus/aboutus';
import { adminWelcome } from '../contents/Sentences';
import welcome from '../images/welcome-poster.jpg';
import { secure } from '../security/Security';
import { tools } from '../tools/Tools';
import { LoadingBar } from '../widgets/LoadingBar';
import { Profile } from '../widgets/Profile';

export const Welcome = () =>{
    return (
        <div className="no-select">
            <div className="profile-bg-image">
                <Profile/>
                <img hidden className="centered" src={welcome} alt="" draggable={false} />
            </div>

            <div className="header-huge" style={{marginTop:"200px",textAlign:"center",color:"gray"}}>{adminWelcome}</div>

            <LoadingBar/>
            
            <div className="welcome-card-container">
                {BENEFITS.map((benefit, key)=>(
                    <div className="welcome-card" key={key}>
                        <div className="welcome-inner-card">
                            <benefit.icon style={{fontSize:"180px",color:"orange"}} />
                            <div>{benefit.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}