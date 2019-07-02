/** @flow */

import * as React from 'react';
import * as Draggable from 'react-draggable';
import injectSheet from 'react-jss';
import clsx from 'clsx';

const styles = {
  root: {
    display: 'flex',
  },
  root_dragging: {
    background: '#777',
    zIndex: 1,
    position: 'relative',
    opacity: 0.5,
  },
  root_shadow: {
    background: '#469C72',
  },
};

class DragRowRenderer extends React.Component {
  dragStart = () => {
    const {dragStart, rowData} = this.props;
    dragStart(rowData.id);
  };

  drag = (e, data) => {
    const {drag, rowData} = this.props;
    drag(rowData.id, data.deltaY);
  };

  dragStop = (e, data) => {
    const {dragStop, dragRowId} = this.props;
    data.node.style.transform = null;
    dragStop(dragRowId);
  };

  render() {
    const {
      classes,
      className,
      columns,
      rowData,
      style,
      dragRowId,
      offsetRows,
      dragRowStyle,
    } = this.props;

    const newStyle = {...style};
    // isDragging
    if (dragRowId === rowData.id) {
      const top =
        offsetRows < 0 ? dragRowStyle.top - style.height : dragRowStyle.top;
      newStyle.transform = `translateY(${top}px)`;
    }

    return (
      <Draggable.DraggableCore
        handle=".draggable_handle"
        onStart={this.dragStart}
        onDrag={this.drag}
        onStop={this.dragStop}>
        <div className={clsx(classes.root, className)} style={newStyle}>
          {columns}
        </div>
      </Draggable.DraggableCore>
    );
  }
}

export default injectSheet(styles)(DragRowRenderer);
