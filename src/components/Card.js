import React, { useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './../itemTypes'

const Card = React.forwardRef(
    ({ 
        text,
        index,
        date,
        id,
        checked,
        isDragging,
        connectDragSource,
        connectDropTarget,
        onChecked,
        onEdit,
        onDelete
    }, ref) => {
        const elementRef = useRef(null)
        connectDragSource(elementRef)
        connectDropTarget(elementRef)
        const opacity = isDragging ? 0.5 : 1
        useImperativeHandle(ref, () => ({
            getNode: () => elementRef.current,
        }))
        
        // Days remainings
        const today = Math.ceil((Math.floor(Date.now() / 1000) / 86400))
        const dueDate = Math.ceil((Math.floor(date / 1000) / 86400))
        const daysRemaining = dueDate - today

        return (
            <div key={index} ref={elementRef} style={{opacity}} className="list is-hoverable is-relative pop">
                <div>
                    <span
                        
                        className="tag is-warning"
                    >
                        {index + 1}
                    </span>
                </div>
                <span className="list-item">
                    <button
                        style={{ position:'absolute', top:'0.5rem', right:'0.5rem' }}
                        className="delete is-small has-background-danger"
                        onClick={() => onDelete(index, elementRef)}
                    />
                    <div>
                        <div className="columns">
                                <div className="field column is-1">
                                    <div className="control">
                                        <label className="checkbox checkbox-label">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => onChecked(e, index)}
                                                checked={checked}
                                            />
                                            <span className="checkbox-custom"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="field column">
                                    <div className="control has-icons-right">
                                        <input
                                            className={`input title is-4 is-marginless has-border-bottom ${checked ? 'is-checked' : ''}`}
                                            onChange={(e) => onEdit(e, index)}
                                            type="text"
                                            value={text}
                                        />
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-pen"></i>
                                        </span>
                                    </div>
                                    
                                    <div className="box">
                                        <div className={`${checked ? 'is-checked' : 'has-text-grey'}`}>
                                            <i class="far fa-calendar"/> {date.toLocaleDateString()}
                                        </div>
                                        <div
                                            style={{background:`${checked ? 'lightgrey' : ''}`}}
                                            className={`tag ${new Date().toLocaleDateString() === date.toLocaleDateString() ? 'is-danger' : 'is-info'}`}
                                        >
                                            {daysRemaining} days remaining
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="is-clearfix"/>
                </span>
            </div>
        )
    }
)
export default DropTarget(
    ItemTypes.CARD,
    {
        hover(props, monitor, component) {
            if(!component) {
                return null
            }

            const node = component.getNode()
            if(!node) {
                return null
            }

            const dragIndex = monitor.getItem().index
            const hoverIndex = props.index

            if(dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = node.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            
            const clientOffset = monitor.getClientOffset()

            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            
            // Drag down
            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Drag up
            if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            props.moveCard(dragIndex, hoverIndex)

            monitor.getItem().index = hoverIndex
        },
    },
    connect => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(
    DragSource(
        ItemTypes.CARD,
        {
            beginDrag: props => ({
                id: props.id,
                index: props.index
            }),
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    )(Card)
)
