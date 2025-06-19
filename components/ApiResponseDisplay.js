import { Box, Text, List, ListItem, Collapse } from "@chakra-ui/react";
import { useState } from "react";

function isUrl(str) {
  return typeof str === 'string' && (str.startsWith('http://') || str.startsWith('https://'));
}

function capitalize(str) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function ApiResponseDisplay({ data, level = 0 }) {
  if (data === null || data === undefined) return null;
  const indent = level * 4;

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <Text ml={indent}>No items.</Text>;
    }
    return (
      <List spacing={1} ml={indent}>
        {data.map((item, idx) => (
          <ListItem key={idx}>
            <Box pl={2} borderLeft={"2px solid #eee"}>
              <Text fontSize="sm" color="gray.500">Item {idx + 1}</Text>
              <ApiResponseDisplay data={item} level={level + 1} />
            </Box>
          </ListItem>
        ))}
      </List>
    );
  }
  if (typeof data === 'object') {
    return (
      <Box ml={indent}>
        {Object.entries(data).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            const [open, setOpen] = useState(true);
            return (
              <Box key={key} mb={1}>
                <Text
                  as="span"
                  fontWeight="bold"
                  cursor="pointer"
                  onClick={() => setOpen(o => !o)}
                  color="teal.600"
                >
                  {open ? '▼' : '▶'} {capitalize(key)}:
                </Text>
                <Collapse in={open} animateOpacity>
                  <Box pl={4}>
                    <ApiResponseDisplay data={value} level={level + 1} />
                  </Box>
                </Collapse>
              </Box>
            );
          } else if (Array.isArray(value)) {
            return (
              <Box key={key} mb={1}>
                <Text fontWeight="bold" color="teal.600">{capitalize(key)}:</Text>
                <ApiResponseDisplay data={value} level={level + 1} />
              </Box>
            );
          } else if (isUrl(value)) {
            return (
              <Text key={key} ml={2}>
                <b>{capitalize(key)}:</b> <a href={value} target="_blank" rel="noopener noreferrer">Link</a>
              </Text>
            );
          } else {
            return (
              <Text key={key} ml={2}><b>{capitalize(key)}:</b> {String(value)}</Text>
            );
          }
        })}
      </Box>
    );
  }
  // Primitive value
  return <Text ml={indent}>{String(data)}</Text>;
} 