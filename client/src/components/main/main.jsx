import React, { useState, useEffect } from 'react';
 import Button from 'react-bootstrap/Button';
 import Card from 'react-bootstrap/Card';
import styles from './styles.module.css'; 
const Main = () => {
    const [records, setRecords] = useState([]);
    const [quantities, setQuantities] = useState([]); 

    useEffect(() => {
        fetch("http://localhost:5000/api/user/getprodcuts")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data.allproducts);
                setRecords(data.allproducts);
                setQuantities(data.allproducts.map(() => 0));

            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    const increaseQuantity = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
    };

    const decreaseQuantity = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 0) {
            newQuantities[index]--;
            setQuantities(newQuantities);
        }
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>
                SportSync
                </h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            {records.map((record, index) => (
                     <div className='d-inline-flex p-2'key={record._id} >
                     <Card  className='shadow p-3 mb-2 bg-body-tertiary rounded' style={{ width: '13rem', justifyContent:'center'}}>
                     <Card.Img className='p-2'variant="top" src={record.productimage} style={{ width: '190px', height: '200px' }}/>
                     <Card.Body>
                       <Card.Title className='text-info'>{record.productname}</Card.Title>
                       <h5>Price: ₹ {record.price}/-</h5>
                       <div>
                       <p>
                                    Qty:
                                    <Button className='m-1' onClick={() => decreaseQuantity(index)}>-</Button>
                                    {quantities[index]}
                                    <Button className='m-1' onClick={() => increaseQuantity(index)}>+</Button>
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

