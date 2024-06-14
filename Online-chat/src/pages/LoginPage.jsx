import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authorize } from '../hoc/Requests';

const LoginPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const fromLink = location.state?.from?.pathname || "/"

    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMsg('');
    }, [username, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        authorize(username, password).then(res => {
            localStorage.setItem('jwt', res.data);
            localStorage.setItem('username', username)
            navigate(fromLink, {replace: true});
        }).catch(err => {
            localStorage.setItem('jwt', null);
            localStorage.setItem('username', null)
            if (err.response.status === 400) {
                setErrorMsg("Недействительный запрос");
            } else if (err.response.status === 401) {
                setErrorMsg("Такого пользователя нет");
            }
        });
    }

    return (
        <section>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Имя:
                    <FontAwesomeIcon icon={faCheck} className={username ? "valid" : "hide"} />
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password">
                    Пароль:
                    <FontAwesomeIcon icon={faCheck} className={password ? "valid" : "hide"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <button disabled={username && password ? false : true}>Войти</button>
            </form>

            <p ref={errorRef} className={errorMsg ? "errormsg" : "offscreen"} aria-live="assertive">
                {errorMsg}
                <FontAwesomeIcon icon={faTimes} className={"invalid"} />
            </p>

            <p>
                Еще нет аккаунта?<br />
                <span className="line">
                    <Link to="/register">Зарегистрироваться</Link>
                </span>
            </p>
        </section>
    )
}

export {LoginPage}