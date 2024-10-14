import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import { useNavigate } from 'react-router-dom';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const navigate = useNavigate();

  // State for selected sorting option and dropdown visibility
  const [sortOption, setSortOption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to handle sorting by price
  const handleSortByPrice = (option) => {
    setSortOption(option);  // Set the selected sort option ('lowToHigh' or 'highToLow')
    setDropdownVisible(false); // Close the dropdown after selecting an option
  };

  // Function to handle "Explore More" button
  const handleExploreMore = () => {
    navigate('/womens');
  };

  // Sort products based on the selected sorting option
  const sortedProducts = [...all_product].filter(item => item.category === props.category).sort((a, b) => {
    if (sortOption === 'lowToHigh') {
      return a.new_price - b.new_price;  // Sort by price low to high
    } else if (sortOption === 'highToLow') {
      return b.new_price - a.new_price;  // Sort by price high to low
    } else {
      return 0;  // Default no sorting
    }
  });

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />

      {/* Sort by price dropdown */}
      <div className="shopcategory-sort-dropdown">
        <button 
          className="shopcategory-sort-button" 
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          Sort by Price <img src={dropdown_icon} alt="" />
        </button>
        {dropdownVisible && (
          <div className="shopcategory-dropdown-content">
            <button onClick={() => handleSortByPrice('lowToHigh')}>Price: Low to High</button>
            <button onClick={() => handleSortByPrice('highToLow')}>Price: High to Low</button>
          </div>
        )}
      </div>

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {sortedProducts.length}</span> products
        </p>
      </div>

      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      {/* "Explore More" Button */}
      <div className="shopcategory-loadmore" onClick={handleExploreMore}>
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
