const CartItem = ({ item, onIncreaseQuantity, onDecreaseQuantity }) => {
    const { image, name, price, quantity, description } = item;

    return (
        <div className="flex items-center justify-between p-5 transition-colors hover:bg-gray-50">
            <div className="flex items-center space-x-4 flex-grow">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 shadow-sm">
                    <img src={image} alt={name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                </div>

                <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-1">{name}</h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">{description}</p>
                    <div className="text-blue-600 font-bold">${price.toFixed(2)}</div>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <button onClick={() => onDecreaseQuantity(item.id)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200" aria-label="Decrease quantity">
                    <span className="text-lg font-medium">-</span>
                </button>

                <span className="w-8 text-center font-medium text-gray-800">{quantity}</span>

                <button onClick={() => onIncreaseQuantity(item.id)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200" aria-label="Increase quantity">
                    <span className="text-lg font-medium">+</span>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
