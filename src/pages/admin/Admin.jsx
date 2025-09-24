import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isSignedIn) navigate("/signin");
    if (user && user.publicMetadata?.role !== "admin") navigate("/");
  }, [isSignedIn, user, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/users`, {
        headers: { "x-user-id": user?.id },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchUsers();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user]);

  const showPopup = (text) => {
    setPopup(text);
    setTimeout(() => setPopup(null), 2500);
  };

  const promoteUser = async () => {
    if (!selectedUser) return setMessage("Please select a user");
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/users/make-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser.id }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      fetchUsers();
      if (data.message) showPopup("✅ User promoted to Admin!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeRole = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/users/remove-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      fetchUsers();
      if (data.message) showPopup("⚠️ Admin role removed!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDisplayName = (user) => user.fullName || user.email;

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900 px-6 py-24 space-y-16">
      {/* Page Title */}
      <motion.div
        className="text-center"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Admin <span className="text-red-500">Panel</span>
        </h1>
        <p className="text-neutral-600 mt-4 text-lg">
          Manage users and promote them to{" "}
          <span className="text-red-500">Admin</span>.
        </p>
      </motion.div>

      {/* Search Bar - centered */}
      <motion.div
        className="flex justify-center"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
      >
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users or admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-100 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 border border-red-500 focus:ring-red-500 text-md"
          />
        </div>
      </motion.div>

      {/* Select User Box */}
      <motion.div
        className="max-w-md mx-auto bg-neutral-50 p-6 rounded-xl shadow-lg space-y-4"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
      >
        <p className="text-neutral-700 text-center text-base">
          Select a user to promote to{" "}
          <span className="font-semibold text-red-500">Admin</span>.
        </p>

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between cursor-pointer border border-neutral-300 rounded-lg px-3 py-2 bg-white focus:outline-none text-sm"
          >
            {selectedUser ? (
              <div className="flex items-center gap-2">
                <img
                  src={selectedUser.profileImageUrl}
                  alt="Profile"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm">{getUserDisplayName(selectedUser)}</div>
                  <div className="text-neutral-500 text-xs">{selectedUser.email}</div>
                </div>
              </div>
            ) : (
              <span className="text-neutral-500 text-sm">Select a user</span>
            )}
            <span className="text-neutral-400 text-xs">
              {dropdownOpen ? "▲" : "▼"}
            </span>
          </div>

          {dropdownOpen && (
            <div className="absolute z-50 mt-1 w-full max-h-52 overflow-y-auto bg-white border border-neutral-200 rounded-lg shadow-lg text-sm">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-neutral-100 cursor-pointer"
                >
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div>
                    <div>{getUserDisplayName(user)}</div>
                    <div className="text-neutral-500 text-xs">{user.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={promoteUser}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300 text-sm"
        >
          Make Admin
        </button>
      </motion.div>

      {/* Users Table */}
      <motion.div
        className="max-w-6xl mx-auto"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
      >
        <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 text-neutral-800">All Users</h2>
          <table className="min-w-full border-collapse text-neutral-800 text-sm">
            <thead>
              <tr className="bg-neutral-100">
                <th className="px-4 py-2 text-left">Profile</th>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, idx) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-neutral-50 transition"
                >
                  <td className="px-4 py-2">
                    <img
                      src={u.profileImageUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{u.fullName}</td>
                  <td className="px-4 py-2 text-neutral-600">{u.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {u.role === "admin" ? (
                      <button
                        onClick={() => removeRole(u.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md text-xs"
                      >
                        Remove Role
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-md text-xs"
                      >
                        Select to Promote
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bottom Warning */}
      <motion.div
        className="max-w-3xl mx-auto text-gray-400 text-sm text-center"
        variants={fadeIn("up")}
      >
        ⚠️ Only admin users can access this page. Ensure you select the
        correct user before promoting.
      </motion.div>

      {/* Popup Notification */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white px-6 py-4 rounded-xl shadow-xl border border-neutral-200">
              <p className="text-neutral-800 font-medium">{popup}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;