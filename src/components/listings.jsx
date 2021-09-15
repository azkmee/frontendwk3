import React, { useContext } from 'react'
import { AuthProvider } from '../service/auth.service';


export const Listings = (props) => {

    // imgUrl
    // price
    // numOfStock
    // [onlyone]
    // title
    // desc
    // console.log(props)

    const currItem = {
        key: props.uid,
        title: props.title,
        price: props.price,
        imgUrl: props.imgUrl,
    }

    const AuthAcessToken = useContext(AuthProvider)

    return (
        <div className="relative flex flex-col">
            <div className="
                group
                block
                w-full
                rounded-lg
                bg-gray-100
                focus-within:ring-2
                focus-within:ring-offset-2
                focus-within:ring-offset-gray-100
                focus-within:ring-pink-500
                overflow-hidden
                ">
                <img src={props.imgUrl} alt="" 
                    className="
                        object-cover
                        pointer-events-none
                        group-hover:opacity-75
                        h-48
                        w-full
                    "/>
                <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for Nike Air 2021</span>
                </button>

            </div>
            <div className="
                flex-1 flex
                md:flex-col
                justify-between
                items-start
                md:items-stretch
                gap-3
                px-2
            ">
                <div className="mt-1 flex-1">
                    <div className="flex justify-between items-center gap-3">
                        <div>$ <span className="text-2xl font-bold">{props.price}</span></div>

                        {props.numOfStock !== 1 ? 
                            <div className="text-sm text-gray-500">{props.numOfStock ||'Limited'} piece available</div> :
                            <span class="
                                    inline-flex
                                    items-center
                                    px-2.5
                                    py-0.5
                                    rounded-full
                                    text-xs
                                    font-medium
                                    bg-red-100
                                    text-red-800
                                ">
                                Only One
                                </span>}
                        {/* <div className="text-sm text-gray-500">{props.numOfStock} piece available</div> */}
                    </div>
                    <p className="
                        block
                        text-sm
                        font-medium
                        text-gray-900
                        truncate
                        pointer-events-none
                    ">
                    {props.title}
                    </p>
                    <p className="
                        block
                        text-sm
                        font-medium
                        text-gray-500
                        pointer-events-none
                    ">
                    {props.desc}
                    </p>
                </div>
                        
                <div className="flex flex-col md:flex-row gap-3 py-3">
                    <button type="button" className="
                        js-add-to-cart-btn
                        inline-flex
                        justify-center
                        items-center
                        py-2
                        px-4
                        border border-transparent
                        shadow-sm
                        text-sm
                        font-medium
                        rounded-md
                        text-white
                        bg-pink-600
                        hover:bg-pink-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-pink-500
                        "
                        onClick = {() => (props.onButtonClick(AuthAcessToken ,currItem))}>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>


    )
}

