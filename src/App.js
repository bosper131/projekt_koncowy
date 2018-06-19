import React, { Component } from 'react';
import './App.css';

import PropTypes from 'prop-types'
import {
    Button,
    Container,
    Dropdown,
    Grid,
    Header,
    Icon,
    Input,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Table,
    Visibility,
} from 'semantic-ui-react'

const API_KEY='c0d7b013d2c350557b703d06880459af';


class HomepageHeading extends Component {
    constructor(props){
        super(props);
        this.state={data:''}

    }

    handleChange=(event)=>{
        this.setState({
            data:event.currentTarget.value
        });

    };
    render(){
        return(

            <Container text>
                <Header
                    as='h1'
                    content='Weather in your city'
                    inverted
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '3em',
                    }}
                />
                <div className="search_icon">
                    <form onSubmit={(event)=>{event.preventDefault();this.props.handleClick(this.state.data)}}>
                    <Input className='input_search' list='suggestions' action placeholder=' Write the name of the city' value={this.state.data} onChange={this.handleChange} style={{fontSize: '20px', paddingLeft: '10px', marginTop: '20px', height: '50px', borderRadius: '10px 0 0 10px'
                    }} >
                    <input style={{width: '320px'}}/>
                    <datalist id='suggestions'>
                        <option value='English' />
                        <option value='Chinese' />
                        <option value='Dutch' />
                    </datalist>

                    <Button className='button_search' type='submit' style={{
                        padding: '1.43em 1em 1.08571em',
                        borderRadius: '0 10px 10px 0'
                    }}> <Icon disabled name='search' style={{fontSize: '16px', marginLeft: '5px'}}/> </Button>
                    </Input>
                    </form>
                </div>

            </Container>

        )
    }


}
class VisualData extends Component{


    render(){
        console.log(this.props.info);
        return(
        <div>


            {/*<div style={{float:'left'}}>*/}
                {/*<Input list='suggestions' placeholder='  Is it the right city? ' />*/}
                {/*<datalist id='suggestions'>*/}
                    {/*<option value='English' />*/}
                    {/*<option value='Chinese' />*/}
                    {/*<option value='Dutch' />*/}
                {/*</datalist>*/}
            {/*</div>*/}



            <Container style={{marginTop:'50px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Table celled style={{width:'300px'}}>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell colSpan='2' style={{textAlign:'center',color:'orange'}}>{this.props.info.city.name}, {this.props.info.city.country}</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <Header as='h4'>

                        <Header.Content>
                            Humidity

                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>{this.props.info.list[0].main.humidity}%</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>
            <Header as='h4'>
            <Header.Content>
            Temperature min <br/>
                <br/>
            Temperature max
        </Header.Content>
    </Header>
    </Table.Cell>
                <Table.Cell> {(this.props.info.list[0].main.temp_min-273.15).toFixed(2)}&deg;C
                    <br/>
                    <br/>
                    {(this.props.info.list[0].main.temp_max-273.15).toFixed(2)}&deg;C

                </Table.Cell>
    </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Header as='h4' image>
                    <Header.Content>
                        Pressure
                        </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{this.props.info.list[0].main.pressure} hPa</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Header as='h4' image>
                    <Header.Content>
                    Wind
                </Header.Content>
            </Header>
        </Table.Cell>
        <Table.Cell>{this.props.info.list[0].wind.speed} m/s</Table.Cell>
    </Table.Row>
    </Table.Body>
    </Table>
    </Container>
        </div>
        )

    }

// localStorage.setItem('history', JSON.stringify(array))
    // JSON.parse(localStorage.getItem('history'))

}


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {

    constructor(props){
        super(props);
        this.state={
            weatherInfo:{},
            loading:true,

        };
        this.handleClick=this.handleClick.bind(this)

    }
    // componentDidMount(){
    //
    // }
    fetchCountry(cityID){

        fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&APPID=${API_KEY}`)
            .then(res=>res.json())
            .then(data=>{
               this.setState({
                  weatherInfo:data

                });
            })
            .catch(()=>{
                this.setState({
                    loading:false,
                    title:'Error'

                })


            })

    }
    handleClick(city){
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`)
            .then(res=>res.json())
            .then(data=>{

                this.fetchCountry(data.id);
                console.log(data);
            })

            .catch(()=>{
                this.setState({
                    loading:false,
                    title:'Error'

                })


            })
    }


    render() {
        const { children } = this.props;
        const { fixed } = this.state;

        return (
            <Responsive {...Responsive.onlyComputer}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        textAlign='center'
                        style={{ height: '100vh', padding: '1em 0em',backgroundImage:'url("./1.jpg")', backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover' }}
                        vertical
                    >
                        <Menu
                            inverted
                            fixed={fixed ? 'top' : null}
                            pointing={!fixed}
                            secondary={!fixed}
                            style={{'border':'1px solid white'}}
                            size='large'
                        >

                            <Container>
                                <Menu.Item as='a'>
                                    Search
                                </Menu.Item>
                                <Menu.Item as='a'>Maps</Menu.Item>
                                <Menu.Item as='a'>News</Menu.Item>
                                <Menu.Item as='a'>Partners</Menu.Item>
                                <Menu.Item position='right'>
                                    {/*tutaj dodaj cos jak bedziesz mial czas jakis globus*/}
                                    {/*<Button as='a' inverted={!fixed}>*/}
                                        {/*Log in*/}
                                    {/*</Button>*/}
                                    {/*<Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>*/}
                                        {/*Sign Up*/}
                                    {/*</Button>*/}
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading handleClick={this.handleClick}/>
                        {Object.keys(this.state.weatherInfo).length!==0 && <VisualData info={this.state.weatherInfo}/>}




                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}




DesktopContainer.propTypes = {
    children: PropTypes.node,
};






const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

const HomepageLayout = () => (
    <ResponsiveContainer>

    </ResponsiveContainer>
);

export default HomepageLayout




class App extends Component {
  render() {
    return (
      <HomepageHeading/>

    );
  }
}


