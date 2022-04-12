import React from 'react';
import { client } from '../client';

import Exchange from './Exchange';
import { gql } from '@apollo/client';

const query = gql`
    {
        rates(currency: "usd") {
            currency
            rate
        }
    }
`;

class App extends React.Component {
    state = { data: {}, loading: true };

    componentDidMount() {
        client.query({ query }).then(res => {
            const { data, loading } = res;
            this.setState({ data, loading });
        });
    }

    render() {
        const { data, loading } = this.state;
        return (
            <div className='Container'>
                <h1>Hello from the App component</h1>
                <Exchange data={data} loading={loading} />
            </div>
        );
    }
}

export default App;
