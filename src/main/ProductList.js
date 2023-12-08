import React, { useState, useEffect } from 'react';
import '../css/ProductList.css';
import axios from "axios";

const ProductList = ({ conv, searchTerm, search }) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(conv);
    const [currentPage, setCurrentPage] = useState(1);
    const [head, setHead] = useState(0);
    const [tail, setTail] = useState(15);
    const [clickedPage, setClickedPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);


    const handlePageClick = (page) => {
        console.log('Clicked page:', page);
        setCurrentPage(page);
        setHead(page * 15 - 15);
        setTail(page * 15);
        setClickedPage(page); // 클릭된 페이지 업데이트
    };

    const handleNextPageCU = () => {
        console.log(pageCount);
        if (pageCount < 1){
            setPageCount(pageCount+1);
            handlePageClick((pageCount+1)*10+1);
        }
      };
    
    const handlePrevPageCU = () => {
        if (pageCount > 0){
            setPageCount(pageCount-1);
            handlePageClick((pageCount-1)*10+10);
        }
     };

     const handleNextPageEmart = () => {
        console.log(pageCount);
        if (pageCount < 2){
            setPageCount(pageCount+1);
            handlePageClick((pageCount+1)*10+1);
        }
      };
    
    const handlePrevPageEmart = () => {
        if (pageCount > 0){
            setPageCount(pageCount-1);
            handlePageClick((pageCount-1)*10+10);
        }
     };

    useEffect(() => {
        if (search == false) {
        axios.get(`http://localhost:4000/main/list/${conv}`).then(function (response) {
            // ProductList에 DB의 내용 삽입
            setProductList(response.data);
            setLoading(false);
            console.log('전체 목록 출력.');
            // console.log(response.data);
        }).catch(function (e) {
            console.log(e);
            setLoading(true);
        });
    }
        else{
            console.log('검색 목록 출력.');
            setProductList(searchTerm);
            setLoading(false);
        }
    }, [conv, currentPage, searchTerm]);



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
                    <button className="arrow" onClick={() => handlePrevPageCU()}>&lt;</button>
                        {[...Array(pageCount == 0 ? 10 : 9).keys()].map((page) => (
                            <button
                            key={page + pageCount * 10 + 1}
                            onClick={() => handlePageClick(page + pageCount * 10 + 1)}
                            className={`pageButton ${clickedPage === page + pageCount * 10 + 1 ? 'clicked' : ''}`}
                        >
                                {page + pageCount * 10 + 1}
                            </button>
                        ))}
                    <button className="arrow" onClick={() => handleNextPageCU()}>&gt;</button>
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
                            <div>{product.event === '1 + 1' ? '1+1' : '일반'}</div>
                        </div>
                    ))}
                    <div className="pagination">
                    <button className="arrow" onClick={() => handlePrevPageEmart()}>&lt;</button>
                        {[...Array(pageCount === 0 ? 10 : (pageCount === 1 ? 10 : 2)).keys()].map((page) => (
                            <button
                            key={page + pageCount * 10 + 1}
                            onClick={() => handlePageClick(page + pageCount * 10 + 1)}
                            className={`pageButton ${clickedPage === page + pageCount * 10 + 1 ? 'clicked' : ''}`}
                        >
                                {page + pageCount * 10 + 1}
                            </button>
                        ))}
                    <button className="arrow" onClick={() => handleNextPageEmart()}>&gt;</button>
                    </div>
                </div>
            );
        }
    }

};

export default ProductList;
