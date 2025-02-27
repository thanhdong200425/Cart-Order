import { useState, useEffect } from "react";
import MainContainer from "../../components/layouts/main/MainContainer";
import ProductList from "../../components/main/ProductList";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { toast } from "react-toastify";
import FilterList from "../../components/main/FilterList";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(SERVER_URL + "/", {
                    params: {
                        page: currentPage,
                    },
                });
                setProducts(response.data.productList);
                setLoading(false);
            } catch (error) {
                console.log("Error in fetchProducts: " + error);
                if (error.response.status === 500) toast.error("Sorry, we encountered a problem!");
                else toast.error(error.response.data.error);
                return;
            }
        };
        fetchProducts();
    }, [currentPage]);

    return (
        <MainContainer>
            <div className="flex">
                <div className="w-64 shrink-0 mr-3 py-8 pl-6">
                    <FilterList />
                </div>
                <div className="flex-grow">
                    <ProductList products={products} loading={loading} />
                </div>
            </div>
        </MainContainer>
    );
};

export default HomePage;
