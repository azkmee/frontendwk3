import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../service/auth.service';
import { ShoppingCartItem } from './shoppingcart';


export const ListingCart = (props) => {

    const calculateCartTotal = ()=> {
        let total = 0;
        props.carts.map(item => {total = total + (item.quantity * item.listing.price)})

        return total;
    }
    const token = useContext(AuthContext);

    const handleDelete = async (id) => {
        console.log(id)
        await props.deleteFromCart(token,id)
        await props.updateCart(token)
    }

    return (
        <div>
            {props.carts.map(cart => (
                <ShoppingCartItem 
                    title= {cart.listing.title}
                    price= {cart.listing.price}
                    imgUrl= {cart.listing.imageUrl}
                    quantity= {cart.quantity}
                    key= {cart.listing._id}
                    onButtonClick = {() => handleDelete(cart.listing._id)}
                    />
                )
            )}

            <div className="
                flex-shrink-0
                px-4
                py-4
                flex
                justify-end
                border-t border-gray-200
            ">
                <span>Total <span className="text-3xl">$<span>{calculateCartTotal()}</span></span></span>
            </div>
        </div>
    )
}