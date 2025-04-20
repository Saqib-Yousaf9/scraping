import React from "react";

const DataTable = ({ data }) => {
  return (
    <div className="card shadow p-4">
      <h4 className="text-center text-secondary mb-4 fw-bold">🧾 Extracted News Data</h4>
      <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ minWidth: "200px" }}>Title</th>
              <th style={{ minWidth: "120px" }}>Author</th>
              <th style={{ minWidth: "150px" }}>Persons</th>
              <th style={{ minWidth: "150px" }}>Areas</th>
              <th style={{ minWidth: "180px" }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.title}</td>
                  <td>{item.name}</td>
                  <td>{item.person?.join(", ") || "—"}</td>
                  <td>{item.area?.join(", ") || "—"}</td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
