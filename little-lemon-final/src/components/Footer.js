import React from 'react';

function Footer() {
    return (
        <footer>
            <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
            <p>
                <a href="#privacy">Privacy Policy</a> |{" "}
                <a href="#terms">Terms of Service</a>
            </p>
        </footer>
    );
}

export default Footer;