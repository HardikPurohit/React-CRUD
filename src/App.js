import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
   constructor(){
    super();
    this.state = {
      data:
      [
        {
          "id": 1,
          "name": "Hardik",
          "marks": 45
        },
        {
          "id": 2,
          "name": "Mayur",
          "marks": 54
        },
        {
          "id": 3,
          "name": "Devid",
          "marks": 92
        }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditDelete = this.handleEditDelete.bind(this);
  }

  handleSubmit(values){
    if(document.getElementById('txtName').value != "" && document.getElementById('txtMark').value != ""){
      if(isNaN(parseInt(document.getElementById('txtMark').value))){
        alert('Please, Enter valid marks');
      }
      else{
        var current_state = this.state;
        if(document.getElementById('txtEditId').value != ""){
          // Edit Data
          current_state = this.state.data.filter(function(item){
            if(item["id"] == parseInt(document.getElementById('txtEditId').value)){
              item["name"] = document.getElementById('txtName').value;
              item["marks"] = parseInt(document.getElementById('txtMark').value);
            }
            return item;
          });
        }
        else{
          // Add Data
          var new_id = current_state.data[current_state.data.length - 1].id + 1;
          const new_element = {
            "id": new_id,
            "name": document.getElementById('txtName').value,
            "marks": parseInt(document.getElementById('txtMark').value)
          };
          current_state.data.push(new_element); //Add data to state
        }
        this.setState(current_state); //Set new state
      }
    }
    else {
      alert('Please, fill the data');
    }
    document.getElementById('txtEditId').value = "";
    document.getElementById('txtName').value = "";
    document.getElementById('txtMark').value = "";
  }

  handleEditDelete(target){
    const current_state = this.state;
    if(target.title == "Delete"){
      //Delete the data
      current_state.data = current_state.data.filter(function(item){ return item["id"] != parseInt(target.id) });
      this.setState(current_state); //Set new State
    }
    else if(target.title == "Edit"){
      document.getElementById('txtEditId').value = target.getAttribute('id');
      var data_to_be_edited;
      current_state.data.filter(function(item){
        if(item["id"] == parseInt(target.getAttribute('id'))){
          data_to_be_edited = item;
        }
      });
      document.getElementById('txtName').value = data_to_be_edited["name"];
      document.getElementById('txtMark').value = data_to_be_edited["marks"];
    }
  }

  render() {
    return (
      <div class="container panel panel-default">
        <div class="panel-body">
          <InputForm onSubmitForm={this.handleSubmit}/> 
          <Table stateData={this.state} onEditDelete={this.handleEditDelete}/> {/* Passing state to another component */}
        </div>
      </div>      
    );
  }
}

class InputForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    this.props.onSubmitForm(event.target.value); //Passing value to another component
    event.preventDefault();
  }
  render(){
    return(
      <div class="well">
        <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="txtName">Name :</label>
          <input class="form-control" placeholder="Enter Name" type="text" id="txtName" pattern="[a-zA-Z][a-zA-Z0-9\s]*" oninvalid="setCustomValidity('Plz enter on Alphabets')" />
          <input type="hidden" id="txtEditId" />
        </div>
        <div class="form-group">
          <label for="txtMark">Marks :</label>
          <input class="form-control" placeholder="Enter Marks" type="text" id="txtMark" title="Please, Enter marks"/>
        </div>
        <div class="btnSubmit">
          <input type="submit" name="submit" class="btn btn-primary" value="submit"/>
        </div>
        </form>
      </div>
    )
  }
}

class Table extends Component {
  constructor(props){
   super(props);
   this.handleDelete = this.handleDelete.bind(this);
   this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(event){
    this.props.onEditDelete(event.target);
  }

  handleEdit(event){
    this.props.onEditDelete(event.target);
  }

  render(){
    var defaultState = this.props.stateData.data;
    return(
      <table border = "2"  class="table table-striped">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
          {
            defaultState.map((person, i) =>
              <tr>
                <td>{person.name}</td>
                <td>{person.marks}</td>
                <td align="center">
                  <i class="fa fa-pencil" aria-hidden="true" onClick={this.handleEdit} id={person.id} title="Edit"></i> &nbsp;
                  <i class="fa fa-trash" aria-hidden="true" onClick={this.handleDelete} id={person.id} title="Delete"></i>
                </td>
              </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default App;
