import React, { useEffect, useState, useCallback } from "react";
import AdminModal from "./AdminModal.jsx";

// Fixed and cleaned Admin Dashboard
// - removed duplicate fetches
// - unified data loading into `loadAll()`
// - fixed delete handler to update correct state arrays
// - fixed addEvent handling and WhatsApp URL extraction
// - improved reply email flow (closes modal + updates contact)
// - minor UX improvements and defensive checks

const StatusMessage = ({ message, type }) => {
  if (!message) return null;
  const types = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
  };
  return (
    <div className={`border p-3 rounded-lg text-center font-medium mt-3 ${types[type]}`}>
      {message}
    </div>
  );
};

export default function AdminDash() {
  const API = import.meta.env.VITE_API_URL;

  // Active tab
  const [activeTab, setActiveTab] = useState("users");

  // Data states
  const [teachersData, setTeachersData] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  // Forms and UI states
  const [teachersForm, setTeachersForm] = useState({ name: "", position: "", email: "", description: "" });
  const [teachersImage, setTeachersImage] = useState(null);
  const [teacherStatus, setTeacherStatus] = useState({ message: "", type: "" });

  const [memberData, setMemberData] = useState({ name: "", position: "", email: "", description: "" });
  const [memberImage, setMemberImage] = useState(null);
  const [memberStatus, setMemberStatus] = useState({ message: "", type: "" });

  const [eventData, setEventData] = useState({ event: "", post: "", sms: false, mail: false, home: false, date: "" });
  const [eventImage, setEventImage] = useState(null);
  const [eventStatus, setEventStatus] = useState({ message: "", type: "" });
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const [roleData, setRoleData] = useState({ name: "", email: "", mobile: "", role: "" });
  const [roleStatus, setRoleStatus] = useState({ message: "", type: "" });
  const [isSubmittingRole, setIsSubmittingRole] = useState(false);

  // helpers for classes
  const inputClass = "w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none transition text-gray-700";
  const buttonPrimary = "bg-cyan-700 hover:bg-cyan-800 text-white py-2 px-4 rounded-lg w-full transition font-medium";
  const buttonSecondary = "bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-md text-sm transition";

  // Generic input handlers
  const handleInputChange = (setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
  const handleFileChange = (setter) => (e) => setter(e.target.files?.[0] ?? null);

  // Load everything once (and allow reloading)
  const loadAll = useCallback(async () => {
    try {
      const [usersRes, membersRes, teachersRes, contactsRes, eventsRes] = await Promise.all([
        fetch(`${API}/users`),
        fetch(`${API}/members`),
        fetch(`${API}/teacher`),
        fetch(`${API}/contactsview`),
        fetch(`${API}/events`), 
         
      ]);
     
      if (usersRes.ok) setUsersData(await usersRes.json());
      if (membersRes.ok) setMembersData(await membersRes.json());
      if (teachersRes.ok) setTeachersData(await teachersRes.json());
      if (contactsRes.ok) setContactData(await contactsRes.json());
      if (eventsRes.ok) setEventsData(await eventsRes.json());
    } catch (err) {
      console.error("loadAll error", err);
    }
   
  }, [API]);

  useEffect(() => {
    loadAll();
    
  }, [loadAll]);
  




  const handleDelete = async (_id, resource) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`${API}/${resource}/${_id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      // Update local state according to resource
      switch (resource) {
        case "teacher":
          setTeachersData((prev) => prev.filter((t) => t._id !== _id));
          break;
        case "members":
          setMembersData((prev) => prev.filter((m) => m._id !== _id));
          break;
        case "events":
          setEventsData((prev) => prev.filter((e) => e._id !== _id));
          break;
        case "users":
          setUsersData((prev) => prev.filter((u) => u._id !== _id));
          break;
        default:
          // fallback: reload everything
          await loadAll();
      }
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete. Check console for details.");
    }
  };

  // MARK contact as responded
  const markContactResponded = async (id) => {
    try {
      const res = await fetch(`${API}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respond: true }),
      });
      if (res.ok) {
        setContactData((prev) => prev.map((c) => (c._id === id ? { ...c, respond: true } : c)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add member
  const addMember = async (e) => {
    e.preventDefault();
    setIsSubmittingEvent(true);
    setMemberStatus({ message: "", type: "" });
    try {
      const fd = new FormData();
      fd.append("mname", memberData.name);
      fd.append("position", memberData.position);
      fd.append("description", memberData.description);
      fd.append("email", memberData.email);
      if (memberImage) fd.append("image", memberImage);

      const res = await fetch(`${API}/gallery`, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed to add member");
      const newM = await res.json();
      setMembersData((prev) => [newM, ...prev]);
      setMemberStatus({ message: "Member Added!", type: "success" });
      setMemberData({ name: "", position: "", email: "", description: "" });
      setMemberImage(null);
      e.target.reset?.();
    } catch (err) {
      console.error(err);
      setMemberStatus({ message: "Failed to add member.", type: "error" });
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Add teacher
  const addTeacher = async (e) => {
    e.preventDefault();
    setIsSubmittingEvent(true);
    setTeacherStatus({ message: "", type: "" });
    try {
      const fd = new FormData();
      fd.append("mname", teachersForm.name);
      fd.append("position", teachersForm.position);
      fd.append("description", teachersForm.description);
      fd.append("email", teachersForm.email);
      if (teachersImage) fd.append("image", teachersImage);

      const res = await fetch(`${API}/teacher`, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed to add teacher");
      const newT = await res.json();
      setTeachersData((prev) => [newT, ...prev]);
      setTeacherStatus({ message: "Teacher Added!", type: "success" });
      setTeachersForm({ name: "", position: "", email: "", description: "" });
      setTeachersImage(null);
      e.target.reset?.();
    } catch (err) {
      console.error(err);
      setTeacherStatus({ message: "Failed to add teacher.", type: "error" });
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Add event (uploads image + handles whatsapp url)
  const addEvent = async (e) => {
    e.preventDefault();
    setIsSubmittingEvent(true);
    setEventStatus({ message: "", type: "" });

    try {
      const fd = new FormData();
      Object.entries(eventData).forEach(([k, v]) => fd.append(k, v));
      if (eventImage) fd.append("image", eventImage);

      const res = await fetch(`${API}/events`, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed to add event");
      const data = await res.json();

      // server returns the new event and optionally whatsappShareURL
      const newEvent = {
        ...(data.whatsappShareURL ? data : data),
      };

      // If server returned full event object, push it; otherwise refetch
      if (newEvent._id) setEventsData((prev) => [newEvent, ...prev]);
      else await loadAll();

      // Extract whatsapp URL robustly
      const maybeWhatsapp = data.whatsappShareURL || (data.whatsappUrl ?? null) || "";
      setWhatsappUrl(maybeWhatsapp);

      setEventStatus({ message: "Event Added!", type: "success" });
      setEventData({ event: "", post: "", sms: false, mail: false, home: false, date: "" });
      setEventImage(null);
      e.target.reset?.();
    } catch (err) {
      console.error(err);
      setEventStatus({ message: "Failed to add event.", type: "error" });
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Add role/user
  const addRole = async (e) => {
    e.preventDefault();
    setIsSubmittingRole(true);
    const password = roleData.role === "admin" ? "Admin@123" : "User@123";
    try {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...roleData, password }),
      });
      if (!res.ok) throw new Error("Failed to create user");
      const user = await res.json();
      setUsersData((prev) => [user, ...prev]);
      setRoleStatus({ message: `User Created!`, type: "success" });
      setRoleData({ name: "", email: "", mobile: "", role: "" });
      e.target.reset?.();
    } catch (err) {
      console.error(err);
      setRoleStatus({ message: "Failed to create user.", type: "error" });
    } finally {
      setIsSubmittingRole(false);
    }
  };

  // Send reply email for contact
  const sendReplyEmail = async () => {
    if (!replyMessage.trim() || !selectedContact) return;
    setSendingEmail(true);
    try {
      const res = await fetch(`${API}/sent-reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail: selectedContact.email, message: replyMessage, date: selectedContact.createdAt }),
      });
      if (!res.ok) throw new Error("Failed to send reply");

      // mark responded locally and close modal
      await markContactResponded(selectedContact._id);
      setReplyMessage("");
      setContactModalOpen(false);
      setSelectedContact(null);
      alert("✅ Email Sent Successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  };

  useEffect(() => {
    if (selectedContact) setReplyMessage(`Hi ${selectedContact.name},\n\n`);
  }, [selectedContact]);

  return (
    <div className="min-h-screen pt-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <h1 className="text-3xl font-bold text-center text-cyan-800 mb-6">Admin Dashboard</h1>

        {/* TABS */}
        <div className="flex gap-3 flex-wrap justify-center mb-8">
          {["users", "events", "members", "contacts", "teachers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                activeTab === tab ? "bg-cyan-800 text-white shadow" : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tab === "users" && "User Management"}
              {tab === "events" && "Events"}
              {tab === "members" && "Gallery Members"}
              {tab === "contacts" && "Contacts"}
              {tab === "teachers" && "Teachers"}
            </button>
          ))}
        </div>

        {/* USER MANAGEMENT */}
        {activeTab === "users" && (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
              <h2 className="text-lg font-semibold mb-4">Add User</h2>
              <form onSubmit={addRole} className="space-y-4">
                <input className={inputClass} placeholder="Name" name="name" required onChange={handleInputChange(setRoleData)} />
                <input className={inputClass} placeholder="Email" name="email" required onChange={handleInputChange(setRoleData)} />
                <input className={inputClass} placeholder="Mobile" name="mobile" required onChange={handleInputChange(setRoleData)} />
                <div className="flex gap-6">
                  <label className="flex gap-2 items-center"><input type="radio" name="role" value="admin" onChange={handleInputChange(setRoleData)} /> Admin</label>
                  <label className="flex gap-2 items-center"><input type="radio" name="role" value="user" onChange={handleInputChange(setRoleData)} /> User</label>
                </div>
                <button className={buttonPrimary} disabled={isSubmittingRole}>{isSubmittingRole ? "Adding..." : "Add User"}</button>
                <StatusMessage {...roleStatus} />
              </form>
            </div>

            <div className="overflow-x-auto mt-8">
              <table className="w-full min-w-[500px] text-left border">
                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Mobile</th>
                    <th className="p-3 border-b">Role</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((u) => (
                    <tr key={u._id} className="border hover:bg-gray-50">
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.mobile}</td>
                      <td className="p-3 capitalize">{u.role}</td>
                      <td className="p-3"><button onClick={() => handleDelete(u._id, "users")} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold mb-4">Add Event</h2>
              <form onSubmit={addEvent} className="space-y-4">
                <input className={inputClass} name="event" placeholder="Event Name" value={eventData.event} onChange={handleInputChange(setEventData)} required />

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label>Event Post</label>
                  </div>
                  <textarea className={inputClass + " min-h-28"} name="post" value={eventData.post} onChange={handleInputChange(setEventData)} required />
                </div>

                <div className="flex gap-4 flex-wrap">
                  {["mail", "sms", "home"].map((n) => (
                    <label key={n} className="flex gap-2 items-center text-sm"><input type="checkbox" name={n} checked={eventData[n]} onChange={handleInputChange(setEventData)} /> {n.toUpperCase()}</label>
                  ))}
                </div>

                <input type="file" onChange={handleFileChange(setEventImage)} className="text-sm" />
                <input type="date" name="date" value={eventData.date} onChange={handleInputChange(setEventData)} className={inputClass} />

                <button className={buttonPrimary} disabled={isSubmittingEvent}>{isSubmittingEvent ? "Adding..." : "Add Event"}</button>
                <StatusMessage {...eventStatus} />

                {whatsappUrl && (
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex justify-center gap-2 mt-4 px-5 py-2.5 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700">Share on WhatsApp</a>
                )}
              </form>
            </div>

            <div className="overflow-x-auto mt-20">
              <table className="w-full min-w-[500px] text-left border">
                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="p-3 border-b">Event</th>
                    <th className="p-3 border-b">Description</th>
                    <th className="p-3 border-b">Date</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsData.map((c) => (
                    <tr key={c._id} className="border hover:bg-gray-50">
                      <td className="p-3">{c.event}</td>
                      <td className="p-3">{c.post}</td>
                      <td className="p-3">{c.date}</td>
                      <td className="p-3"><button onClick={() => handleDelete(c._id, "events")} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* MEMBERS */}
        {activeTab === "members" && (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold mb-4">Add Gallery Member</h2>
              <form onSubmit={addMember} className="space-y-4">
                <input className={inputClass} name="name" value={memberData.name} placeholder="Name" onChange={handleInputChange(setMemberData)} required />
                <input className={inputClass} name="email" value={memberData.email} placeholder="Email" onChange={handleInputChange(setMemberData)} required />
                <input className={inputClass} name="position" value={memberData.position} placeholder="Position" onChange={handleInputChange(setMemberData)} required />
                <textarea className={inputClass + " min-h-28"} name="description" value={memberData.description} onChange={handleInputChange(setMemberData)} required />
                <input type="file" onChange={handleFileChange(setMemberImage)} className="text-sm" />
                <button className={buttonPrimary}>Add Member</button>
                <StatusMessage {...memberStatus} />
              </form>
            </div>

            <div className="overflow-x-auto mt-20">
              <table className="w-full min-w-[500px] text-left border">
                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Position</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {membersData.map((c) => (
                    <tr key={c._id} className="border hover:bg-gray-50">
                      <td className="p-3">{c.mname}</td>
                      <td className="p-3">{c.position}</td>
                      <td className="p-3">{c.email}</td>
                      <td className="p-3"><button onClick={() => handleDelete(c._id, "members")} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* CONTACTS */}
        {activeTab === "contacts" && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">Contact Messages</h2>

            {contactData.length === 0 ? (
              <p className="text-center text-gray-600">No Messages Found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left border">
                  <thead className="bg-gray-50 text-sm">
                    <tr>
                      <th className="p-3 border-b">Name</th>
                      <th className="p-3 border-b">Date</th>
                      <th className="p-3 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactData.map((c) => (
                      <tr key={c._id} className={`border hover:bg-gray-50 cursor-pointer ${c.respond ? " bg-green-100" : ""}`} onClick={() => { setSelectedContact(c); setContactModalOpen(true); }}>
                        <td className="p-3">{c.name}</td>
                        <td className="p-3">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="p-3"><span className={`px-2 py-1 rounded text-xs font-medium ${c.respond ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>{c.respond ? "Responded" : "Pending"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <AdminModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)}>
              {selectedContact && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-cyan-800 border-b pb-2">Contact Details</h2>

                  <p><b>Name:</b> {selectedContact.name}</p>
                  <p><b>Email:</b> {selectedContact.email}</p>
                  <p><b>Mobile:</b> {selectedContact.mobile}</p>

                  <p className="p-3 bg-gray-100 rounded"><b>Message:</b><br /> {selectedContact.message}</p>

                  <textarea className={inputClass + " min-h-24"} placeholder="Type reply..." value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} />

                  <button className={buttonPrimary} onClick={sendReplyEmail} disabled={sendingEmail}>{sendingEmail ? "Sending..." : "Send Reply Email"}</button>
                  <button className={buttonSecondary + " w-full mt-2"} onClick={() => setContactModalOpen(false)}>Close</button>
                </div>
              )}
            </AdminModal>
          </div>
        )}

        {/* TEACHERS */}
        {activeTab === "teachers" && (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold mb-4">Add Teacher</h2>
              <form onSubmit={addTeacher} className="space-y-4">
                <input className={inputClass} name="name" value={teachersForm.name} placeholder="Name" onChange={handleInputChange(setTeachersForm)} required />
                <input className={inputClass} name="email" value={teachersForm.email} placeholder="Email" onChange={handleInputChange(setTeachersForm)} required />
                <input className={inputClass} name="position" value={teachersForm.position} placeholder="Position" onChange={handleInputChange(setTeachersForm)} required />
                <textarea className={inputClass + " min-h-28"} name="description" value={teachersForm.description} onChange={handleInputChange(setTeachersForm)} required />
                <input type="file" onChange={handleFileChange(setTeachersImage)} className="text-sm" />
                <button className={buttonPrimary}>Add Teacher</button>
                <StatusMessage {...teacherStatus} />
              </form>
            </div>

            <div className="overflow-x-auto mt-20">
              <table className="w-full min-w-[500px] text-left border">
                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Position</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachersData.map((c) => (
                    <tr key={c._id} className="border hover:bg-gray-50">
                      <td className="p-3">{c.mname}</td>
                      <td className="p-3">{c.position}</td>
                      <td className="p-3">{c.email}</td>
                      <td className="p-3"><button onClick={() => handleDelete(c._id, "teacher")} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
