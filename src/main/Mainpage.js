import React, {useEffect, useState} from 'react';
import ProductList from "./ProductList";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/Mainpage.css";

function Mainpage(props) {
    const [activeTab, setActiveTab] = useState('cu');
    const [loginState, setLoginState] = useState(false);
    const [userName, setUserName] = useState('null');

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
                    <button className = {`selectButton ${activeTab == 'cu' ? 'clicked' : ''}`} onClick={() => setActiveTab('cu')}>CU</button>
                    <button className = {`selectButton ${activeTab == 'emart' ? 'clicked' : ''}`} onClick={() => setActiveTab('emart')}>Emart24</button>
                </nav>
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
                    <label>{userName}님 환영합니다.</label>
                    <button className='btn2' onClick={handleLogout}>로그아웃</button>
                </div>
                <header>
                    <h1>편의점 1+1 행사 상품</h1>
                </header>
                <nav>
                    <button className = {`selectButton ${activeTab == 'cu' ? 'clicked' : ''}`} onClick={() => setActiveTab('cu')}>CU</button>
                    <button className = {`selectButton ${activeTab == 'emart' ? 'clicked' : ''}`} onClick={() => setActiveTab('emart')}>Emart24</button>
                </nav>
                <main>
                    {renderList()}
                </main>
            </div>
        )
    }
}

export default Mainpage;