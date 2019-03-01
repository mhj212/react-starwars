import React from 'react';
import { Link } from 'react-router';

class CharacterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            url: this.props.location.state,
            loadError: false,
            films: [],
            filmsCount: 0,
            filmsNotLoaded: true,
            error: null,
            name: this.props.location.name
        };

    }
    componentDidMount() {



        fetch(this.state.url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (JSON.stringify(result) == JSON.stringify({ detail: "Not found" })) {

                        this.setState({
                            loadError: true
                        })
                    } else {
                        this.setState({
                            items: result,
                            name: result.name
                        });


                        let filmsTotal = result.films.length >= 0 ? result.films.length : 0;
                        result.films.map((film, i) => {

                            fetch(film)
                                .then(res => res.json())
                                .then(
                                    (result2) => {
                                        this.setState(prevState => ({
                                            films: prevState.films.concat(result2),
                                            filmsCount: prevState.filmsCount + 1
                                        }), () => {
                                            // if all films are loaded
                                            if (filmsTotal == this.state.filmsCount) {

                                                this.setState({
                                                    filmsNotLoaded: false
                                                });
                                            }
                                        });

                                    }
                                ),
                                (error) => {
                                    this.setState({
                                        error,
                                        loadError: true
                                    });
                                }


                        });
                    }
                },

                (error) => {
                    this.setState({
                        loadError: true,
                        error
                    });
                }
            )

    }

    renderFilmData() {
        const filmsList = this.state.films.map((film) => {

            let d = new Date(film.release_date);
            let wd = d.getDay();
            let day = '';
            if (wd == 0) {
                day = "Sunday";
            }
            if (wd == 1) {
                day = "Monday";
            }
            if (wd == 2) {
                day = "Tueday";
            }
            if (wd == 3) {
                day = "Wednesday";
            }
            if (wd == 4) {
                day = "Thursday";
            }
            if (wd == 5) {
                day = "Friday";
            }
            if (wd == 6) {
                day = "Saturday";
            }



            let releaseDateFormatted = day + ", " + d.toDateString().slice(4);
            return <tr>
                <td>{film.title}</td>
                <td>{releaseDateFormatted}</td>
                <td>{film.director}</td>
            </tr>
        });
        return (<table className={this.state.filmsNotLoaded ? "hide" : ""}>
            <tr>
                <th>Title</th>
                <th>Release Date</th>
                <th>Director</th>
            </tr>
            <tbody>
                {filmsList}
            </tbody>
        </table>);
    }

    renderCharacterTitle() {
        return (<h1 className={this.state.filmsNotLoaded ? "hide" : ""}>{this.state.name}</h1>)
    }

    renderBackButton() {
        return (<Link to="/"><button className="Btn">BACK</button></Link>)
    }

    renderMessage() {
        if (this.state.loadError == true) {

            return (<div className="character-error-message">No data found, please try another.</div>);
        }
        return (<div className={this.state.filmsNotLoaded ? "loading-message" : "loading-message hide"}>Loading...</div>)
    }

    render() {

        return (
            <div id="container">
                <div id="innerContainer">
                    {this.renderBackButton()}
                    {this.renderCharacterTitle()}
                    {this.renderFilmData()}
                    {this.renderMessage()}
                </div>
            </div>


        );
    }
}

export default CharacterPage;

