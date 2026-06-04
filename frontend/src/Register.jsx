import { useEffect, useState } from "react";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
  });

  const [countries, setCountries] = useState([]);

  const [validation, setValidation] = useState({
    emailMatch: false,
    passwordMatch: false,
  });

  // 🌍 Load countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const list = data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(list);
      });
  }, []);

  // ✍️ Handle input
  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    // LIVE VALIDATION (Stripe style)
    setValidation({
      emailMatch:
        updated.email &&
        updated.confirmEmail &&
        updated.email === updated.confirmEmail,

      passwordMatch:
        updated.password &&
        updated.confirmPassword &&
        updated.password === updated.confirmPassword,
    });
  };

  // 🚀 Submit
  const register = async () => {
    if (!validation.emailMatch || !validation.passwordMatch) {
      alert("❌ Email ya Password match nahi kar raha");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Create your account</h1>

        {/* NAME */}
        <div style={styles.row}>
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.row}>
          <input
            name="confirmEmail"
            placeholder="Confirm Email"
            onChange={handleChange}
            style={styles.input}
          />

          {validation.emailMatch ? (
            <span style={styles.green}>✔</span>
          ) : (
            <span style={styles.red}>✖</span>
          )}
        </div>

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.row}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            style={styles.input}
          />

          {validation.passwordMatch ? (
            <span style={styles.green}>✔</span>
          ) : (
            <span style={styles.red}>✖</span>
          )}
        </div>

        {/* PHONE */}
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          style={styles.input}
        />

        {/* COUNTRY */}
        <select
          name="country"
          onChange={handleChange}
          style={styles.input}
        >
          <option>Select Country</option>
          {countries.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        {/* BUTTON */}
        <button onClick={register} style={styles.button}>
          Create Account
        </button>

        <p style={styles.footer}>
          By creating account you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0a0f1c",
  },
  card: {
    width: "420px",
    background: "#111827",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    color: "white",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "6px 0",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#0f172a",
    color: "white",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  green: {
    color: "#22c55e",
    fontSize: "20px",
  },
  red: {
    color: "#ef4444",
    fontSize: "20px",
  },
  footer: {
    fontSize: "12px",
    marginTop: "10px",
    color: "#94a3b8",
  },
};

export default Register;