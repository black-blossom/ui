import React from 'react';
import { useLocation } from 'wouter';

import {
  ToggleButton,
  Tooltip,
} from '@mui/material';

interface SideBarItemProps {
  name: string;
  icon: React.ReactNode;
  link: string;
  match: string;
};

const SideBarItem = ({name, icon, link, match}: SideBarItemProps) => {
  const [location, setLocation] = useLocation();

  return (
    <Tooltip title={name} placement="right" enterDelay={500} enterNextDelay={500} arrow>
      <ToggleButton
        value={name}
        onClick={ () => setLocation(link) }
        selected={ location.split('/')[1] === match }
        sx={{ border: 0 }}
      >
        {icon}
      </ToggleButton>
    </Tooltip>
  );

};

export default SideBarItem;
