import React from 'react';
import { UnAuthHeader } from '../../components/layouts/UnAuthHeader';
import { FaCheck } from 'react-icons/fa';
import { BENEFITS } from '../../contents/aboutus/aboutus';


export const Pricing = () =>{
    const prices = [
        {
            title: "FREE",
            cost: "0",
            offers: [
                {
                    title:"none",
                    available: true
                },{
                    title:"tow",
                    available: false
                },{
                    title:"three",
                    available: true
                }
            ]
        },{
            title: "BASIC",
            cost: "25",
            offers: [
                {
                    title:"none",
                    available: true
                },{
                    title:"tow",
                    available: false
                },{
                    title:"three",
                    available: true
                }
            ]
        },{
            title: "STANDARD",
            cost: "25",
            offers: [
                {
                    title:"none",
                    available: false
                },{
                    title:"tow",
                    available: false
                },{
                    title:"three",
                    available: true
                }
            ]
        },{
            title: "PREMIUM",
            cost: "25",
            offers: [
                {
                    title:"none",
                    available: false
                },{
                    title:"tow",
                    available: false
                },{
                    title:"three",
                    available: true
                }
            ]
        }
    ]
    return(
        <div className="single-page">
            <UnAuthHeader useRegister useLogin/>

            <div className="price-main-container d-flex-on-mobile">
                {prices.map((price, key)=>(
                    <div className="price-container" key={key}>
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
                        <div className="welcome-inner-card" style={{boxShadow:"2px 2px 5px black"}}>
                            <benefit.icon style={{fontSize:"180px",color:"orange"}} />
                            <div>{benefit.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}