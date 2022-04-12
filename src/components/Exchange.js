import { gql } from '@apollo/client';
import React from 'react';
import { client } from '../client';

class Exchange extends React.Component {
    state = { data: {}, currency: 'usd', filter: '' };

    componentDidMount() {
        const { data } = this.props;
        this.setState({ data });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }

    filterResults = e => {
        if (this.debounce) clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
            const test = new RegExp(e.target.value, 'i');
            if (e.target.value.trim() !== '') {
                this.setState({
                    data: {
                        ...this.props.data,
                        rates: this.props.data.rates.filter(({ currency }) => {
                            return test.test(currency.toLowerCase());
                        }),
                    },
                    filter: test,
                });
            } else {
                this.setState({ data: this.props.data, filter: '' });
            }
            clearTimeout(this.setState);
        }, 1000);
    };

    changeCurrency = currency => {
        client
            .query({
                query: gql`
                    {
                        rates(currency: "${currency}"){
                            currency
                            rate
                        }
                    }
                `,
            })
            .then(res => {
                console.log(res);
                this.setState({ data: res.data, currency });
            });
    };

    renderRates(data) {
        if (data.rates) {
            return data.rates.map((rate, i) => (
                <li key={i}>
                    {rate.currency}: {rate.rate}
                </li>
            ));
        }
    }

    render() {
        const nextCurrency = this.state.currency === 'usd' ? 'eur' : 'usd';
        const { data } = this.state;
        const loader = <h1>Loading...</h1>;

        return (
            <div className='Container'>
                <h1>Hello from the Exchange Component</h1>
                <label htmlFor='search'>Search</label>
                <input
                    name='search'
                    type='text'
                    onChange={this.filterResults}
                />
                <button onClick={() => this.changeCurrency(nextCurrency)}>
                    Switch to {nextCurrency}
                </button>
                <ul>{this.props.loading ? loader : this.renderRates(data)}</ul>
            </div>
        );
    }
}

export default Exchange;
