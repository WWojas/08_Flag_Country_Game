import React, { Component } from 'react';
import styled from 'styled-components';
import countriesJSON from './countries.json';

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
  background: whitesmoke;
  border-radius: 3px;
  height: 5vh;
  width: 20vw;
  border: 2px solid orange;
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
  color: whitesmoke;
 
`;

const Paragraph = styled.p`
  color: whitesmoke;
  font-size: calc(1vw + 10px);
`;


const CountryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (min-width: 600px) {
     flex-direction: row;
     }
`;

const CountryDetailsWrapper = styled.div`
    margin: 10px;
    text-align: center;
`;

const CountryImgWrapper = styled.div`
    
    img { 
    height: 40vh;
    margin: 0 auto;
     width: 90vw;
     padding: 10px;
     }
     
     @media (min-width: 596px) {
    img {
     width: 50vw;
    height: 30vh;
    }
    }
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

        let num = Math.floor(Math.random() * countriesJSON.length);
        this.setState({
            randomCountry: countriesJSON[num].name
        });
    };

    componentDidUpdate() {
        this.fetchCountryInfo();
    }


    fetchCountryInfo = () => {

        fetch(`https://restcountries.eu/rest/v2/name/${this.state.randomCountry}`)
            .then(res => res.json())
            .then(response =>
                this.setState({
                    countryFlag: response[0].flag,
                    countryCapital: response[0].capital,
                    countryRegion: response[0].region,
                    countryCurrency: response[0].currency,
                    countryPopulation: response[0].population,
                    countryTimezone: response[0].timezones,
                    isCountryWrapperVisible: true
                })
            );

        console.log(this.state.countryRegion)

    };


    render() {
        return (

            <Container>
                <Wrapper>
                    <Text> Test Your Knowledge of Flags </Text>
                    <Button primary onClick={this.generateRandomCity}> HIT ME! </Button>


                    {this.state.isCountryWrapperVisible && (
                        <CountryWrapper>

                            <CountryImgWrapper>
                                <img src={this.state.countryFlag} alt='flag'/>
                            </CountryImgWrapper>

                            <CountryDetailsWrapper>
                                <Paragraph>  Name: {this.state.randomCountry} </Paragraph>
                                <Paragraph>  Capital: {this.state.countryCapital} </Paragraph>
                                <Paragraph>  Region: {this.state.countryRegion} </Paragraph>
                                <Paragraph>  Population: {this.state.countryPopulation} </Paragraph>
                                <Paragraph> Time Zone: </Paragraph>
                                { this.state.countryTimezone.map( element => {
                                    return (
                                        <Paragraph as='span' key={element}>   {element};  </Paragraph>
                                    )
                                })}
                            </CountryDetailsWrapper>

                        </CountryWrapper>
                    ) }

                </Wrapper>
            </Container>
        )
    }
}

export default Homepage;