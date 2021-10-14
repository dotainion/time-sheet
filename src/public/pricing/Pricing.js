import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { BENEFITS } from '../../contents/aboutus/aboutus';
import { TiArrowBack } from 'react-icons/ti';
import { WidgetsInfo } from '../../components/widgets/WidgetsInfo';
import { useHistory } from 'react-router';


export const Pricing = () =>{
    const history = useHistory();

    const style = {
        color: "white",
        backgroundImage: "none",
        boxShadow: "2px 2px 5px black",
        backgroundColor:"rgb(0,0,0,0.50)"
    }
    const prices = [
        {
            title: "FREE",
            cost: "0",
            offers: [
                {
                    title:"Unlimited users",
                    available: false
                },{
                    title:"Multiple administrators",
                    available: true
                },{
                    title:"Export data",
                    available: false
                },{
                    title:"In app messaging",
                    available: true
                },{
                    title:"Clock In/Out",
                    available: true
                },{
                    title:"Asing schedules",
                    available: false
                }
            ]
        },{
            title: "BASIC",
            cost: "10",
            offers: [
                {
                    title:"Unlimited users",
                    available: true
                },{
                    title:"Multiple administrators",
                    available: true
                },{
                    title:"Export data",
                    available: false
                },{
                    title:"In app messaging",
                    available: true
                },{
                    title:"Clock In/Out",
                    available: true
                },{
                    title:"Asing schedules",
                    available: false
                }
            ]
        },{
            title: "STANDARD",
            cost: "20",
            offers: [
                {
                    title:"Unlimited users",
                    available: true
                },{
                    title:"Multiple administrators",
                    available: true
                },{
                    title:"Export data",
                    available: true
                },{
                    title:"In app messaging",
                    available: true
                },{
                    title:"Clock In/Out",
                    available: true
                },{
                    title:"Asing schedules",
                    available: false
                }
            ]
        },{
            title: "PREMIUM",
            cost: "40",
            offers: [
                {
                    title:"Unlimited users",
                    available: true
                },{
                    title:"Multiple administrators",
                    available: true
                },{
                    title:"Export data",
                    available: true
                },{
                    title:"In app messaging",
                    available: true
                },{
                    title:"Clock In/Out",
                    available: true
                },{
                    title:"Asing schedules",
                    available: true
                }
            ]
        }
    ]
    return(
        <div className="pricing-page" style={{backgroundColor:"white"}}>
            <div className="float-top-left grid-single-white">
                <WidgetsInfo info="Back">
                    <TiArrowBack onClick={()=>history.goBack()} style={{fontSize:"40px"}} />
                </WidgetsInfo>
            </div>
            <div className="header-huge" style={{marginTop:"20px",textAlign:"center",color:"white"}}>
                <div>TIME SHEET APPLICATION</div>
                <div>PRICING</div>
            </div>
            <div className="price-main-container d-flex-on-mobile">
                {prices.map((price, key)=>(
                    <div className="price-container" style={{...style}} key={key}>
                        <div className="price-title">{price.title}</div>
                        <div className="price-sub-container">
                            <div className="price-cost">
                                <div>${price.cost}</div>
                                <div style={{fontSize:"20px"}}>PER MONTH</div>
                            </div>
                            {price?.offers?.map((offer, key)=>(
                                <div className="price-offers" key={key}>
                                    <div style={{width:"30px"}}>
                                        <FaCheck style={{color:"green",display:!offer?.available && "none"}} />
                                        <label hidden={offer?.available} style={{color:"red"}}><b>X</b></label>
                                    </div>
                                    <div style={{marginLeft:"5px"}}>{offer?.title}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{textAlign:"center",visibility:price.title === "FREE" && "hidden"}}>
                            <div className="centered price-button">GET STARTED</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="welcome-card-container">
                {BENEFITS.map((benefit, key)=>(
                    <div className="welcome-card" key={key}>
                        <div className="welcome-inner-card" style={{...style}}>
                            <benefit.icon style={{fontSize:"180px",color:"orange"}} />
                            <div>{benefit.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}