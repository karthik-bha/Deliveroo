import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
    
    const { food_list } = useContext(StoreContext);
    
    return (
      <div className=" mx-2">
        <h2 className="text-[24px] md:text-4xl my-4 md:my-6 font-[500]">
          Top dishes near you
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      </div>
    );
}

export default FoodDisplay
