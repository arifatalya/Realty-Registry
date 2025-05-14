'use client'

import {useEffect, useState} from 'react';
import '../styles/PropertyTable.css';

interface Property {
    id: string;
    owner: string;
    propertyType: string;
    location: string;
    size: number;
    marketValue: number;
    registrationStatus: string;
}

export default function PropertyTable() {
    const [property, setProperty] = useState<Property[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/registrar')
            .then(res => res.json())
            .then(data => setProperty(data))
            .catch(err => console.log("Fetching data failed: ", err));
    }, []);

    return (
        <div className="property-table-wrapper">
            <table className="property-table">
                <thead>
                <tr>
                    <th>Owner</th>
                    <th>Property Type</th>
                    <th className="expand-location">Location</th>
                    <th>Size</th>
                    <th>Market Value</th>
                    <th>Registration Status</th>
                </tr>
                </thead>
                <tbody>
                {property.map((row, index) => (
                    <tr key={index}>
                        <td>{row.owner}</td>
                        <td>{row.propertyType}</td>
                        <td className="expand-location">{row.location}</td>
                        <td>{row.size}</td>
                        <td>Rp {row.marketValue.toLocaleString()}</td>
                        <td>
                                <span className={`label ${row.registrationStatus === 'Registered' ? 'label-success' : 'label-pending'}`}>
                                    {row.registrationStatus}
                                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}