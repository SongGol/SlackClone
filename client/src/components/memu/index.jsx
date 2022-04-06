import { CreateMenu, CloseModalButton } from './styles';
import React, { useCallback } from 'react';

const Menu = ({ children, style, show, onCloseModal, closeButton }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CreateMenu onClick={onCloseModal}>
        <div style={style} onClick={stopPropagation}>
          메뉴
          {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
          { children }
          </div>
    </CreateMenu>
  );
};
Menu.defaultProps = {
  closeButton: true,
};

export default Menu;