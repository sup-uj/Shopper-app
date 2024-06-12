import React from 'react';


let Categories = ['Furniture', 'Stationary', 'Electronics', 'Coolers', 'Books', 'Cycle'];
const Category = (props) => {
    return (
        <div className="fixed top-0 w-[100%] mt-[73px] bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-xl whitespace-nowrap dark:text-white"> All Categories</span>
                </a>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    {Categories && Categories.length > 0 && Categories.map((item, index) => {
                        return (
                            <span
                                onClick={() => {
                                    props.filters && props.filters(item)
                                }}
                                className='p-5 cursor-pointer'>{item}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Category;
