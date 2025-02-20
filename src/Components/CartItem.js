import React, {useState, useEffect} from 'react'

import {BiMinus,BiPlus} from "react-icons/bi"
import {motion} from "framer-motion"
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/Reducer'

const CartItem = ({item, setFlag, flag}) => {

    const [qty, setQty] = useState(item.qty)
    const [items, setItems] = useState([])
    const [{cartItems}, dispatch] = useStateValue();


    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: actionType.SET_CART_ITEMS  ,
            cartItems : items ,
        });
    }

    const updateQty = (action,id) => {
        if(action === "add"){
            setQty(qty + 1)
            cartItems.map(item => {
                if(item.id === id){
                    item.qty += 1;
                    setFlag(flag + 1);
                }
            });
            cartDispatch();
        }else{
            //initial state value is 1 so u need to check if 1 then remove it 
            if(qty === 1){
                setItems(cartItems.filter((item) => item.id !== id))
                setFlag(flag + 1)
                cartDispatch();
            }else{
                setQty(qty-1);
                cartItems.map(item => {
                    if(item.id === id){
                        item.qty -= 1;
                        setFlag(flag + 1)
                    }
                });
                cartDispatch();

            }
        }
    }

// we use useEffect hook  to monitor the empty array

// if there is any change in the qty get the cartItems and assign it to the items
    useEffect(() => {
        setItems(cartItems)
    }, [qty])




  return (
    <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2  '>
    <img src={item?.imageURL}
    className="w-20 h-20 max-w-[60px] rounded-full object-contain" alt='' />


{/* Name section */}
<div className='flex flex-col  gap-2'>
<p className='text-base text-gray-50'>{item?.title}</p>

{/* For updating the cost based on no of items  */}
<p className='text-sm block text-gray-300 font-semibold'>₹{parseFloat(item?.price) * qty}</p> 
</div>
  

{/* Button section */}
<div className='group flex items-center gap-2 ml-auto ursor-pointer '>
<motion.div whileTap={{scale:0.75}} onClick={() => updateQty("remove", item?.id)}>
        <BiMinus className="text-gray-50" />
</motion.div>


<p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center '>{qty}</p>


<motion.div whileTap={{scale:0.75}} onClick={() => updateQty("add", item?.id)}>
<BiPlus className="text-gray-50 " />
</motion.div>
</div>





</div>
  )
}

export default CartItem