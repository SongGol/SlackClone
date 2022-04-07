import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Link, Route, Router, useNavigate } from 'react-router-dom';
import { AddButton, Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceButton, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles';
import Menu from '../../memu'
import Modal from '../../modal'
import gravartar from 'gravatar';
import fetcher from '../../../utils/fetcher'
import { Button, Input, Label } from '../../views/SignUpPage/styles';
import useInput from '../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { getWorkspace } from '../../../_actions/user_action';
//import useSWR from 'swr';

const WorkSpace = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
    const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
    const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');
    //const { data: userData  } = useSWR('/api/users', fetcher);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    let userData;

    // dispatch(getWorkspace())
    //     .then(response => {
    //         if (response.payload.success) {
    //             console.log(response.payload.workspace);
    //             userData = response.payload.workspace;
    //         } else {
    //             alert('Failed to sign up');
    //         }
    //     });

    axios.get('/api/users/workspace')
            .then(response => {
            if (response.data.success === true) {
                console.log(response.data.workspace);
                userData = JSON.parse(JSON.stringify(response.data.workspace));
            } else {
                alert('Failed to sign up');
            }
        });

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
        e.stopPropagation();
        setShowUserMenu((prev) => !prev);
    }, []);

    const onClickCreateWorkspace = useCallback(() => {
        setShowCreateWorkspaceModal(true);
    });

    const onCreateWorkspace = useCallback((e) => {
        e.preventDefault();
        if (!newWorkspace || !newWorkspace.trim()) return;
        if (!newUrl || !newUrl.trim()) return;
        axios.post('/api/workspaces', {
            workspace: newWorkspace,
            url: newUrl,
        }).then(() => {
            setShowCreateWorkspaceModal(false);
            setNewWorkspace('');
            setNewUrl('');
        }).catch((err) => {
            console.dir(err);
        })
    }, []);

    const onCloseModal = useCallback(() => {

    }, []);

    // if (userData === undefined) {
    //     navigate('/login');
    //     return;
    // }

    return (
        <>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravartar.url("test", { s: "28px", d: "retro"})} alt={"nickname"} />
                        {showUserMenu &&
                            <Menu style={{right: 0, top:38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <ProfileModal>
                                    <img scr={gravartar.url("test", {s:"36px", d:"radio"})} alt={"nickname"} />
                                    <div>
                                        <span id="profile-name">nickname</span>
                                        <span id="profile-active">active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogoutHandler}>로그아웃</LogOutButton>
                            </Menu>}
                    </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>
                    {userData?.workspace.map((ws) => {
                        console.log("map" + ws)
                        return (
                            <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                                <WorkspaceButton>{ws.name.slice(0,1).toUpperCase()}</WorkspaceButton>
                            </Link>
                        );
                    })}
                    <AddButton onClick={onClickCreateWorkspace}></AddButton>
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
            <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
                <form onSubmit={onCreateWorkspace}>
                    <Label id='workspace-label'>
                        <span>워크스페이스 이름</span>
                        <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace}></Input>
                    </Label>
                    <Label id='workspace-url-label'>
                        <span>워크스페이스 url</span>
                        <Input id="workspace" value={newUrl} onChange={onChangeNewUrl}></Input>
                    </Label>
                    <Button type="submit">생성하기</Button>
                </form>
            </Modal>
        </>
    );
};

export default WorkSpace;