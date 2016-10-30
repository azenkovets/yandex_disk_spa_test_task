/**
 * Folder component.
 */
import React from 'react';
import { Link } from 'react-router';

class YandexFolder extends React.Component {
  render() {
    let clearPath = this.props.path.replace('disk:', '');

    return (
      <li className="list-group-item list-group-item--folder">
        <span className="glyphicon glyphicon-folder-close" aria-hidden="true"></span>
        <Link to={clearPath}>{this.props.folderName}</Link>
      </li>
    );
  }
}

export default YandexFolder;
