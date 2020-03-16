import React from 'react';
import { Row, Col, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import _ from 'lodash';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import Router from 'next/router';

export default class BlogHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: null,
            filterValue: null,
            category: null
        }

        this.filter = this.filter.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
    }

    componentDidMount() {
        if ( this.props.category ) {
            this.setState({
                category: this.props.category
            });
        }
    }

    handleChange(e) {
        this.setState({
            filterValue: e.target.value
        });
    }

    filter() {
        this.setState({
            filter: this.state.filterValue
        });
    }
    
    changeCategory(e) {
        this.setState({ category: e }, ()=> {
            if ( e === null ) {
                Router.push(`/news`);
            } else {
                Router.push(`/news/category/${e}`);
            }
        });
    }

    render() {
        const categories = ['Events', 'Product', 'Synergy', 'Innovation', 'Management', 'Sales', 'Support', 'Services', 'Marketing', 'Administrative'];
        
        return (
            <div id="blog-container">
                <h1>Blog Posts & News</h1>
                <Row>
                    <Col lg="9">
                        {
                            this.props.id ?
                                    <BlogPost teaser={false} id={this.props.id} /> :
                                    <BlogList category={this.state.category} filter={this.state.filter} params={this.state.params} />
                        }
                    </Col>
                    <Col lg="3">
                        <InputGroup className="mb-4" hidden={(this.props.id)}>
                            <Input
                                id="filter"
                                placeholder="Search..."
                                onChange={(e)=>this.handleChange(e)}
                            />
                            <InputGroupAddon addonType="prepend">
                                <Button
                                    color="info"
                                    onClick={()=>this.filter()}
                                >Search</Button>
                            </InputGroupAddon>
                        </InputGroup>

                        <p className="h5 text-center">Categories</p>
                        <div className="list-group">
                            <a
                                href="javascript:void(0)"
                                className="list-group-item list-group-item-action"
                                onClick={()=>this.changeCategory(null)}
                            >All Categories</a>
                            {
                                categories
                                    .sort((a,b) => {
                                        if(a < b) { return -1; }
                                        return 0;
                                    })
                                    .map((category, index) => {
                                        let isActive = category == this.state.category ? 'active' : '';
                                        return <a
                                                    href="javascript:void(0)"
                                                    key={index}
                                                    className={'list-group-item list-group-item-action ' + isActive}
                                                    onClick={()=>this.changeCategory(category)}
                                                >{category}</a>
                                    })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}