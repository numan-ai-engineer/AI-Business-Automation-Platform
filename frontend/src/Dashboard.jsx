function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🚀 AI Business Automation Platform</h1>

      <h2>Welcome Back!</h2>

      <p>You are successfully logged in.</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;