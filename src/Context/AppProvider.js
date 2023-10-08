import AppContext from 'antd/es/app/context';
import React, { useState } from 'react';

import { AuthContext } from '~/Context/AuthProvider';
import useFirestore from '~/hook/useFireStore';

function AppProvider({ children }) {
    const [isAddRoomVesible, setisAddRoomVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const {
        user: { uid },
    } = React.useContext(AuthContext);

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);

    const rooms = useFirestore('rooms', roomsCondition);

    return (
        <AppContext.Provider
            value={{ rooms, isAddRoomVesible, setisAddRoomVisible, selectedRoomId, setSelectedRoomId }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
