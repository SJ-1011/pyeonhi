import React, { useState, useEffect } from 'react';
import '../css/ProductList.css';
import axios from "axios";

const ProductList = ({ conv, searchTerm, search}) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(conv);
    const [currentPage, setCurrentPage] = useState(1);
    const [head, setHead] = useState(0);
    const [tail, setTail] = useState(15);
    const [clickedPage, setClickedPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [pageLength, setPageLength] = useState(0);

    // setPageCount(0);


    const handlePageClick = (page) => {
        console.log('Clicked page:', page);
        setCurrentPage(page);
        setHead(page * 15 - 15);
        setTail(page * 15);
        setClickedPage(page); // 클릭된 페이지 업데이트
    };

    const handleNextPage = () => {
        console.log(pageCount);
        if (conv == 'cu'){
            if (pageCount < 1){
                setPageCount(pageCount+1);
                handlePageClick((pageCount+1)*10+1);
            }
        }
        else{
            if (pageCount < 2){
                setPageCount(pageCount+1);
                handlePageClick((pageCount+1)*10+1);
            }
        }
      };
    
    const handlePrevPage = () => {
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
            // console.log(response.data.length);
            setPageLength(parseInt(response.data.length / 15 + 1));
            // console.log(pageLength);
        }).catch(function (e) {
            console.log(e);
            setLoading(true);
        });
    }
        else{
            console.log('검색 목록 출력.');
            setProductList(searchTerm);
            setLoading(false);
            setPageLength(parseInt(searchTerm.length / 15 + 1));
            // console.log(pageLength);
        }
    }, [conv, currentPage, searchTerm]);



    if (loading) {
        return <div className="product-list-container">로딩중...</div>;
    } else {
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
                        <div>{product.event == '1+1' || '1 + 1' ? '1+1' : '일반'}</div>
                    </div>
                ))}
                <div className="pagination">
                {/* < 버튼 */}
                <button className="arrow" onClick={() => handlePrevPage()}>&lt;</button>
                {/* 1 ~ 10까지 페이지 버튼 */}
                {/* page는 0 ~ 9까지 순서대로의 수 -> +1을 해야함. */}
                    {[...Array(pageLength - pageCount * 10 > 10 ? 10 : pageLength - pageCount * 10).keys()].map((page) => (
                        <button
                        // key={page + 1}
                        onClick={() => handlePageClick(page + pageCount * 10 + 1)}
                        className={`pageButton ${clickedPage === page + pageCount * 10 + 1 ? 'clicked' : ''}`}
                    >
                            {page + pageCount * 10 + 1}
                        </button>
                    ))}
                {/* > 버튼 */}
                <button className="arrow" onClick={() => handleNextPage()}>&gt;</button>
                </div>
            </div>
        );
    }

};

export default ProductList;
