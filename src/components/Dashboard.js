import React, { useEffect, useState } from "react";
import Charts from "./Charts";
import DataTable from "./DataTable";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap'; // To use spinner component

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;  // Fetch API URL from .env file

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/get_nap`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const scrapeNow = async () => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/scrape_now`);
      await fetchData();
    } catch (error) {
      console.error("Error during scrape:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary">📰 Geo TV News Scraper Dashboard</h2>

      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-primary me-3 d-flex align-items-center"
          onClick={scrapeNow}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            "Scrape Now"
          )}
          {loading && <span className="visually-hidden">Loading...</span>}
        </button>
        <button className="btn btn-outline-success" onClick={fetchData}>
          Refresh Data
        </button>
      </div>

      <div className="card shadow-lg p-4 mb-5">
        <h4 className="mb-3 text-center">Visualization</h4>
        <Charts data={data} />
      </div>

      <div className="card shadow-lg p-4">
        <h4 className="mb-3 text-center">Data Table</h4>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
