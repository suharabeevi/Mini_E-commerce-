import styles from './styles.module.css';

const Main = () => {
    const handlelogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>
                    facebook
                </h1>
                <button className={styles.white_btn} onClick={handlelogout}>
                    logout
                </button>
            </nav>
        </div>
    )
}

export default Main;
