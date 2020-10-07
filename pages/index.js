import React from 'react';
import Head from 'next/head';
import Header from '../public/components/header';
import Account from '../public/components/Account';
import s from '../public/styles/index.module.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.setState({name: localStorage.getItem('name').slice(0, localStorage.getItem('name').indexOf(' ') + 2) + '.'  || 'Иванова А.'});
  }

  getName(name) {
    this.setState({name: name.slice(0, localStorage.getItem('name').indexOf(' ') + 2) + '.'})
  }

  render() {
    return (
      <div className={s.container}>
        <Head>
          <title>SunLight</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
          <link rel="stylesheet" type="text/css" href="/index.css" />
        </Head>

        <img src='/img/head.jpg' className={s.bg}/>

        <div style={{padding: "15px"}}>
          <Header name={this.state.name} />
          <Account getName={(name) => this.getName(name)}/>
        </div>

        <main>
          
        </main>

        <footer>
        
        </footer>
      </div>
    )
  }
}
