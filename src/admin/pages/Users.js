import React, { useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { ContentsWrapper } from '../../container/ContentsWrapper';
import { AsignTimeSheet } from './AsignTimeSheet';
import { AiOutlineFieldTime } from 'react-icons/ai';


export const Users = ({isOpen, members}) =>{
    const [asignTimeSheet, setAsignTimeSheet] = useState({state: false, data: null});
    const [memberSelected, setMemberSelected] = useState({});

    const userSelected = (data) =>{
        setMemberSelected(data);
        setAsignTimeSheet({state:true, data});
    }
    return (
        <>
        <ContentsWrapper isOpen={isOpen}>
            {
                members?.length?
                members?.map((user, key)=>(
                    <div className="flex content-container" key={key}>
                        <IoPersonCircleOutline className="float-center log-icon" />
                        <div>
                            <div><b>{`${user?.info?.firstName} ${user?.info?.lastName}`}</b></div>
                            <div>{user?.info?.email}</div>
                            <div>Role: {user?.info?.role}</div>
                        </div>
                        <AiOutlineFieldTime
                            className="float-right time-icon"
                            onClick={()=>userSelected(user)}
                        />
                    </div>
                )):
                <div>No Users</div>
            }
        </ContentsWrapper>
        <AsignTimeSheet
            members={members}
            memberSelected={memberSelected}
            isOpen={asignTimeSheet.state}
            onClose={()=>setAsignTimeSheet({state:false,data:null})}
        />
        </>
    )
}