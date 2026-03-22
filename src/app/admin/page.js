"use client";

import { useSession } from "next-auth/react";
import styles from "../auth.module.css"; // Reusing auth styles for container

export default function AdminPage() {
    const { data: session } = useSession();

    return (
        <div className={styles.container}>
            <div className={styles.formCard} style={{ maxWidth: "800px" }}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <p>Welcome, Admin <strong>{session?.user?.name}</strong>!</p>
                <p style={{ marginTop: "1rem" }}>
                    This area is restricted to administrators only. Here you can manage users, products, and orders.
                </p>

                <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "4px" }}>
                        <h3>User Management</h3>
                        <p>View and manage registered users.</p>
                    </div>
                    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "4px" }}>
                        <h3>Product Inventory</h3>
                        <p>Update stock and prices.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
