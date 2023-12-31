import React, { useEffect, useState } from 'react'
import Productdetail from '../data/productdetail'
import { AiOutlineShoppingCart, AiOutlineEye, AiOutlineHeart, AiOutlineCloseCircle, AiFillDelete } from 'react-icons/ai'
import { BsDatabaseAdd } from 'react-icons/bs'
import { useAuth0 } from "@auth0/auth0-react"
import './product.css'

const Product = ({ product, setProduct, detail, view, close, setClose, addToCart }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    // handle deleting products
    const [deletedProducts, setDeletedProducts] = useState([]);
    const deleteProduct = async (productId) => {
        const shouldDelete = window.confirm('Do you want to delete this product?');
        if (shouldDelete) {
            try {
                // Make a DELETE request to your server's endpoint
                await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                });

                // Update state or perform any other actions as needed
                setDeletedProducts((prevDeleted) => [...prevDeleted, productId]);
            } catch (error) {
                console.error('Error deleting product:', error);
                // Handle the error appropriately
            }
        }
    };

    // handle modifying product quantity
    const modifyQuantity = async (productId) => {
        const newQuantity = prompt('Enter the new quantity:');

        // Check if the user entered a value and clicked OK
        if (newQuantity !== null) {
            try {
                // Make a PUT request to your server's endpoint to update the quantity
                await fetch(`/api/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ available: parseInt(newQuantity, 10) }),
                });
            } catch (error) {
                console.error('Error modifying quantity:', error);
                // Handle the error appropriately
            }
        }
    };


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const isAdmin = (isAuthenticated && user.name === 'admin@gmail.com');

    const filteredProduct = (product) => {
        const update = Productdetail.filter((p) => p.Cat === product || p.Brand === product);
        setProduct(update);
    };
    const AllProducts = () => {
        setProduct(Productdetail);
    };

    return (
        <>
            {

                close ?
                    <div className='productDetail'>
                        <div className='container'>
                            <button onClick={() => setClose(false)} className='closebtn'><AiOutlineCloseCircle /></button>
                            {
                                detail.map((p) => {
                                    return (
                                        <div className='productBox'>
                                            <div className='img_box'>
                                                <img src={p.Img} alt={p.Title} />
                                            </div>
                                            <div className='detail'>
                                                <h2>{p.Title}</h2>
                                                <p>{p.Describe}</p>
                                                <h3>{p.Price} đ</h3>
                                                {
                                                    isAdmin && <h3>Quantity in stock: {p.Available}</h3>
                                                }
                                                {
                                                    !isAdmin && <button onClick={() => addToCart(p)}>Add to cart</button>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    : null
            }

            <div className='products'>
                <h3>Products</h3>
                <p>Home . product</p>
                <div className='container'>
                    <div className='filter'>
                        <div className='categories'>
                            <h3>Categories</h3>
                            <ul>
                                <li onClick={() => AllProducts("Gaming")}>All products</li>
                                <li onClick={() => filteredProduct("Gaming")}>Gaming laptop</li>
                                <li onClick={() => filteredProduct("Office")}>Office laptop</li>
                                <li onClick={() => filteredProduct("Highend")}>High quality laptop</li>
                            </ul>
                            <h3>Brands</h3>
                            <ul>
                                <li onClick={() => filteredProduct("Lenovo")}>Lenovo</li>
                                <li onClick={() => filteredProduct("Asus")}>Asus</li>
                                <li onClick={() => filteredProduct("HP")}>HP</li>
                                <li onClick={() => filteredProduct("Macbook")}>Macbook</li>
                                <li onClick={() => filteredProduct("Dell")}>Dell</li>
                                <li onClick={() => filteredProduct("Acer")}>Acer</li>
                            </ul>
                        </div>
                    </div>
                    <div className='productbox'>
                        <div className='content'>
                            {
                                currentProducts.map((elm) => {
                                    if (deletedProducts.includes(elm.id)) {
                                        return null; // Skip rendering the deleted product
                                    }

                                    return <>
                                        <div className='box' key={elm.id}>
                                            <div className='img_box'>
                                                <img src={elm.Img} alt={elm.Title} />
                                                <div className='icon'>
                                                    {
                                                        isAuthenticated ?
                                                            (!isAdmin && <li onClick={() => addToCart(elm)}><AiOutlineShoppingCart /></li>)
                                                            :
                                                            <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                                                    }
                                                    {
                                                        !isAdmin && <>
                                                            <li><AiOutlineHeart /></li>
                                                        </>
                                                    }
                                                    {
                                                        isAdmin && <>
                                                            <li onClick={() => deleteProduct(elm.id)}><AiFillDelete /></li>
                                                            <li onClick={() => modifyQuantity(elm.id)}><BsDatabaseAdd /></li>
                                                        </>
                                                    }
                                                    <li onClick={() => view(elm)}><AiOutlineEye /></li>
                                                </div>
                                            </div>
                                            <div className='detail'>
                                                <h3>{elm.Title}</h3>
                                                <h4>{elm.Price} đ</h4>
                                            </div>
                                        </div>
                                    </>
                                })
                            }
                        </div>
                        <div className='pagination'>
                            <ul>
                                {Array.from({ length: Math.ceil(product.length / productsPerPage) }, (_, i) => (
                                    <li key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                                        {i + 1}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product