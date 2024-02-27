import React, { useState, useEffect } from 'react';
 import Button from 'react-bootstrap/Button';
 import Card from 'react-bootstrap/Card';
import styles from './styles.module.css'; 

const Main = () => {
    const [records, setRecords] = useState([]);
    const [quantities, setQuantities] = useState([]); 
    const [price, setPrice] = useState(0); // Initialize price state with 0


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
         // Calculate new price based on quantity and product price
         const productPrice = records[index].price;
         setPrice(prevPrice => prevPrice + productPrice);
    };

    const decreaseQuantity = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 0) {
            newQuantities[index]--;
            setQuantities(newQuantities);

            const productPrice = records[index].price;
            setPrice(prevPrice => prevPrice - productPrice);
        }
    };
    const checkout = () => {

        const items = records.map((record, index) => ({
                    id: record._id,
                    name: record.productname,
                    quantity: quantities[index],
                    price: record.price * quantities[index]
                }))
                .filter(item => item.quantity > 0);
                console.log(items,"heloooo");

        fetch(`http://localhost:5000/create-checkout-session`, {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          mode:"cors",
          body: JSON.stringify({
            items: items
            
          })
        
        })
        .then(async res => {
          if (res.ok) return res.json()
          const json = await res.json();
            return await Promise.reject(json);
        })
        .then(({url})=>{
          window.location = url
        })
        .catch(e => {
          console.log(e.error)
        })
      }
   
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
                       <h6>Price: ₹ {record.price}/-</h6>
                       {/* <h5>TOTAL: ₹ {record.price * quantities[index]}/-</h5> */}
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
                <div className={styles.total_price}>
                Total Price: ₹ {price}
                <Button variant="primary" onClick={checkout}>payment</Button>
            </div>
            
        </div>
    );
}
export default Main;

