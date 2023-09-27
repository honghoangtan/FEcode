import React from 'react';
import PropTypes from 'prop-types';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    // Chi nhan 1 children
    return React.Children.only(children);
}

GlobalStyles.protoTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
