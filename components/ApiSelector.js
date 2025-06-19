import { Select, FormControl, FormLabel } from "@chakra-ui/react";

export default function ApiSelector({ apiOptions, selectedApi, onChange }) {
  return (
    <FormControl mb={4}>
      <FormLabel>Select API Data Type</FormLabel>
      <Select value={selectedApi} onChange={e => onChange(e.target.value)}>
        {apiOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
} 