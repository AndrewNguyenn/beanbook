import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from './button';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';
import { useMediaQuery } from "react-responsive";
import { stack as Menu } from 'react-burger-menu';
import { SettingFilled } from '@ant-design/icons';

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 6fr 1fr 1fr .5fr 1fr;
  margin: 2em 2.5em;
  
  a {
    font-family: Volkhov;
    text-decoration: none;
    color: #ded9d1;
  }

  .logo {
    font-size: 2em;
  }

  .right-nav {
    font-family: Inconsolata;
    justify-self: center;
    align-self: center;
    margin-right: 1em;
  }

  .right-nav:hover {
    font-weight: bold;
    transition: all ease-in-out .6s;
  }

  p.right-nav {
    margin-right: 0;
  }

  p.right-nav:hover {
    text-decoration: none;
  }

  icon {
    width: 20px
  }

  button {
    margin-left: .5rem;
  }
`;

const NavBar: FunctionComponent = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const { isSignedIn, signOut } = useAuth()
  const router = useRouter();
  console.log(isSignedIn());

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  }

  if (isMobile) 
    return (
      
        <Nav>
          <Link href="/home">
            <a className='logo'>beanbook</a>
          </Link>
          <Menu right>
            <h3>menu</h3>

            <a className='right-nav' href='/addbeans'>add bean</a>
        
            <a className='right-nav' href='/home'>my beans</a>
        
            <a className='right-nav' href='/home'>settings</a>
        
            {isSignedIn() && 
              <a className='right-nav' onClick={handleSignOut} >logout</a>
            }
          </Menu>
        </Nav>
      
    )

  return (
  <Nav>
    <Link href="/home">
      <a className='logo'>beanbook</a>
    </Link>

    <Link href="/">
      <a className='right-nav'>add bean</a>
    </Link>

    <Link href="/">
      <a className='right-nav'>my beans</a>
    </Link>

    <Link href="/" >
      <a className='right-nav icon'><SettingFilled spin={true} style={{ fontSize: '20px' }}/></a>
    </Link>

    {isSignedIn() && 
    <Button 
      inverse='false'
      variant='primary' 
      onClick={handleSignOut} 
      whileHover={{ scale: 1.1 }}
    >
      <p className='right-nav'>logout</p>
    </Button>}
  </Nav>)
}

export default NavBar;