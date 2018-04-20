import React, { Component } from 'react';

import './Search.scss';
import mov from '../../../assets/images/mov.jpg';
import move from '../../../assets/images/movie_logo.png';
import logo from '../../../assets/images/logo.png';


const movies = [
    {
        id: 'dada113',
        img: move,
        title: 'Titlea',
        description: 'Description'
    },
    {
        id: 'qeq231',
        img: mov,
        title: 'Sasatu',
        description: 'Description2'
    },
    {
        id: 'dadasd113',
        img: logo,
        title: 'Fafa',
        description: 'Description3'
    }
];

class Search extends Component {
    state = {
        films: [],
        hideResult: false
    };

    searchHandler = e => {
        const { value } = e.target;
        let films = [];

        if(value) films = movies.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));

        this.setState({ films });
    };

    resetHandler = () => {
        if(this.searchInput.value !== '') {
            this.searchInput.classList.remove('foc');
            this.searchInput.value = '';
            this.setState({ films: [] })
        }
    };

    iconHandler = () => this.searchInput.classList.remove('foc');

    searchRef = (node) => this.searchInput = node;

    handleFocus = () => {
        console.log('Focus');
        this.searchInput.classList.add('focus', 'foc');
        this.setState({ hideResult: false });
    };

    handleBlur = () => {
        console.log('Blur');
        if(this.searchInput.classList.contains('foc')) {
            this.searchInput.classList.remove('focus');
            this.setState({ hideResult: true });
        } else this.searchInput.focus();
    };

    render () {
        const searchResult = this.state.films.map(item => (
            <li key={item.id}>
                <a href="">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={item.img} alt={item.img}/>
                                </td>
                                <td>
                                    <div>{item.title}</div>
                                    <div>{item.description}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </a>
            </li>
        ));

        return (
            <div className="Search">
                <input
                    type="text"
                    onChange={this.searchHandler}
                    className="SearchInput"
                    ref={this.searchRef}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}/>
                <div className="SearchPlaceholder">Search</div>
                <div className="SearchIcon" onMouseDown={this.iconHandler}>
                    <span className="icon icon-search"/>
                </div>
                <button className="ResetSearch" onMouseDown={this.resetHandler} >
                    <span className="icon icon-close" />
                </button>
                {!this.state.hideResult && <div className="SearchResult">
                    <ul>
                        {searchResult}
                    </ul>
                </div>}
            </div>
        );
    }
}

export default Search;