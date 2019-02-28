import React from 'react';
import characters from '../data/characters.json';
import { Link } from 'react-router';



class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: []
        };

    }

    componentDidMount() {

        this.setState({
            characters: characters.characters
        });

    }



    renderTitle() {
        return (<h1>Star Wars API Challenge</h1>);
    }


    renderList() {
        const charList = this.state.characters.map((data) => {
            return (<div><Link className="characters-list" to="/character" state={data.url}>{data.name}</Link>{'\u00A0'}{'\u00A0'}</div>)
        })

        return (<div id="list-container">
            {charList}
        </div>);
    }



    render() {

        return (
            <div id="container">
                <div id="innerContainer">
                    {this.renderTitle()}
                    {this.renderList()}
                </div>
            </div>


        );
    }
}

export default HomePage;

