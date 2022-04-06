import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles';
import gravartar from 'gravatar';

const WorkSpace = () => {
    let navigate = useNavigate();

    const onLogoutHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                console.log(response.data)
                if (response.data.success) {
                    navigate('/login');
                } else {
                    alert('로그아웃을 실패 했습니다.');
                }
            })
    }

    return (
        <>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravartar.url("test", { s: "28px", d: "retro"})} alt="nickname" />
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogoutHandler}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>
                    test
                </Workspaces>
                <Channels>
                    <WorkspaceName>
                        Sleact
                    </WorkspaceName>
                    <MenuScroll>
                        menu scroll
                    </MenuScroll>
                </Channels>
                <Chats>
                    chat
                </Chats>
            </WorkspaceWrapper>
        </>
    );
};

export default WorkSpace;