import React, { useContext, useEffect } from 'react'
import { Listings } from "../components/listings"
import { EmptyShoppingCart } from '../components/emptycart';
import { ListingCart } from '../components/listingcart';
import { ShoppingCartHeader } from '../components/shoppingcardheader';
import { AuthContext } from '../service/auth.service';

const getListings = (page=1) =>
  fetch(`https://ecomm-service.herokuapp.com/marketplace?page=${page}`).then((res) => res.json());


const addToCart = async (token, id, quantity=1) => {
    
    const accessToken = token.accessToken

    if (accessToken){
        return fetch(`https://ecomm-service.herokuapp.com/marketplace/cart/items`,{
        method:'POST',
        body: JSON.stringify({
            listingId:id,
            quantity,
        }),
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
    }).then(res=>res.json())
    }
    else{
        throw new Error('Unauthorized. Please log in')
    }
    
}

const getAllCarts = async (token) => {
    const accessToken = token.accessToken

    if (accessToken){
        return fetch(`https://ecomm-service.herokuapp.com/marketplace/cart/items`,{
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
        }).then(res=>res.json())
    }

    else{
        throw new Error('Unauthorized. Please log in')
    }
}

const deleteFromCart = async (token, id) => {
    const accessToken = token.accessToken

    if (accessToken){
        return fetch(`https://ecomm-service.herokuapp.com/marketplace/cart/items/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
        }).then(res=>res.json())
    }

    else{
        throw new Error('Fail to delete.')
    }
}


export const Marketplace = () => {

    const [listings, setListings] = React.useState()
    const [carts, setCarts] = React.useState([]);

    const token = useContext(AuthContext)

    const handleAddToCart = async (token, id, quantity) => {
        await addToCart(token, id, quantity);
        await updateCart(token)
    }

    const updateCart = async(token) => {
        const allCarts = await getAllCarts(token)
        setCarts(allCarts);
    }
    
    const fetchListing = async () => {
        getListings().then((listings) => {
            setListings(listings)})
    }  

    if (!listings) {fetchListing()}

    useEffect(() => {
        updateCart(token);
    })

    return (
    <div className='bg-gray-50 lg:flex'>
        <div className='flex-1'>
            <div className='max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8'>
                
                {/* header */}
                <div className="sm:flex sm:flex-col sm:align-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                    Marketplace
                    </h1>
                </div>

                {/* listings */}
                <div className="
                    grid
                    md:grid-cols-2
                    gap-x-4 gap-y-8
                    xl:grid-cols-3 xl:gap-x-6
                    ">
                        { listings && 
                            listings.map( (list) => {
                                // console.log(list);
                                return(
                                <Listings 
                                    imgUrl = {list.imageUrl}
                                    price = {list.price}
                                    numOfStock = {list.numOfStock}
                                    title = {list.title}
                                    desc = {list.description} 
                                    uid = {list._id}
                                    key = {list._id}
                                    onButtonClick = {()=> handleAddToCart(token, list._id)}
                                    />
                            )})}
                    </div>  
            </div>
        </div>
        

        {/* cart */}
        <ShoppingCartHeader>
            { carts.length !== 0 ? 
                <ListingCart
                    setCarts = {setCarts}
                    carts = {carts}
                    deleteFromCart = {deleteFromCart}
                    updateCart = {updateCart}/> : 
                <EmptyShoppingCart/> }
        </ShoppingCartHeader>
    </div>
    )
}

