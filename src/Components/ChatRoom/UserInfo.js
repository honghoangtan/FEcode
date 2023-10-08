import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';

import { auth, db } from '~/Firebase/Config';

import React, { useEffect, useState } from 'react';
import { AuthContext } from '~/Context/AuthProvider';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

    .username {
        color: white;
        margin-left: 5px;
    }
`;

function UserInfo() {
    // Day la Side Effect
    // useEffect(() => {
    //     db.collection('users').onSnapshot((snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({
    //             ...doc.data,
    //             id: doc.id,
    //         }));
    //     });
    // }, []);

    const {
        user: { displayName, photoURL },
    } = React.useContext(AuthContext);

    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>
                Dang xuat
            </Button>
        </WrapperStyled>
    );
}

export default UserInfo;
