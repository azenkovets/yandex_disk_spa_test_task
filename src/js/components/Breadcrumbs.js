/**
 * Directory overview component.
 */
import React from 'react';
import Link from 'react-router/lib/Link'

class Breadcrumbs extends React.Component {
  render() {
    let paths = this.props.currentPath.split('/');
    // Array to keep temporary path.
    let breadcrumbPathArray = [""];

    let breadcrumbs = paths.map((item, index) => {
      breadcrumbPathArray.push(item);
      return (
        // @todo: think about the key.
        <li key={index + item}>
          <Link to={breadcrumbPathArray.join('/')}>{item}</Link>
        </li>
      );
    });

    return (
      <ol className="breadcrumb">
        <li><Link to={'/'}>Home</Link></li>
        {breadcrumbs}
      </ol>
    );
  }
}

export default Breadcrumbs;
