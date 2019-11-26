import React, { Component } from 'react'
import Card from './Card'
import DatePicker from 'react-date-picker';
import update from 'immutability-helper'

export default class TodoList extends Component {
  state = {
    task: '',
    date: new Date(),
    error: false,
    todos: [
      {id:0, date: new Date(), text:'Say Hello to the World'},
      {id:1, date: new Date(), text:'Water the plants'},
      {id:2, date: new Date(), text:'Go for a walk'},
      {id:3, date: new Date(), text:'Learn something new'},
    ]
  }

  onPickDate = date => this.setState({ date })

  handleChange = (e) => {
    this.setState({task:e.target.value})
  }

  handleEdit = (e, id) => {
    const { todos } = this.state
    const newTodo = [...todos]
    newTodo[id].text = e.target.value
    
    this.setState({todos: newTodo})
  }

  addItem = () => { 
    const { task, date } = this.state
    const newArr = [...this.state.todos]

    if(task === '') {
      this.setState({error: true})
    } else {
      newArr.push({ id:newArr.length, text:task, date })
      this.setState({ todos: newArr, error: false, task: '' })
    }

  }

  handleDelete = (id, ref) => {
    const newArr = [...this.state.todos]

    // Add fading animation before removing the item
    ref.current.classList.add("fade")

    newArr.splice(id, 1)
    setTimeout(() => {
      this.setState({todos: newArr})  
    }, 300); // the timeout must be the same as the css animation 
  }

  moveCard = (dragIndex, hoverIndex) => {
    const dragCard = this.state.todos[dragIndex]
    const newArr = update(this.state.todos, {$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],})
    this.setState({todos: newArr})
  }
  

  render() {
    const { task, date, error, todos } = this.state
    return (
      <>
      <div className="columns">
        <div className="column">
          <div className="field">
              <label className="label">Describe your next task</label>
              <div className="control">
                  <input className={`input ${ error ? 'is-danger' : ''}`} onChange={(e) => this.handleChange(e)} type="text" placeholder="Do the chores" value={task} />
              </div>
              { error && <p className="help is-danger" >Please enter a task to do</p> }
          </div>
          <div className="control">
            <button onClick={this.addItem} className="button is-primary">
              <span style={{marginRight: '0.5rem'}}>
                <i className="fas fa-plus"/>
              </span>
              Add task
            </button>
          </div>
        </div>
        <div className="column">
          <div className="field">
              <label className="label">Due date</label>
              <DatePicker
                onChange={this.onPickDate}
                value={date}
              />
          </div>
        </div>
      </div>
        
        <h3 className="title is-3">All the things I still need to do</h3>
        { todos.map((item, index) =>
            <Card
              key={item.id}
              index={index}
              id={item.id}
              date={item.date}
              text={item.text}
              moveCard={this.moveCard}
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
            />
            /* <div key={index} className="list is-hoverable">
                <span className="list-item">
                    <input className="input" onChange={(e) => this.handleEdit(e, item.id)} type="text" value={item.title} />
                    <button onClick={() => this.delete(item.id)}>Delete</button>
                </span>
            </div> */
        )}
        <div>{todos.length} task{todos.length === 1 ? '' : 's'} remaining</div>
      </>
    )
  }
}
