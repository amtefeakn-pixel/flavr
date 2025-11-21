import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    // Base class is .btn from index.css
    // We can add variant-specific classes if needed, but for now we rely on the global .btn
    // If we had secondary buttons, we'd add logic here.

    return (
        <button
            className={`btn ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.string,
    className: PropTypes.string,
};

export default Button;
