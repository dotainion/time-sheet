import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BENEFITS } from '../../contents/aboutus/aboutus';
import { adminWelcome } from '../../contents/Sentences';
import welcome from '../../images/welcome-poster.jpg';
import bgImge from '../../images/bg-img.jpg';
import { LoadingBar } from '../../components/widgets/LoadingBar';
import { Profile } from '../../components/other/Profile';
import { useStore } from '../../state/stateManagement/stateManagement';
import { useAuth } from '../../state/auth/Authentication';
import { routes } from '../../utils/routes/Routes';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


export const Welcome = () =>{
    const history = useHistory();

    const { user, isAuthenticated } = useAuth();
    const { onContinue } = useStore();

    const [benefits, setBenefits] = useState([]);

    const initBenefits = () =>{
        let index = 0;
        let temp = [];
        let cupleUp = [];
        for (let card of BENEFITS){
            index ++;
            temp.push(card);
            if (index === 3){
                index = 0;
                cupleUp.push(temp);
                temp = [];
            }
        }
        if (temp.length) cupleUp.push(temp);
        setBenefits(cupleUp);
    }

    useEffect(()=>{
        initBenefits();
    }, []);

    return (
        <div className="landing-page">
            <div className="landing">
                <div className="flex float-top-right" style={{marginRight:"50px"}}>
                    <div hidden={isAuthenticated?false:true} onClick={onContinue}>
                        <div className="flex" style={{color:"white"}}>
                            <Profile
                                floatLeft 
                                image={user?.image}
                                firstName={user?.firstName} 
                                lastName={user?.lastName}
                                role={user?.role}
                                info="Go home"
                                style={{cursor:"pointer"}}
                            />
                            <div className="landing-nav">Home</div>
                        </div>
                    </div>
                    <div onClick={()=>{}} className="landing-nav">About us</div>
                    <div onClick={()=>history.push(routes.signIn)} hidden={isAuthenticated?true:false} className="landing-nav">Login</div>
                </div> 

                <div className="float-top-center header-huge" style={{marginTop:"50px",textAlign:"center",color:"white"}}>{adminWelcome.toUpperCase()}</div>
                
                <div className="float-top-center" style={{top:"55%",width:"100%"}}>
                    <div className="slide-container">
                        <Slide>
                            {benefits.map((benefits, key)=>(
                                <div className="each-slide" style={{textAlign:"center"}}>
                                    {benefits?.map((benefit)=>(
                                    <div className="welcome-card" key={key}>
                                        <div className="welcome-inner-card" style={{boxShadow:"none",cursor:"pointer"}}>
                                            <benefit.icon className="float-top-left" style={{fontSize:"80px",color:"orange"}} />
                                            <div className="float-bottom-left" style={{backgroundColor:"rgb(0,0,0,0.50)"}}>{benefit.title}</div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            ))}
                        </Slide>
                    </div>
                </div>
            </div>
        </div>
    )
}