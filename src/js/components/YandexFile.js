/**
 * Folder component.
 */
import React from 'react';
import filesize from 'filesize';

class YandexFile extends React.Component {
  render() {
    let formatFileSize = filesize(this.props.size, {round: 2});

    return (
      <li className="list-group-item">
        <span className="glyphicon glyphicon-file" aria-hidden="true"></span>
        <span className="badge">{formatFileSize}</span>
        {this.props.fileName}
      </li>
    );
  }
}

export default YandexFile;
