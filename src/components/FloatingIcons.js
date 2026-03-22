"use client";
import Link from "next/link";
import { ShoppingCart, Search, Activity } from "lucide-react";
import styles from "./FloatingIcons.module.css";
import { motion } from "framer-motion";

export default function FloatingIcons() {
    return (
        <div className={styles.floatingContainer}>
            <Link href="/cart" className={styles.iconLink} aria-label="Cart">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <ShoppingCart size={24} />
                </motion.div>
            </Link>
            <Link href="/quiz" className={styles.iconLink} aria-label="Quiz">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Activity size={24} />
                </motion.div>
            </Link>
            <Link href="/search" className={styles.iconLink} aria-label="Search">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Search size={24} />
                </motion.div>
            </Link>
        </div>
    );
}
