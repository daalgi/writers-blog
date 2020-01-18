import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './Layout'
import Writers from './Writers'
import { NotFound } from './Errors'


export default class extends React.Component {
    state = {
        writers: [],
    }

    async componentDidMount() {
        const writers = await (await fetch('http://localhost:3004/writers?_embed=texts')).json()
        //const texts = await (await fetch('http://localhost:3004/texts')).json()
        this.setState({ writers })
    }

    render() {
        const { writers } = this.state

        return (
            <BrowserRouter>
                <Layout writers={ writers }>
                    <Switch>
                        <Route exact path="/"><div>Home</div></Route>
                        <Route path="/writers" render={ 
                            props => <Writers { ...props } writers={ writers } /> 
                        } />
                        <Route component={NotFound}/>
                    </Switch>                    

                </Layout>
            </BrowserRouter>
        )
    }
}

/*

<Route exact path="/writers"><Writers writers={ writers }/></Route>

<Writers {...props} writers={writers} />
*/