import { Box, Button, Collapse, Code } from "@chakra-ui/react";
import { useState } from "react";

export default function RawJsonViewer({ data }) {
  const [show, setShow] = useState(false);
  return (
    <Box mt={6}>
      <Button size="sm" onClick={() => setShow(s => !s)} mb={2} colorScheme="gray">
        {show ? "Hide Raw JSON" : "Show Raw JSON"}
      </Button>
      <Collapse in={show} animateOpacity>
        <Box p={3} bg="gray.50" borderRadius="md" overflowX="auto">
          <Code whiteSpace="pre" width="100%" fontSize="sm">
            {JSON.stringify(data, null, 2)}
          </Code>
        </Box>
      </Collapse>
    </Box>
  );
} 