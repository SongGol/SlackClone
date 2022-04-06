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
                <span>이메일 주소</span>
                <div>
                    <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                </div>
                </Label>
                <Label id="nickname-label">
                <span>닉네임</span>
                <div>
                    <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
                </div>
                </Label>
                <Label id="password-label">
                <span>비밀번호</span>
                <div>
                    <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                </div>
                </Label>
                <Label id="password-check-label">
                <span>비밀번호 확인</span>
                <div>
                    <Input
                    type="password"
                    id="password-check"
                    name="password-check"
                    value={confirmPassword}
                    onChange={onChangePasswordCheck}
                    />
                </div>
                {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
                {!nickname && <Error>닉네임을 입력해주세요.</Error>}
                {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
                {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
                </Label>
                <Button type="submit">회원가입</Button>
            </Form>
            <LinkContainer>
                이미 회원이신가요?&nbsp;
                <a href="/login">로그인 하러가기</a>
            </LinkContainer>
        </div>
    );
};

export default SignUp;