import { PromiseProvider } from 'mongoose';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '../SignUpPage/styles';
//import fetcher from '../../utils/fetcher';
//import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
//import useSWR from 'swr';

const LoginPage = () => {
    //const { data: userData, error, revalidate } = useSWR('/api/users', fetcher);
    const [loginError, setLoginError] = useState(false);
    const [email, setEmail, ] = useInput('');
    const [password, setPassword, ] = useInput('');

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setLoginError(false);

            let body = {
                email: email,
                password: password,
            };
            
            dispatch(loginUser(body))
                .then(response => {
                    if (response.payload.loginSuccess) {
                        navigate('/workspace/channel');
                    } else {
                        alert('Error');
                    }
                });
        }, [email, password],
    );

    // console.log(error, userData);
    // if (!error && userData) {
    //     console.log('로그인 됨', userData);
    //     return <Navigate to='/workspace/sleact/channel/일반' />;
    // }

    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email" id="email" value={email} onChange={setEmail} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={setPassword} />
                    </div>
                    {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
                </Label>
                <Button type="submit">로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
        </div>
    );
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // let navigate = useNavigate();
    // const dispatch = useDispatch();

    // const onEmailHandler = (event) => {
    //     setEmail(event.currentTarget.value);
    // };

    // const onPasswordHandler = (event) => {
    //     setPassword(event.currentTarget.value);
    // };

    // const onSubmitHandler = (event) => {
    //     event.preventDefault(); //설정을 안하면 화면이 refresh

    //     let body = {
    //         email: email,
    //         password: password,
    //     };

    //     dispatch(loginUser(body))
    //         .then(response => {
    //             if (response.payload.loginSuccess) {
    //                 navigate('/');
    //             } else {
    //                 alert('Error');
    //             }
    //         })

        
    // };

    // return (
    //     <>
    //         <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh'}}>
    //             <form style={{display: 'flex', flexDirection: 'column'}}
    //                 onSubmit={onSubmitHandler}>
    //                 <label>Email</label>
    //                 <input type="email" value={email} onChange={onEmailHandler}/>
    //                 <label>Password</label>
    //                 <input type="password" value={password} onChange={onPasswordHandler}/>
    //                 <br />
    //                 <button type="submit">Login</button>
    //             </form>
    //         </div>
    //     </>
    // )
};

export default LoginPage;