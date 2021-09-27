import React from 'react';
import logo from '../../../images/logo.png';


export const LandingContent = ({landingRef}) =>{
    return(
        <div ref={landingRef} className="float-center max-size">
            <div className="flex float-center" style={{minWidth:"800px"}}>
                <div className="max-size pad">
                    <div>OUR SERVICES</div>
                    <div style={{color:"gray"}} className="header"><b>Content Strategy</b></div>
                    <p>
                        Content is a powerfule tool for scalling your business and fast. But without a long-term plan, even the greatest content in the world won't be enough. With content strategy services from us, you get the best of both worlds.
                    </p>
                </div>
                <div className="max-size pad">
                    <img draggable={false} src={logo} style={{width:"200px", height:"200px"}} alt="" />
                </div>
            </div>
        </div>
    )
}