/**
 * Directory overview component.
 */
import React from 'react';
// Note: i decided to use 'Axios' library because it supports a lot of browsers including IE8+.
import axios from 'axios';
import YandexFolder from './YandexFolder';
import YandexFile from './YandexFile';
import Breadcrumbs from './Breadcrumbs';
import Pager from './Pager.js';
import { YANDEX_DISK_API_ENDPOINT_URL, YANDEX_DISK_DEBUG_AUTH_TOKEN, YANDEX_DISK_ITEMS_PER_PAGE_COUNT } from '../config';

class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directoryItems: [],
      path: this.props.params.splat || '/',
      totalItems: parseInt(0)
    };

    this.getResourcesList = this.getResourcesList.bind(this);
  }

  getResourcesList(path, offset) {
    let requestConfig = {
      params : {
        path: path,
        limit: YANDEX_DISK_ITEMS_PER_PAGE_COUNT,
        offset: offset * YANDEX_DISK_ITEMS_PER_PAGE_COUNT
      },
      headers: {
        'Authorization': YANDEX_DISK_DEBUG_AUTH_TOKEN
      }
    }

    axios.get(YANDEX_DISK_API_ENDPOINT_URL, requestConfig)
      .then(function (response) {
        this.setState({
          directoryItems: response.data._embedded.items,
          totalItems: response.data._embedded.total
        });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let offset = this.props.location.query.offset || 0;
    this.getResourcesList(this.state.path, offset);
  }

  componentWillReceiveProps(nextProps) {
    let path = nextProps.params.splat || '/';
    let offset = nextProps.location.query.offset || 0;
    this.getResourcesList(path, offset);
  }

  render() {
    let breadcrumbs, pager = '';
    let listItems = this.state.directoryItems.map((item) => {
      if (item.type === 'dir') {
        return <YandexFolder folderName={item.name} path={item.path} key={item.resource_id} />;
      }
      else if (item.type === 'file') {
        return <YandexFile fileName={item.name} key={item.resource_id} size={item.size} />;
      }
    });

    if (this.props.params.splat) {
      breadcrumbs = <Breadcrumbs currentPath={this.props.params.splat || '/'} />;
    }

    if (this.state.totalItems > YANDEX_DISK_ITEMS_PER_PAGE_COUNT) {
      pager = <Pager path={this.props.params.splat || '/'} offset={this.props.location.query.offset || 0} total={this.state.totalItems} />;
    }

    return (
      <div className="wrapper">
        {breadcrumbs}
        <ul className="list-group">
         {listItems}
        </ul>
        {pager}
      </div>
    );
  }
}

export default Directory;
