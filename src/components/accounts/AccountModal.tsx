import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AccountIcons } from './accountIcons';
import { HexColorPicker } from 'react-colorful';
import { useAccountMutations } from '../../hooks/useAccountMutations';
import { Account } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import '../categories/CategoryModal.css';

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    account?: Account;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, account }) => {
    const { createAccount, updateAccount } = useAccountMutations();
    const isEditing = !!account;

    const [name, setName] = useState('');
    const [balance, setBalance] = useState('0');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [accountType, setAccountType] = useState('');
    const [color, setColor] = useState('#fff300');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [sumsToBudget, setSumsToBudget] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (account) {
                // Populate form with existing account data
                setName(account.name || '');
                setBalance(account.currentBalance.toString());
                setSelectedIcon(account.image || '');
                setAccountType(account.accountType?.name || '');
                setColor(account.color || '#fff300');
                setSumsToBudget(account.sumsToMonthlyBudget || false);
            } else {
                // Reset form for new account
                setName('');
                setBalance('0');
                setSelectedIcon('');
                setAccountType('');
                setColor('#fff300');
                setSumsToBudget(false);
            }
            setShowColorPicker(false);
        }
    }, [isOpen, account]);

    const handleSubmit = async () => {
        try {
            const accountData = {
                name,
                currentBalance: parseFloat(balance),
                accountType: { name: accountType },
                color,
                isArchived: false,
                image: selectedIcon,
                sumsToMonthlyBudget: sumsToBudget
            };

            if (isEditing && account?.id) {
                await updateAccount.mutateAsync({
                    id: account.id,
                    ...accountData
                });
            } else {
                await createAccount.mutateAsync(accountData);
            }
            onClose();
        } catch (error) {
            console.error('Failed to save account:', error);
        }
    };

    const isValid = name.trim().length > 0 &&
        selectedIcon.length > 0 &&
        accountType.trim().length > 0 &&
        !isNaN(parseFloat(balance));
    const isSaving = createAccount.isPending || updateAccount.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? 'Editar cuenta' : 'Nueva cuenta'}
        >
            <div className="category-modal__form">
                {/* Name */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Nombre</label>
                    <input
                        className="category-modal__input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre de la cuenta"
                        autoFocus
                    />
                </div>

                {/* Balance */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Balance actual</label>
                    <input
                        className="category-modal__input"
                        type="number"
                        step="0.01"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        placeholder="0.00"
                    />
                </div>

                {/* Icon */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Ícono</label>
                    <div className="category-modal__icons-grid">
                        {AccountIcons.map((icon) => (
                            <div
                                key={icon}
                                className={`category-modal__icon-option ${selectedIcon === icon ? 'selected' : ''}`}
                                onClick={() => setSelectedIcon(icon)}
                            >
                                <FontAwesomeIcon icon={['fas', icon as IconName]} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Type */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Tipo de cuenta</label>
                    <input
                        className="category-modal__input"
                        type="text"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        placeholder="Corriente, Ahorros, Efectivo..."
                    />
                </div>

                {/* Color */}
                <div className="category-modal__field">
                    <label className="category-modal__label">Color</label>
                    <div className="category-modal__color-section">
                        <div className="category-modal__color-picker-wrapper">
                            <div
                                className="category-modal__color-preview"
                                style={{ backgroundColor: color }}
                                onClick={() => setShowColorPicker(!showColorPicker)}
                            >
                                {color}
                            </div>
                            {showColorPicker && (
                                <div className="category-modal__color-popover">
                                    <div
                                        className="category-modal__color-cover"
                                        onClick={() => setShowColorPicker(false)}
                                    />
                                    <HexColorPicker color={color} onChange={setColor} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sums to Budget Toggle */}
                <div className="category-modal__field">
                    <label
                        className="category-modal__label"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSumsToBudget(!sumsToBudget)}
                    >
                        <input
                            type="checkbox"
                            checked={sumsToBudget}
                            onChange={(e) => setSumsToBudget(e.target.checked)}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        Se suma al presupuesto
                    </label>
                </div>

                <div className="category-modal__actions">
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        CANCELAR
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!isValid || isSaving}
                    >
                        {isSaving ? 'GUARDANDO...' : 'GUARDAR'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
