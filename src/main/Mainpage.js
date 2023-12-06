import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductList from "./ProductList";
import "../css/Mainpage.css"

function Mainpage(props) {
    const [activeTab, setActiveTab] = useState('cu');

    const renderList = () => {
        switch (activeTab) {
            case 'cu':
                console.log("cu");
                return <ProductList conv={activeTab}/>;
            case 'emart':
                console.log("emart");
                return <ProductList conv={activeTab}/>;
            default:
                return <ProductList conv={'cu'}>리스트 선택</ProductList>;
        }
    };

    return (
        <div className="container">
            <header>
                <h1>편의점 상품</h1>
            </header>
            <nav>
                <button onClick={() => setActiveTab('cu')}>CU</button>
                <button onClick={() => setActiveTab('emart')}>Emart</button>
            </nav>
            <main>
                {renderList()}
            </main>
        </div>
    )
}

export default Mainpage;