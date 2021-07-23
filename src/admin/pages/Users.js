import React, { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AdminPageWrapper } from '../../container/AdminPageWrapper';

export const Users = ({isOpen, members}) =>{

    return (
        <AdminPageWrapper isOpen={isOpen}>
            {
                members?.length?
                members?.map((user, key)=>(
                    <div className="flex admin-page-sub-container" key={key}>
                        <IoPersonCircleOutline className="float-center log-icon" />
                        <div>
                            <div>{`${user?.info?.firstName} ${user?.info?.lastName}`}</div>
                            <div>{user?.info?.email}</div>
                            <div>{user?.info?.role}</div>
                        </div>
                    </div>
                )):
                <div>No Users</div>
            }
        </AdminPageWrapper>
    )
}