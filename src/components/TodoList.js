import React, { Component } from 'react'
import Card from './Card'
import Day from './Day'
import DatePicker from 'react-date-picker';
import update from 'immutability-helper'

export default class TodoList extends Component {
  state = {
    task: '',
    date: new Date(),
    error: false,
    todos: [
      {id:0, date: new Date(), checked: false, text:'Say Hello to the World'},
      {id:1, date: new Date(), checked: true, text:'Water the plants'},
      {id:2, date: new Date(), checked: false, text:'Go for a walk'},
      {id:3, date: new Date(), checked: true, text:'Learn something new'},
    ]
  }


  onPickDate = date => this.setState({ date })

  handleChange = (e) => {
    this.setState({task:e.target.value})
  }

  handleCheck = (e, id) => {
    const { todos } = this.state
    const newTodo = [...todos]
    newTodo[id].checked = !newTodo[id].checked
    
    this.setState({todos: newTodo})
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
      if(date === null) {
        newArr.push({ id:newArr.length, text:task, date: new Date() })
      } else {
        newArr.push({ id:newArr.length, text:task, date })  
      }
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
      <div className="todolist">
      <Day/>

      <h3 className="title is-3 has-text-black has-text-centered">You have {todos.length} task{todos.length === 1 ? '' : 's'} remaining</h3>
      
      <div className="card">
        <div className="card-content">
          <div className="level">
            <div className="level-left">

              <div className="level-item">
                <div className="filed">
                  <div className="control">
                      <button onClick={this.addItem} className="button is-info is-rounded">
                          <i className="fas fa-plus"/><span style={{marginLeft: '0.5rem'}}> Add new task</span>
                      </button>
                  </div>
                </div>
              </div>

              <div className="level-item">
                  <div className="field">
                    <div className="control">
                      <label className="label">Describe your next task</label>
                          <input
                            className={`input ${ error ? 'is-danger' : ''}`} onChange={(e) => this.handleChange(e)}
                            type="text"
                            placeholder="Do the job"
                            value={task}
                          />
                        </div>
                      { error && <p className="help is-danger" >Please enter a task to do</p> }
                </div>
              </div>

              <div className="level-item">
                <div className="field">
                  <div className="control">
                  <label className="label">Due date</label>
                    <DatePicker
                      className="input"
                      onChange={this.onPickDate}
                      minDate={new Date()}
                      value={date}
                    />
                  </div>
                </div>
              </div>

            </div>
            </div>
          </div>
        </div>
        
        <hr></hr>
        { todos.map((item, index) =>
            <Card
              key={item.id}
              index={index}
              id={item.id}
              checked={item.checked}
              date={item.date}
              text={item.text}
              moveCard={this.moveCard}
              onChecked={this.handleCheck}
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
            />
        )}
        
      </div>
    )
  }
}
