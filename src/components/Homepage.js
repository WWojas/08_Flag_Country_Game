import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';
import countriesJSON from './countries.json';
import earth_icon from '../img/earth-icon.png';

const Container = styled.div`
     max-width: 1200px;
    `;

const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
     height: 100vh;
     justify-content: center;
     align-items: center;
     `;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  height: 5vh;
  width: 20vw;
  border: 2px solid palevioletred;
  color: ${props => (props.primary ? 'palevioletred' : 'blue')};
  margin: 0 1em;
  padding: 0.25em 1em;
  
  &:hover {
    background: whitesmoke;
    transform: scale(1.2);
`;

const Text = styled.h1`
  font-size: calc(3vw + 10px);
  font-weight: bold;
  text-align: center;
 
`;


const rotate = keyframes`
 0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

`;

const EarthImg = styled.img`
background-image: url(${earth_icon});
background-position: center;
background-size: contain;
 background-repeat: no-repeat;
  height: 30vh;
  width: 40vw;
 
`;


const CountryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
   
`;

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomCountry: '',

            isCountryWrapperVisible: false,
            countryFlag: '',
            countryRegion: '',
            countryCurrency: '',
            countryCapital: '',
            countryPopulation: '',
            countryTimezone: ''

        }};


        generateRandomCity = () => {
            let num = Math.floor(Math.random() * countriesJSON.length -1);
            this.setState({
                randomCountry: countriesJSON[num].name
            });
        };

    componentDidUpdate(prevProps, prevState) {
       this.fetchCityInfo();
    }

    fetchCityInfo = () => {

            fetch(`https://restcountries.eu/rest/v2/name/${this.state.randomCountry}`)
                .then( res => res.json())
                .then( response =>
                   this.setState ({
                       countryFlag: response[0].flag,
                       countryCapital: response[0].capital,
                       countryRegion: response[0].region,
                       countryCurrency: response[0].currency,
                       countryPopulation: response[0].population,
                       countryTimezone: response[0].timezones,
                       isCountryWrapperVisible: true
                   } )
                )
        };


    render() {
        return (

            <Container>
                <Wrapper>
                    <EarthImg />
                    <Text> Test Your Knowledge of Flags </Text>
                    <Button primary onClick={this.generateRandomCity}> HIT ME! </Button>

                    {this.state.isCountryWrapperVisible && (
                       <CountryWrapper>
                        {/*<CountryWrapper style = {{ backgroundImage: `url(${this.state.isCountryWrapperVisible ? `${this.state.countryFlag}` : " "})` }} >*/}
                        <img src={this.state.countryFlag} style={{ height: '40vh', width: '90vw', padding: '10px'}} alt='flag image'/>
                            <p> Country Name: {this.state.randomCountry} </p>
                            <p> Country Capital: {this.state.countryCapital} </p>
                            <p> Country Region: {this.state.countryRegion} </p>
                            <p> Country Population: {this.state.countryPopulation} </p>
                            <p> Country Time Zones: {this.state.countryTimezone} </p>
                        </CountryWrapper>
                    ) }

                </Wrapper>
            </Container>
        )
    }
}

export default Homepage;