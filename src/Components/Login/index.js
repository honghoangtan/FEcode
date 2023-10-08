import React from 'react';
import { Row, Col, Button } from 'antd';

import firebase, { auth } from '~/Firebase/Config';
import { addDocument } from '~/Firebase/Service';

const fbProvider = new firebase.auth.FacebookAuthProvider();

const ggProvider = new firebase.auth.GoogleAuthProvider();

function Login() {
    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
        console.log(user);

        if (additionalUserInfo?.isNewUser) {
            addDocument('user', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerID: additionalUserInfo.providerId,
            });
        }
    };

    const handleGgLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('user', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerID: additionalUserInfo.providerId,
            });
        }
    };

    return (
        <div>
            <Row justify="center" style={{ height: 800 }}>
                <Col span={8}>
                    <p style={{ textAlign: 'center' }} level={3}>
                        Fun Chat
                    </p>
                    <Button style={{ width: '100%', marginBottom: 5 }} onClick={handleGgLogin}>
                        Dang nhap bang Google
                    </Button>
                    <Button style={{ width: '100%', marginBottom: 5 }} onClick={handleFbLogin}>
                        Dang nhap bang Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
