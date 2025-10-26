import { TextField } from '@radix-ui/themes';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <TextField.Root
      size="2"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
        <TextField.Slot>
          <Search size={16} />
        </TextField.Slot>
    </TextField.Root>
  );
};
