import React from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AdminPageWrapper } from '../../container/AdminPageWrapper';

export const Users = ({isOpen, members}) =>{

    return (
        <AdminPageWrapper isOpen={isOpen}>
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
                    </div>
                )):
                <div>No Users</div>
            }
        </AdminPageWrapper>
    )
}