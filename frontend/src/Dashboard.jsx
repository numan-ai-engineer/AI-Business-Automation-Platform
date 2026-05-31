function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🚀 AI Business Automation Platform</h1>

      <hr />

      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "220px",
          }}
        >
          <h3>👤 Users</h3>
          <p>Manage platform users</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "220px",
          }}
        >
          <h3>🤖 AI Generator</h3>
          <p>Generate AI content</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "220px",
          }}
        >
          <h3>📊 Analytics</h3>
          <p>View platform statistics</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "220px",
          }}
        >
          <h3>⚙️ Settings</h3>
          <p>Manage account settings</p>
        </div>
      </div>

      <br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;