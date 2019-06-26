import React, { Component } from 'react';
import * as contentful from 'contentful';
import Footer from '../../organisms/Footer';
import Header from '../../organisms/Header';
import Cookiebar from '../../organisms/Cookiebar';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import './index.css';

const ContentItem = (props) => (
  <div className="box content">
    {documentToReactComponents(props.content)}
  </div>
)

class ServicePage extends Component {

    client = contentful.createClient({
      accessToken: 'WWAxa92QCUxohNbtBQr1c_OlbRwGhb_GZ5H9t9eBe0o',
      space: 'jowgquf3j27j',
    })

    state = {
      posts: []
    }

    componentDidMount() {
      this.fetchPosts().then(this.setPosts);
    }

    fetchPosts = () => this.client.getEntries({
      'content_type': 'page',
      'fields.slug': this.props.match.params.slug || ""
    })

    setPosts = response => {
      this.setState({
        posts: response.items
      })
    }

    render() {
      console.log(this.state.posts)
      return (
        <>
        <Header />
        <div className="ServicePage row">
          <div className="col s12 l6 offset-l3">
          { this.state.posts.map(({fields}, i) =>
            <ContentItem key={i} {...fields} />
          )}
          </div>
        </div>
        <Footer />
        <Cookiebar />
        </>
      );
    }
  }
  
  export default ServicePage;