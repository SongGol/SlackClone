import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Route, Router, useNavigate } from 'react-router-dom';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles';
import Menu from '../../memu'
import gravartar from 'gravatar';

const WorkSpace = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);

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

    //토글 함수
    const onClickUserProfile = useCallback((e) => {
        setShowUserMenu((prev) => !prev);
    }, []);

    return (
        <>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravartar.url("test", { s: "28px", d: "retro"})} alt="nickname" />
                        {showUserMenu && <Menu>프로필 메뉴</Menu>}
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
                    {/* <Router>
                        <Routes>
                            <Route path="/workspace/channel" element={Auth(Channel, true)}>
                            </Route>
                            <Route path="/workspace/dm" element={Auth(DirectMessasge, true)}>
                            </Route>
                        </Routes>
                    </Router> */}
                </Chats>
            </WorkspaceWrapper>
        </>
    );
};

export default WorkSpace;