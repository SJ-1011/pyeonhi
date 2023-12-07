import React, { useState } from 'react';
import axios from 'axios';
import '../css/Registerpage.css';
import { Link } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = async () => {
    if (password == confirmPassword){
        try {
        const response = await axios.post('http://localhost:4000/register', {
            username,
            password,
        });

        alert('회원 가입 성공');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    else {
        alert(error.response.data.message);
    }
};

  return (
    <div className='mainDIV2'>
      <h1>회원가입</h1>
      <form className = 'form2'>
        <label>
          아이디:
          <input className='input2'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input className='input2'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호 확인:
          <input className='input2'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <div className='buttonDIV2' >
        <button type="button" className ='bnt2' onClick={handleRegistration}>
          가입하기
        </button>
        <Link to="/"><button className ='bnt2' >메인화면</button></Link>
        </div>
      </form>
    </div>
  );
}

export default Registration;
