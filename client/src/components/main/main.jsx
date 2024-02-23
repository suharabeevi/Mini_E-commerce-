



// export default Main;
import React, { useState, useEffect } from 'react';
 // Assuming you're using Bootstrap componentsimport Button from 'react-bootstrap/Button';
 import Button from 'react-bootstrap/Button';
 import Card from 'react-bootstrap/Card';

import styles from './styles.module.css'; // Assuming you have a CSS module for styling

const Main = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/user/getprodcuts")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data.allproducts);
                setRecords(data.allproducts);
            })
            .catch(err => console.log(err));
    }, []);
     // Empty dependency array ensures the effect runs only once on mount
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>
                    Sportraa
                </h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            {records.map((record, index) => (
                     <div className='d-inline-flex p-2' >
                     <Card  className='shadow p-3 mb-2 bg-body-tertiary rounded' style={{ width: '13rem' }}>
                     <Card.Img className='p-2'variant="top" src={record.productimage} />
                     <Card.Body>
                       <Card.Title className='text-info'>{record.productname}</Card.Title>
                       
                       <h5>Price:{record.price}</h5>
                       <div>
                         <p>
                           Qty:<Button className='m-1'>+</Button>0<Button className='m-1'>-</Button>
                         </p>
                       </div>
                       <Button variant="primary">Add to cart</Button>
                     </Card.Body>
                   </Card>
                   </div>
                ))}
        </div>
    );

    
}

export default Main;

