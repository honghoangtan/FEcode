import React from 'react';

import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Form, Input } from 'antd';

import styled from 'styled-components';

import Message from './Message';
import { useContext } from 'react';

import AppContext from 'antd/es/app/context';

const WrapperStyled = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65.6px;
    padding: 0 16px;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &__title {
            margin: 0;
            font-weight: bold;
        }
        &__description {
            font-size: 12px;
        }
    }
`;

const ButtonGrouptStyled = styled.div`
    display: flex;
    align-items: center;
`;

const ContentStyled = styled.div`
    height: calc(100% - 65.6px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;

function ChatWindow() {
    const { rooms, selectedRoomId } = useContext(AppContext);

    const selectedRoom = React.useMemo(() => rooms.find((room) => room.id === selectedRoomId), [rooms, selectedRoomId]);

    console.log(selectedRoom);

    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header__info">
                    <p className="header__title">{selectedRoom.name}</p>
                    <span className="header__description">{selectedRoom.description}</span>
                </div>

                <ButtonGrouptStyled>
                    <Button icon={<UserAddOutlined />} type="text">
                        Moi
                    </Button>

                    <Avatar.Group size="small" maxCount={2}>
                        <Tooltip title="A">
                            <Avatar>A</Avatar>
                        </Tooltip>

                        <Tooltip title="B">
                            <Avatar>B</Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </ButtonGrouptStyled>
            </HeaderStyled>

            <ContentStyled>
                <MessageListStyled>
                    <Message text="Test" displayName="Test ten" createAt={123} photoURL={null} />
                    <Message text="Test" displayName="Test ten" createAt={123} photoURL={null} />
                    <Message text="Test" displayName="Test ten" createAt={123} photoURL={null} />
                    <Message text="Test" displayName="Test ten" createAt={123} photoURL={null} />
                </MessageListStyled>

                <FormStyled>
                    <Form.Item>
                        <Input placeholder="Nhap tin nhan" bordered={false} autoComplete="off" />
                    </Form.Item>
                    <Button type="primary">Gui</Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
    );
}

export default ChatWindow;
