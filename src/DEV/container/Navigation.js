import React from 'react';
import { useHistory } from 'react-router';
import { routes } from '../../utils/routes/Routes';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';


const data = [
    {
        title: "some titmek",
        icon: BsFillGrid3X3GapFill,
        route: "#"
    }
];
export const Navigation = ({menu, children}) =>{
    const history = useHistory();
    return(
        <div>
            <div className="relative">
                <div>hello world</div>
                <BsFillGrid3X3GapFill className="float-center spin" style={{fontSize:"30px"}} />
            </div>
            {
                data?.map((option, key)=>(
                    <div onClick={()=>history.push(option?.route)} key={key}>
                        <div>{option?.title}</div>
                        <div>{option?.icon}</div>
                    </div>
                ))
            }
            {children}
        </div>
    )
}