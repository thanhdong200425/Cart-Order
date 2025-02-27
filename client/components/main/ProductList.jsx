import Product from "./Product";

const ProductList = ({ loading, products, style }) => {
    return (
        <div className={`container mx-auto px-4 py-8 ${style}`}>
            {loading ? (
                <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-15 w-15 border-t-2 border-b-2 border-indigo-600"></div>
                    <p className="mt-2 text-3xl text-gray-600">Loading products...</p>
                </div>
            ) : (
                <>
                    {/* Product list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
