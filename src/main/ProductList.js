import React, { useState, useEffect } from 'react';
import '../css/ProductList.css';
import axios from "axios";

const ProductList = ({ conv }) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(conv);
    const [currentPage, setCurrentPage] = useState(1);
    const [head, setHead] = useState(0);
    const [tail, setTail] = useState(20);
    const [clickedPage, setClickedPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);


    const handlePageClick = (page) => {
        console.log('Clicked page:', page);
        setCurrentPage(page);
        setHead(page * 20 - 20);
        setTail(page * 20);
        setClickedPage(page); // 클릭된 페이지 업데이트
    };

    const handleNextPage = () => {
        console.log(pageCount);
        if (pageCount < 1){
            setPageCount(pageCount+1);
            handlePageClick(11);
        }
      };
    
    const handlePrevPage = () => {
        if (pageCount > 0){
            setPageCount(pageCount-1);
            handlePageClick(10);
        }
     };

    useEffect(() => {
        axios.get(`http://localhost:4000/main/list/${conv}?page=${currentPage}`).then(function (response) {
            // ProductList에 DB의 내용 삽입
            setProductList(response.data);
            setLoading(false);
        }).catch(function (e) {
            console.log(e);
            setLoading(true);
        });
    }, [conv, currentPage]);



    if (loading) {
        return <div className="product-list-container">로딩중...</div>;
    } else {
        if (conv == 'cu'){
            return (
                <div className="product-list-container">
                    <div className="product-header">
                        <div>이미지</div>
                        <div>상품명</div>
                        <div>가격</div>
                        <div>이벤트 여부</div>
                    </div>
                    {productList.slice(head, tail).map((product, index) => (
                        <div key={index} className="product-row">
                            <div>
                                <img src={product.image} alt={product.name} onError={(e) => e.target.src = './notFound.png'} />
                            </div>
                            <div>{product.name}</div>
                            <div>{product.price}원</div>
                            <div>{product.event === '1+1' ? '1+1' : '일반'}</div>
                        </div>
                    ))}
                    <div className="pagination">
                    <button className="arrow" onClick={() => handlePrevPage()}>&lt;</button>
                        {[...Array(pageCount == 0 ? 10 : 4).keys()].map((page) => (
                            <button
                            key={page + pageCount * 10 + 1}
                            onClick={() => handlePageClick(page + pageCount * 10 + 1)}
                            className={`pageButton ${clickedPage === page + pageCount * 10 + 1 ? 'clicked' : ''}`}
                        >
                                {page + pageCount * 10 + 1}
                            </button>
                        ))}
                    <button className="arrow" onClick={() => handleNextPage()}>&gt;</button>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="product-list-container">
                    <div className="product-header">
                        <div>이미지</div>
                        <div>상품명</div>
                        <div>가격</div>
                        <div>이벤트 여부</div>
                    </div>
                    {productList.slice(head, tail).map((product, index) => (
                        <div key={index} className="product-row">
                            <div>
                                <img src={product.image} alt={product.name} onError={(e) => e.target.src = './notFound.png'} />
                            </div>
                            <div>{product.name}</div>
                            <div>{product.price}원</div>
                            <div>{product.event === '1+1' ? '1+1' : '일반'}</div>
                        </div>
                    ))}
                    <div className="pagination">
                    <button className="arrow" onClick={() => handlePrevPage()}>&lt;</button>
                        {[...Array(pageCount == 0 ? 10 : 6).keys()].map((page) => (
                            <button
                            key={page + pageCount * 10 + 1}
                            onClick={() => handlePageClick(page + pageCount * 10 + 1)}
                            className={`pageButton ${clickedPage === page + pageCount * 10 + 1 ? 'clicked' : ''}`}
                        >
                                {page + pageCount * 10 + 1}
                            </button>
                        ))}
                    <button className="arrow" onClick={() => handleNextPage()}>&gt;</button>
                    </div>
                </div>
            );
        }
    }

};

export default ProductList;
