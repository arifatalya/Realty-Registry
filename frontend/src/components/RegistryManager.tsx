'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "../styles/RegistryManager.css";
import { Navbar } from "@/components/Navbar";
import axios from "axios";

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

interface FormState {
    property_id: string;
    owner: string;
    propertyType: string;
    location: string;
    size: string;
    marketValue: string;
}

export default function RegistryManager() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [form, setForm] = useState<FormState>({
        property_id: "",
        owner: "",
        propertyType: "",
        location: "",
        size: "",
        marketValue: "",
    });
    const [editMode, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [editTargetId, setEditTargetId] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/registrar')
            .then((res) => res.json())
            .then((data) => setProperties(data))
            .catch(() => alert("Failed to load properties."));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = editMode && editTargetId
            ? `http://localhost:3000/registrar/${editTargetId}`
            : 'http://localhost:3000/registrar';

        const method = editMode ? "PUT" : "POST";

        try {
            const response = await axios({
                url: endpoint,
                method,
                headers: { "Content-Type": "application/json" },
                data: {
                    ...form,
                    size: Number(form.size),
                    marketValue: Number(form.marketValue),
                },
            });
            console.log(response.data.message);

            setForm({
                property_id: "",
                owner: "",
                propertyType: "",
                location: "",
                size: "",
                marketValue: ""
            });
            setEditMode(false);

            const updated = await fetch(`http://localhost:3000/registrar`).then((res) => res.json());
            setProperties(updated);
        } catch {
            console.log("Error submitting property.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (prop: Property) => {
        setEditTargetId(prop.id);
        setForm({
            property_id: prop.property_id ?? "",
            owner: prop.owner ?? "",
            propertyType: prop.propertyType ?? "",
            location: prop.location ?? "",
            size: prop.size !== undefined && prop.size !== null ? prop.size.toString() : "",
            marketValue: prop.marketValue !== undefined && prop.marketValue !== null ? prop.marketValue.toString() : "",
        });
        setEditMode(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm(`Are you sure you want to delete ${id}?`)) return;

        try {
            const deleted = await axios.delete(`http://localhost:3000/registrar/${id}`);
            console.log(deleted.data.message);
            const updated = await fetch('http://localhost:3000/registrar').then((res) => res.json());
            setProperties(updated);
        } catch {
            console.log("Failed to delete.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="registry-page-container">
                <div className="registry-page">
                    <h1>{editMode ? "Update Registry" : "Register Property"}</h1>
                    <form className="registry-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Property ID</label>
                            <input
                                name="property_id"
                                value={form.property_id}
                                onChange={handleChange}
                                disabled={editMode}
                                required
                                style={{ backgroundColor: editMode ? "#eee" : undefined }}
                            />
                            {editMode && (
                                <small style={{ color: "gray" }}>
                                    Property ID is locked during update
                                </small>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Owner</label>
                            <input name="owner" value={form.owner} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Property Type</label>
                            <input name="propertyType" value={form.propertyType} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input name="location" value={form.location} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Size</label>
                            <input name="size" type="number" value={form.size} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Market Value</label>
                            <input name="marketValue" type="number" value={form.marketValue} onChange={handleChange} required />
                        </div>
                        {editMode ? (
                            <>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Updating..." : "Save Changes"}
                                </button>
                                <button type="button" onClick={() => {
                                    setEditMode(false);
                                    setForm({
                                        property_id: "",
                                        owner: "",
                                        propertyType: "",
                                        location: "",
                                        size: "",
                                        marketValue: ""
                                    });
                                }}>Cancel</button>
                            </>
                        ) : (
                            <button type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Register Property"}
                            </button>
                        )}
                    </form>
                    <table className="registry-table">
                        <thead>
                        <tr>
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
                        {properties.map((p, i) => (
                            <tr key={i}>
                                <td>{p.owner}</td>
                                <td>{p.propertyType}</td>
                                <td>{p.location}</td>
                                <td>{p.size}</td>
                                <td>Rp {p.marketValue.toLocaleString()}</td>
                                <td>{p.registrationStatus}</td>
                                <td>
                                    <button onClick={() => handleEdit(p)}>Edit</button>
                                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}