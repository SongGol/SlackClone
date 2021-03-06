import useInput from '../../hooks/useInput';
import { Button, Error, Form, Input, Label, LinkContainer, Success, Header } from './styles';
import { registerUser } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';
//import fetcher from '../../utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import useSWR from 'swr';

const SignUp = () => {
    //const { data: userData } = useSWR('/api/users', fetcher);
    const [signUpError, setSignUpError ] = useState(false);
    const [signUpSuccess, setSignUpSuccess ] = useState(false);
    const [mismatchError, setMissmatchError ] = useState(false);
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, setPassword] = useInput('');
    const [confirmPassword, setConfirmPassword] = useInput('');

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const onChangePassword = useCallback(
        (e) => {
            setPassword(e);
            setMissmatchError(confirmPassword !== e.target.value);
        },
        [confirmPassword]
    );

    const onChangePasswordCheck = useCallback((e) => {
        setConfirmPassword(e);
        setMissmatchError(password !== e.target.value);
    }, [password]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!nickname || !nickname.trim()) {
            return;
        }
        if (mismatchError) {
            return;
        }

        setSignUpError(false);
        setSignUpSuccess(false);
        let body = {
            email: email,
            name: nickname,
            password: password,
            confirmPassword: confirmPassword,
        };
        
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    navigate('/login');
                } else {
                    alert('Failed to sign up');
                }
            });
    }, [email, nickname, password, confirmPassword]);

    // if (userData) {
    //     return <Navigate to='/workspace/sleact' />;
    // }

    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                <span>????????? ??????</span>
                <div>
                    <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                </div>
                </Label>
                <Label id="nickname-label">
                <span>?????????</span>
                <div>
                    <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
                </div>
                </Label>
                <Label id="password-label">
                <span>????????????</span>
                <div>
                    <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                </div>
                </Label>
                <Label id="password-check-label">
                <span>???????????? ??????</span>
                <div>
                    <Input
                    type="password"
                    id="password-check"
                    name="password-check"
                    value={confirmPassword}
                    onChange={onChangePasswordCheck}
                    />
                </div>
                {mismatchError && <Error>??????????????? ???????????? ????????????.</Error>}
                {!nickname && <Error>???????????? ??????????????????.</Error>}
                {signUpError && <Error>?????? ????????? ??????????????????.</Error>}
                {signUpSuccess && <Success>???????????????????????????! ?????????????????????.</Success>}
                </Label>
                <Button type="submit">????????????</Button>
            </Form>
            <LinkContainer>
                ?????? ???????????????????&nbsp;
                <a href="/login">????????? ????????????</a>
            </LinkContainer>
        </div>
    );
};

export default SignUp;