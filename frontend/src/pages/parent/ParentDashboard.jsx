
import axios from "axios";

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [email, setEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [progress, setProgress] = useState({});
  const [showProgress, setShowProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch children on mount
  useEffect(() => {
    fetchChildren();
    // eslint-disable-next-line
  }, []);

  const fetchChildren = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.get("/api/user/parent/children", { headers: { token: localStorage.getItem("token") } });
      setChildren(res.data.children || []);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch children");
    }
    setLoading(false);
  };

  const handleAddChild = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.post(
        "/api/user/parent/add-child",
        { studentEmail: email, studentPassword },
        { headers: { token: localStorage.getItem("token") } }
      );
      setEmail("");
      setStudentPassword("");
      setMessage("Student added!");
      fetchChildren();
    } catch (err) {
      setMessage(
        (err.response && JSON.stringify(err.response, null, 2)) ||
        err.message ||
        "Failed to add child"
      );
    }
    setLoading(false);
  };

  const handleRemoveChild = async (studentId) => {
    setLoading(true);
    setMessage("");
    try {
      await axios.delete("/api/user/parent/remove-child", {
        data: { studentId },
        headers: { token: localStorage.getItem("token") },
      });
      setMessage("Student removed.");
      fetchChildren();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to remove child");
    }
    setLoading(false);
  };

  return (
    <div className="parent-dashboard" style={{ maxWidth: 600, margin: "40px auto", background: "#fff", borderRadius: 18, boxShadow: "0 8px 32px rgba(80,80,160,0.10)", padding: 32 }}>
      <h2 style={{ color: "var(--primary-purple)", fontFamily: 'Baloo 2, Poppins, sans-serif', marginBottom: 12 }}>Parent Dashboard</h2>
      <p style={{ color: "var(--primary-blue)", marginBottom: 24 }}>Manage your children's accounts and view their progress.</p>

      <form onSubmit={handleAddChild} style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <input
          type="email"
          placeholder="Enter student email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ flex: 1, padding: 10, borderRadius: 7, border: "1.5px solid #e0eafc" }}
        />
        <input
          type="password"
          placeholder="Student password"
          value={studentPassword}
          onChange={e => setStudentPassword(e.target.value)}
          required
          style={{ flex: 1, padding: 10, borderRadius: 7, border: "1.5px solid #e0eafc" }}
        />
        <button type="submit" className="common-btn" disabled={loading} style={{ minWidth: 120 }}>
          {loading ? "Processing..." : "Add Child"}
        </button>
      </form>

      {message && <div style={{ marginBottom: 16, color: message.includes("add") || message.includes("Student added") ? "var(--primary-green)" : "#e74c3c" }}>{message}</div>}

      <h3 style={{ marginTop: 24, marginBottom: 12, color: "#333" }}>Linked Children</h3>
      {loading && !children.length ? (
        <div>Loading...</div>
      ) : children.length === 0 ? (
        <div style={{ color: "#888" }}>No children linked yet.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {children.map(child => (
            <li key={child._id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", background: "#f8fafd", borderRadius: 7, padding: "12px 18px", marginBottom: 10 }}>
              <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600 }}>{child.name} <span style={{ color: "#888", fontWeight: 400 }}>({child.email})</span></span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="common-btn" style={{ background: "var(--primary-yellow)", color: "var(--primary-blue)", minWidth: 90, fontSize: 15, padding: "7px 0" }} onClick={() => handleRemoveChild(child._id)} disabled={loading}>Remove</button>
                  <button className="common-btn" style={{ background: "var(--primary-green)", color: "#fff", minWidth: 90, fontSize: 15, padding: "7px 0" }}
                    onClick={async () => {
                      setShowProgress(p => ({ ...p, [child._id]: !p[child._id] }));
                      if (!progress[child._id]) {
                        try {
                          const { data } = await axios.post("/api/user/parent/child-progress", { studentId: child._id }, { headers: { token: localStorage.getItem("token") } });
                          setProgress(prev => ({ ...prev, [child._id]: data.courses }));
                        } catch (err) {
                          setProgress(prev => ({ ...prev, [child._id]: [{ courseTitle: 'Error fetching progress', completedLectures: 0 }] }));
                        }
                      }
                    }}
                  >{showProgress[child._id] ? "Hide Progress" : "View Progress"}</button>
                </div>
              </div>
              {showProgress[child._id] && progress[child._id] && (
                <div style={{ marginTop: 10, marginBottom: 5, width: "100%" }}>
                  <b>Course Progress:</b>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {progress[child._id].length === 0 ? <li>No enrolled courses.</li> : progress[child._id].map((course, idx) => (
                      <li key={idx}>{course.courseTitle}: {course.completedLectures} lectures completed</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParentDashboard;
