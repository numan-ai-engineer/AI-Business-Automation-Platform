import AIContentGenerator from "./AIContentGenerator";

function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
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
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            width: "220px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>👤 Users</h3>
          <p>Manage platform users</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            width: "220px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>🤖 AI Generator</h3>
          <p>Create AI content</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            width: "220px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>📊 Analytics</h3>
          <p>View platform statistics</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            width: "220px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>⚙️ Settings</h3>
          <p>Manage account settings</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <AIContentGenerator />
      </div>

      <br />

      <button
        onClick={logout}
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;