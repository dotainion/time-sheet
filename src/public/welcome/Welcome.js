import React from 'react';
import { BENEFITS } from '../../contents/aboutus/aboutus';
import { adminWelcome } from '../../contents/Sentences';
import welcome from '../../images/welcome-poster.jpg';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { Profile } from '../../components/other/Profile';
import { useStore } from '../../state/stateManagement/stateManagement';
import { useAuth } from '../../state/auth/Authentication';


export const Welcome = () =>{
    const { user } = useAuth();
    const { onContinue } = useStore();
    return (
        <div className="no-select">
            <div className="profile-bg-image">
                <img className="centered" src={welcome} alt="" draggable={false} />
                <div className="float-top-right" style={{top:"10px",right:"40px"}}>
                    <Profile
                        floatLeft 
                        image={user?.image}
                        firstName={user?.firstName} 
                        lastName={user?.lastName}
                        role={user?.role}
                    />
                    <button 
                        className="btn btn-hover creds-btn" 
                        style={{marginTop:"20px"}}
                        onClick={onContinue}
                    >Go to profile</button>
                </div>
            </div>

            <div className="header-huge" style={{marginTop:"50px",textAlign:"center",color:"gray"}}>{adminWelcome}</div>

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