import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import urls from './urls';

const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1><b>SourceRank</b></h1>
          <h2>Publications ({todoCount})</h2>
       </div>
    </div>
  );
}

// TODO: Remove this
const PublicationForm = ({addPub}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addPub(input.value);
        input.value = '';
      }}>
      <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};

const Publication = ({pub, remove}) => {
  // Each Todo
  return (<a href="#" className="list-group-item" onClick={() => {remove(pub.id)}}>{pub.name}</a>);
}

const PublicationList = ({pubs, remove}) => {
  // Map through the todos
  const pubNode = pubs.map((pub) => {
    return (<Publication pub={pub} key={pub.id} remove={remove}/>)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{pubNode}</div>);
}

// Contaner Component
// Todo Id
window.id = 0;
class PubApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = urls.api.publications
  }
  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({
          data: res.data
        });
      });
  }
  // Add publication handler
  addPub(val){
    // Assemble data
    const pub = {domain: val}
    // Update data
    axios.post(this.apiUrl, pub)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((pub) => {
      if(pub.id !== id) return pub;
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});
      })
  }

  render(){
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <PublicationForm addPub={this.addPub.bind(this)}/>
        <PublicationList
          pubs={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

render(<PubApp />, document.getElementById('container'));
