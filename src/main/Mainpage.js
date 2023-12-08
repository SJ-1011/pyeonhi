import React, {useEffect, useState} from 'react';
import ProductList from "./ProductList";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/Mainpage.css";

function Mainpage(props) {
    const [activeTab, setActiveTab] = useState('cu');
    const [loginState, setLoginState] = useState(false);
    const [userName, setUserName] = useState('null');
    const [searchProduct, setSearchProduct] = useState([]);
    const [searchState, setSearchState] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSearchTerm = async () => {
        alert(searchTerm);
        try {
            const response = await axios.post('http://localhost:4000/search', {
                searchTerm,
                activeTab,
            });
            console.log(response.data.success);
            if (response.data.success == true){
                // console.log(response.data.product);
                setSearchProduct(response.data.product);
                setSearchState(true);
                // console.log('여기부터 시작');
                // console.log(`가격 ${searchProduct[0].price}`);
                
                // console.log(searchProduct);
            }
          } catch (error) {
            alert('검색 오류');
          }
    };

    const renderList = () => {
        switch (activeTab) {
            case 'cu':
                console.log("cu");
                return <ProductList conv={activeTab} searchTerm={searchProduct} search={searchState}/>;
            case 'emart':
                console.log("emart");
                return <ProductList conv={activeTab} searchTerm={searchProduct} search={searchState}/>;
            default:
                return <ProductList conv={'cu'} searchTerm={searchProduct} search={searchState}>리스트 선택</ProductList>;
        }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:4000/login', {
          username,
          password,
        });
        console.log(response.data.success);
        if (response.data.success == true){
            if (response.data.error == true){
                alert(response.data.message);
            }
            else{
                setUserName(response.data.id);
                alert(response.data.message);
                setLoginState(true);
                console.log(response.data);
            }
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    const handleLogout = () => {
        alert('로그아웃합니다.');
        setLoginState(false);
        setUsername('');
        setPassword('');
    };

    const navOnClickCU = () => {
        setSearchState(false);
        setActiveTab('cu')
    }

    const navOnClickEmart = () => {
        setSearchState(false);
        setActiveTab('emart')
    }

    if (loginState == false){
        return (
            <div className="container">
                <div className='loginDIV'>
                        <form>
                            <label>아이디<input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            </label>
                            <label>비밀번호<input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </label>
                            </form>
                            <div className='buttonDIV'>
                                <button className='btn' type="button" onClick={handleLogin}>
                                로그인
                                </button>
                                <br/>
                                <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
                                    <button className='btn' type="button">
                                    회원가입
                                    </button>
                                </Link>
                            </div>
                        </div>
                <header>
                    <h1>편의점 1+1 행사 상품</h1>
                </header>
                <nav>
                    <button className = {`selectButton ${activeTab == 'cu' ? 'clicked' : ''}`} onClick={navOnClickCU}>CU</button>
                    <button className = {`selectButton ${activeTab == 'emart' ? 'clicked' : ''}`} onClick={navOnClickEmart}>Emart24</button>
                </nav>
                <div>
                <input className='searchInput'
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchTerm}
                onChange={handleSearch}
            />
            <button className='btn2' onClick={handleSearchTerm}>검색</button></div>
                <main>
                    {renderList()}
                </main>
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <div className='logoutDIV'>
                    <label className='labelClass'>{userName}님 환영합니다.</label>
                    <button className='btn2' onClick={handleLogout}>로그아웃</button>
                </div>
                <header>
                    <h1>편의점 1+1 행사 상품</h1>
                </header>
                <nav>
                    <button className = {`selectButton ${activeTab == 'cu' ? 'clicked' : ''}`} onClick={() => setActiveTab('cu')}>CU</button>
                    <button className = {`selectButton ${activeTab == 'emart' ? 'clicked' : ''}`} onClick={() => setActiveTab('emart')}>Emart24</button>
                </nav>
                <div>
                <input className='searchInput'
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchTerm}
                onChange={handleSearch}
            />
            <button className='btn2' onClick={handleSearchTerm}>검색</button></div>
                <main>
                    {renderList()}
                </main>
            </div>
        )
    }
}

export default Mainpage;