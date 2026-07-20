"use client";

import styles from "./ManageConsentButton.module.css";

export default function ManageConsentButton() {
    function handleClick() {
        localStorage.removeItem("consent-analytics");
        location.reload();
    }

    return (
        <button className={styles.manage} onClick={handleClick}>
            Gérer mes cookies
        </button>
    );
}