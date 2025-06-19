import { VStack, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function ParameterInputs({ params, values, onChange }) {
  return (
    <VStack align="stretch" spacing={3} mb={4}>
      {params.map(param => (
        <FormControl key={param}>
          <FormLabel>{param.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</FormLabel>
          <Input
            value={values[param] || ''}
            onChange={e => onChange(param, e.target.value)}
            placeholder={`Enter ${param.replace(/_/g, ' ')}`}
          />
        </FormControl>
      ))}
    </VStack>
  );
} 