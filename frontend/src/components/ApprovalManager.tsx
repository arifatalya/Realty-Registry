'use client'

import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import "../styles/ApprovalManager.css";

interface Property {
    id: string;
    property_id: string;
    owner: string;
    propertyType: string;
    location: string;
    size: number;
    marketValue: number;
    registrationStatus: string;
}

export default function ApprovalManager() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [newOwners, setNewOwners] = useState<{ [id: string]: string }>({});

    useEffect(() => {
        fetch('http://localhost:3000/authority')
            .then(res => res.json())
            .then(setProperties)
            .catch(() => alert("Failed to load properties."));
    }, []);

    const handleApprove = async (id: string) => {
        try {
            const res = await axios.post(`http://localhost:3000/authority/${id}/approve`);
            alert(res.data.message);

            const updated = await fetch('http://localhost:3000/authority').then(res => res.json());
            setProperties(updated);
        } catch {
            alert("Approval failed.");
        }
    };

    const handleTransfer = async (id: string) => {
        const newOwner = newOwners[id];
        if (!newOwner) return alert("Please enter a new owner ID.");

        try {
            const res = await axios.put(`http://localhost:3000/authority/${id}/transfer`, {newOwner});
            alert(res.data.message);

            const updated = await fetch('http://localhost:3000/authority').then(res => res.json());
            setProperties(updated);
            setNewOwners(prev => ({ ...prev, [id]: "" }));
        } catch {
            alert("Transfer failed.");
        }
    };

    const handleOwnerInput = (id: string, value: string) => {
        setNewOwners(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="approval-page-container">
            <div className="approval-page">
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>
                    Approval Manager
                </h1>
                <table className="approval-table">
                    <thead>
                    <tr>
                        <th>Property ID</th>
                        <th>Owner</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Size</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {properties.map(p => (
                        <tr key={p.id}>
                            <td>{p.property_id}</td>
                            <td>{p.owner}</td>
                            <td>{p.propertyType}</td>
                            <td>{p.location}</td>
                            <td>{p.size}</td>
                            <td>Rp {p.marketValue.toLocaleString()}</td>
                            <td>
                                    <span className={`status-badge ${
                                        p.registrationStatus.trim().toLowerCase() === "pending"
                                            ? "status-pending"
                                            : "status-registered"
                                    }`}>
                                        {p.registrationStatus}
                                    </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    {p.registrationStatus.trim().toLowerCase() === "pending" && (
                                        <button onClick={() => handleApprove(p.id)}>Approve</button>
                                    )}
                                    {p.registrationStatus.trim().toLowerCase() === "registered" && (
                                        <>
                                            <input
                                                placeholder="New Owner"
                                                value={newOwners[p.id] || ""}
                                                onChange={(e) => handleOwnerInput(p.id, e.target.value)}
                                            />
                                            <button onClick={() => handleTransfer(p.id)}>Transfer</button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}