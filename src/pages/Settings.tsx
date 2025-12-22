import React from 'react';

export const Settings: React.FC = () => {
    return (
        <div className="settings-page" style={{ padding: 'var(--space-xl)' }}>
            <h1 className="settings-page__title" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-xl)' }}>
                Configuración
            </h1>
            <div className="settings-page__content" style={{ color: 'var(--text-secondary)' }}>
                <p>Las opciones de configuración estarán disponibles próximamente.</p>
            </div>
        </div>
    );
};
