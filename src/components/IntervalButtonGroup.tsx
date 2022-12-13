import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

interface IPairSelectorProps {
  selected: string;
  onChange: (event: React.MouseEvent<HTMLElement>, newInterval: string | null) => void;
};

// TODO: we need to add a way to change the targetChainId + update network
const IntervalButtonGroup = ({ selected, onChange }: IPairSelectorProps) => {

  return (
    <ToggleButtonGroup
      value={selected}
      onChange={onChange}
      exclusive
    >
      <ToggleButton value="1h">
        <Typography variant="body2">1h</Typography>
      </ToggleButton>
      <ToggleButton value="4h">
        <Typography variant="body2">4h</Typography>
      </ToggleButton>
      <ToggleButton value="1d">
        <Typography variant="body2">1d</Typography>
      </ToggleButton>
      <ToggleButton value="3d">
        <Typography variant="body2">3d</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default IntervalButtonGroup;
