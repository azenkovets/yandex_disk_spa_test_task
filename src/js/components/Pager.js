/**
 * Pager component
 */
import React from 'react';
import Link from 'react-router/lib/Link'
import { YANDEX_DISK_ITEMS_PER_PAGE_COUNT } from '../config';

class Pager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let prevButton, nextButton, formattedPath = '';
    if (this.props.path === '/') {
      formattedPath = this.props.path;
    }
    else {
      formattedPath = '/' + this.props.path;
    }

    // Show previous button only if you are not at the first page.
    if (this.props.offset > 0) {
      let linkParams = {
        pathname: formattedPath,
      }

      if (parseInt(this.props.offset) - 1 > 0) {
        linkParams.query = {
          offset: this.props.offset - 1
        }
      }

      prevButton = <li className="previous"><Link to={linkParams}>Prev</Link></li>;
    }

    // Do not show next button if items are over.
    if (this.props.total > (parseInt(this.props.offset) + 1) * YANDEX_DISK_ITEMS_PER_PAGE_COUNT) {
      nextButton = (
        <li className="next">
          <Link to={{ pathname: formattedPath, query: { offset: parseInt(this.props.offset) + 1 }}}>Next</Link>
        </li>
      );
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pager">
          {prevButton}
          {nextButton}
        </ul>
      </nav>
    );
  }
}

export default Pager;
