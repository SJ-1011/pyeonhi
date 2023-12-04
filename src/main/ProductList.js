import React, { useState, useEffect } from 'react';
import '../css/ProductList.css';
import axios from "axios"; // CSS 파일을 import 합니다.

const ProductList = ({ conv }) => {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(conv);

    useEffect(() => {
        axios.get(`http://localhost:4000/main/list/${conv}`).then(function (response) {
            setProductList(response.data);
            setLoading(false);
        }).catch(function (e) {
            console.log(e);
            setLoading(true);
        })
    }, [conv]);

    if (loading) {
        return <div className="product-list-container">로딩중...</div>;
    }
    else {
        return (
            <div className="product-list-container">
                <div className="product-header">
                    <div>이미지</div>
                    <div>상품명</div>
                    <div>가격</div>
                    <div>이벤트 여부</div>
                </div>
                {productList.map((product, index) => (
                    <div key={index} className="product-row">
                        <div><img src={product.image} alt={product.name} onError={
                            (e) => e.target.src = './notFound.png'} /></div>
                        <div>{product.name}</div>
                        <div>{product.price}원</div>
                        <div>{product.event === '1+1' ? '1+1' : '일반'}</div>
                    </div>
                ))}
            </div>
        );

    }
};

export default ProductList;
