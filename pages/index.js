import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  Spinner,
  Divider,
  Flex,
  useBreakpointValue,
  Fade,
  Icon,
} from "@chakra-ui/react";
import { FaDatabase } from "react-icons/fa";
import ApiSelector from "../components/ApiSelector";
import ParameterInputs from "../components/ParameterInputs";
import ApiResponseDisplay from "../components/ApiResponseDisplay";
import RawJsonViewer from "../components/RawJsonViewer";
import { API_ENDPOINTS, DEFAULT_API_KEY } from "../utils/apiConfig";
import axios from "axios";

export default function Home() {
  const apiOptions = Object.keys(API_ENDPOINTS);
  const [selectedApi, setSelectedApi] = useState(apiOptions[0]);
  const [paramValues, setParamValues] = useState({ ...API_ENDPOINTS[apiOptions[0]].default_values });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  // Update param values when API changes
  const handleApiChange = (apiName) => {
    setSelectedApi(apiName);
    setParamValues({ ...API_ENDPOINTS[apiName].default_values });
    setData(null);
    setError("");
  };

  const handleParamChange = (param, value) => {
    setParamValues(vals => ({ ...vals, [param]: value }));
  };

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    setData(null);
    const apiInfo = API_ENDPOINTS[selectedApi];
    const apiKey = process.env.NEXT_PUBLIC_MARKERDB_API_KEY || DEFAULT_API_KEY;
    const params = { api_key: apiKey, ...paramValues };
    try {
      // Use local proxy API route
      const url = "/api/markerdb";
      const response = await axios.get(url, {
        params: { endpoint: apiInfo.url, ...params },
      });
      setData(response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(`API Error: ${err.response.data.error}`);
      } else if (err.request) {
        setError("Connection Error: Could not connect to the API.");
      } else {
        setError("An unexpected error occurred: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const allParamsFilled = API_ENDPOINTS[selectedApi].params.every(
    p => paramValues[p] && paramValues[p].trim() !== ""
  );

  // Responsive padding for the glass card
  const cardPadding = useBreakpointValue({ base: 4, md: 8 });
  const cardWidth = useBreakpointValue({ base: "100%", md: "700px", lg: "900px" });

  return (
    <Box
      minH="100vh"
      w="100vw"
      bgGradient="linear(to-br, teal.500 0%, blue.400 100%)"
      position="relative"
      overflowX="hidden"
    >
      {/* Hero Header */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        py={{ base: 10, md: 16 }}
        mb={2}
      >
        <Fade in={true}>
          <Box textAlign="center">
            <Icon as={FaDatabase} w={16} h={16} color="whiteAlpha.900" mb={2} filter="drop-shadow(0 2px 8px #0002)" />
            <Heading
              size="2xl"
              fontWeight="extrabold"
              color="whiteAlpha.900"
              letterSpacing="tight"
              mb={2}
              textShadow="0 2px 16px #0004"
            >
              Dynamic MarkerDB API Viewer
            </Heading>
            <Text color="whiteAlpha.800" fontSize="xl" maxW="2xl" mx="auto">
              Explore and visualize MarkerDB data with a beautiful, interactive interface.
            </Text>
          </Box>
        </Fade>
      </Flex>

      {/* Glassmorphism Card */}
      <Flex justify="center" align="flex-start" w="100%">
        <Box
          w={cardWidth}
          mx="auto"
          bg="whiteAlpha.800"
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
          borderRadius="2xl"
          p={cardPadding}
          backdropFilter="blur(12px)"
          border="1.5px solid rgba(255,255,255,0.25)"
          mt={{ base: 0, md: -12 }}
          mb={8}
        >
          <Flex direction={{ base: "column", md: "row" }} gap={8}>
            {/* Controls */}
            <Box flex={1} minW={0}>
              <ApiSelector
                apiOptions={apiOptions}
                selectedApi={selectedApi}
                onChange={handleApiChange}
              />
              <ParameterInputs
                params={API_ENDPOINTS[selectedApi].params}
                values={paramValues}
                onChange={handleParamChange}
              />
              <Button
                colorScheme="teal"
                size="lg"
                fontWeight="bold"
                letterSpacing="wide"
                onClick={handleFetch}
                isLoading={loading}
                isDisabled={!allParamsFilled}
                w="100%"
                mb={2}
                mt={2}
                boxShadow="0 2px 8px #31979544"
                _hover={{ bg: "teal.400", transform: "scale(1.03)" }}
              >
                Fetch Data
              </Button>
              {!allParamsFilled && (
                <Text color="orange.500" fontSize="sm" mt={1}>
                  Please provide values for all required parameters.
                </Text>
              )}
              {error && (
                <Alert status="error" mt={4} borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              {loading && (
                <Box textAlign="center" py={8}>
                  <Spinner size="xl" color="teal.500" />
                </Box>
              )}
            </Box>
            {/* Results */}
            <Box flex={2} minW={0}>
              {data && (
                <Fade in={!!data}>
                  <Box
                    bg="whiteAlpha.900"
                    borderRadius="xl"
                    boxShadow="0 4px 24px 0 rgba(31, 38, 135, 0.10)"
                    p={6}
                    mb={4}
                    border="1px solid #e3e8f0"
                    maxH="70vh"
                    overflowY="auto"
                  >
                    <Heading size="md" mb={2} color="teal.700">
                      Fetched {selectedApi} Overview
                    </Heading>
                    <Divider mb={4} />
                    <ApiResponseDisplay data={data} />
                    <RawJsonViewer data={data} />
                  </Box>
                </Fade>
              )}
            </Box>
          </Flex>
          <Divider my={8} />
          <Box bg="blue.50" p={3} borderRadius="md" fontSize="sm" textAlign="center" boxShadow="sm">
            <b>Note:</b> The API key is stored in an environment variable for security. This app dynamically adapts to display various JSON structures from the MarkerDB API.
          </Box>
        </Box>
      </Flex>
      {/* Subtle background visual */}
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        zIndex={-1}
        pointerEvents="none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.18) 0, transparent 60%)," +
            "radial-gradient(circle at 10% 80%, rgba(255,255,255,0.12) 0, transparent 70%)",
        }}
      />
    </Box>
  );
} 