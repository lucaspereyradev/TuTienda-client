import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CardDesing from './CardDesing';
import MapProductsAndCategory from './MapProductsAndCategory';

export default function FilterProductsAndSearch() {
    const [category, setCategory] = useState('0');
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);

    let render;
    let productsFiltered = [];

    useEffect(() => {
        async function productsDB() {
            const res = await axios.get(
                'https://api-ecommerce-tutienda.up.railway.app/v0/product/'
            );
            setProducts(res.data.data);
        }
        productsDB();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInApp');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user.user);
        }
    }, []);

    function handleChangeCategory(event) {
        setCategory(event.target.value);
    }

    switch (category) {
        case '0':
            render = <MapProductsAndCategory category="0" />;
            break;
        case '1':
            render = <MapProductsAndCategory category={category} />;
            break;
        case '2':
            render = <MapProductsAndCategory category={category} />;
            break;
        case '3':
            render = <MapProductsAndCategory category={category} />;
            break;
    }

    if (search) {
        productsFiltered = products.filter((product) =>
            product.name.toLowerCase().includes(search)
        );
    }

    return (
        <>
            <div className="container lg:flex m-auto max-w-[70%] mb-16">
                <div className="grid grid-cols-1 xl:grid-cols-2 w-full max-xl:gap-y-10">
                    <div className="flex max-lg:flex-wrap gap-2.5 xl:transform xl:-translate-x-10 2xl:-translate-x-0 max-xl:mx-auto">
                        <button onClick={handleChangeCategory} className="buttons-filter" value="0">
                            Todos los productos
                        </button>
                        <button onClick={handleChangeCategory} className="buttons-filter" value="1">
                            Celulares
                        </button>
                        <button onClick={handleChangeCategory} className="buttons-filter" value="3">
                            Computadoras
                        </button>
                        <button onClick={handleChangeCategory} className="buttons-filter" value="2">
                            Tablets
                        </button>
                    </div>
                    <div className="lg:ml-auto max-lg:m-auto flex flex-wrap gap-2 xl:transform xl:translate-x-10 2xl:translate-x-0 max-xl:mx-auto">
                        {user ? (
                            <>
                                <Link to="/addproducts" className="m-auto">
                                    <button className="text-white bg-violet-600 hover:bg-violet-600/80 px-4 py-2 rounded-md shadow-lg shadow-gray-400/80">
                                        Añadir Producto
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="m-auto">
                                    <button className="text-white bg-violet-600 hover:bg-violet-600/80 px-4 py-2 rounded-md shadow-lg shadow-gray-400/80">
                                        Añadir Producto
                                    </button>
                                </Link>
                            </>
                        )}

                        <input
                            className="max-lg:m-auto lg:ml-1 bg-slate-200 py-2 px-4 rounded-md shadow-lg shadow-gray-400/40 focus:"
                            placeholder="Buscar..."
                            onChange={(event) => {
                                setSearch(event.target.value.toLowerCase());
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="container w-[100%] sm:w-[95%] md:w-[80%] mb-36 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-14 xl:gap-x-0 xl:w-[70%] gap-y-6 m-auto">
                {search
                    ? productsFiltered.map((product) => {
                          return (
                              <CardDesing
                                  id={product.id}
                                  key={product.id}
                                  item={product}
                                  image={product.image}
                                  name={product.name}
                                  description={product.description}
                                  price={product.price}
                              />
                          );
                      })
                    : render}
            </div>
        </>
    );
}
