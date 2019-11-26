import React, { useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './../itemTypes'

const Card = React.forwardRef(
    ({ 
        text,
        index,
        date,
        id,
        isDragging,
        connectDragSource,
        connectDropTarget,
        onEdit,
        onDelete
    }, ref) => {
        const elementRef = useRef(null)
        connectDragSource(elementRef)
        connectDropTarget(elementRef)
        const opacity = isDragging ? 0 : 1
        useImperativeHandle(ref, () => ({
            getNode: () => elementRef.current,
        }))
        return (
            <div key={index} ref={elementRef} style={{opacity}} className="list is-hoverable pop">
                <div>
                    <span className="tag is-warning">{index + 1}</span> -
                    <span className={`tag ${new Date().toLocaleDateString() === date.toLocaleDateString() ? 'is-danger' : 'is-info'}`}>
                        {date.toLocaleDateString()}
                    </span>
                </div>
                <span className="list-item">
                    <div className="level">
                        <div className="field">
                            <div className="control has-icons-right">
                                <input
                                    className="input"
                                    onChange={(e) => onEdit(e, index)}
                                    type="text"
                                    value={text}
                                />
                                <span className="icon is-small is-right">
                                    <i className="fas fa-pen"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="level is-pulled-right">
                        <button className="button is-danger" onClick={() => onDelete(index, elementRef)}>
                            <span style={{marginRight: '0.5rem'}}>
                                <i className="fas fa-trash"/>
                            </span>
                            Delete
                        </button>
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
