import "../App.css";

function Footer() {
    return (
        <footer className="footer mt-auto has-background-dark pb-4 pt-4">
            <div className="content">
                <ul>
                    <li><a className="navbar-item" href="/">Home</a></li>
                    <li><a className="navbar-item" href="/inventory">Inventory</a></li>
                    <li><a className="navbar-item" href="/resourcelist">Resource</a></li>
                    <li><a className="navbar-item" href="/accesslogs">Access Logs</a></li>
                    <li><a className="navbar-item" href="/help">Help</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
