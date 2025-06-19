// MarkerDB API endpoint configuration
export const API_ENDPOINTS = {
  "Chemical Data": {
    url: "http://markerdb.ca/api/v1/chemicalapi/chemicalrequest",
    params: ["markerdb_id"],
    default_values: { markerdb_id: "MDB00000251" }
  },
  "Condition Data": {
    url: "http://markerdb.ca/api/v1/conditionapi/conditionrequest",
    params: ["query", "page"],
    default_values: { query: "diabetes", page: "1" }
  },
  "Gene Data": {
    url: "http://markerdb.ca/api/v1/geneapi/generequest",
    params: ["markerdb_id"],
    default_values: { markerdb_id: "MDB00031188" }
  },
  "Protein Data": {
    url: "http://markerdb.ca/api/v1/proteinapi/proteinrequest",
    params: ["markerdb_id"],
    default_values: { markerdb_id: "MDB00000873" }
  },
  "Karyotype Data": {
    url: "http://markerdb.ca/api/v1/karyotypeapi/karyotyperequest",
    params: ["markerdb_id"],
    default_values: { markerdb_id: "MDB00005072" }
  },
  "General Data": {
    url: "http://markerdb.ca/api/v1/generalapi/generalrequest",
    params: ["category", "biomarker_type", "page"],
    default_values: { category: "Diagnostic", biomarker_type: "Chemical", page: "1" }
  }
};

// Placeholder for API key (will use env var in app)
export const DEFAULT_API_KEY = "cc69fb7c1a4809bbae7c0701d5188c17"; 