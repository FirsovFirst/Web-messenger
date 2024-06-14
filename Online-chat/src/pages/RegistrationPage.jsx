import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { register } from '../hoc/Requests';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,24}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegistrationPage = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMsg('');
    }, [username, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(username);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMsg("Недействительный ввод");
            return;
        }

        register(username, password).then(res => {
            localStorage.setItem('jwt', res.data);
            setSuccess(true);
            setUsername('');
            setPassword('');
            setMatchPassword('');
        }).catch(err => {
            if (err.response.status === 400) {
                setErrorMsg("Недействительный запрос");
            } else if (err.response.status === 409) {
                setErrorMsg("Такое имя уже существует");
            }
        });
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Успех регистрации!</h1>
                    <p>
                        <Link to="/login">Вход</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <h1>Регистрация</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Имя:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            От 3 до 24 символов.<br />
                            Имя должно начинаться с буквы.<br />
                            Латинские буквы, цифры, подчеркивания, тире разрешены.
                        </p>

                        <label htmlFor="password">
                            Пароль:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            От 8 до 24 символов.<br />
                            Пароль должен содержать заглавные и строчные буквы, число и знак.<br />
                            Разрешенные знаки: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_password">
                            Повторение пароля:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Пароли должны совпадать.
                        </p>

                        <button disabled={validName && validPassword && validMatch ? false : true}>Зарегистрироваться</button>
                    </form>
                    
                    <p ref={errorRef} className={errorMsg ? "errormsg" : "offscreen"} aria-live="assertive">
                        {errorMsg}
                        <FontAwesomeIcon icon={faTimes} className={"invalid"} />
                    </p>

                    <p>
                        Уже есть аккаунт?<br />
                        <span className="line">
                            <Link to="/login">Войти</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export {RegistrationPage}