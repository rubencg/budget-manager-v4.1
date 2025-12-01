import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import calculatorIcon from '../assets/images/calculator.png';
import './Login.css';

export const Login: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login-page">
            {/* Background decoration */}
            <div className="login-page__blob login-page__blob--top" />
            <div className="login-page__blob login-page__blob--bottom" />

            <div className="login-card">
                <div className="login-card__logo-container">
                    <img src={calculatorIcon} alt="Tiki Budget Manager" className="login-card__logo" />
                </div>

                <h1 className="login-card__title">
                    Tiki Budget Manager
                </h1>

                <p className="login-card__subtitle">
                    Gestiona tus finanzas de manera inteligente
                </p>

                <button
                    onClick={() => loginWithRedirect()}
                    className="login-card__button"
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};
