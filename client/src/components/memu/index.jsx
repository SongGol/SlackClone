import { CreateMenu, CloseModalButton } from './styles';
import React, { useCallback } from 'react';

const Menu = ({ children }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // if (!show) {
  //   return null;
  // }
  return (
    <CreateMenu>
        <div>메뉴</div>
        { children }
    </CreateMenu>
  );
};
// Menu.defaultProps = {
//   closeButton: true,
// };

export default Menu;