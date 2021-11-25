import { Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import Projects from './pages/Projects';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Layout >
          <Header className="header" >
            <div className="logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']}>
              <Menu.Item key="home"><Link to='/'>首页</Link></Menu.Item>
              <Menu.Item key="projects"><Link to='/projects'>项目</Link></Menu.Item>
              <Menu.Item key="blogs"><Link to='/blog'>博客</Link></Menu.Item>
            </Menu>
          </Header>
        </Layout>

        <Routes>
          <Route index element={<Home />} ></Route>
          <Route path='projects' element={<Projects />}></Route>
          <Route path='blog' element={<Blogs />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
