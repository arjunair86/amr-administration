import { HomeOutlined, LoadingOutlined, ProfileTwoTone, UserOutlined } from '@ant-design/icons';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import { message, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Constants from '../../../constants/Constants';
import NavigationPath from '../../NavigationPath/NavigationPath';
import TableTitle from '../../TableTitle/TableTitle';
import Services from '../services/entry';
import Columns from './models/TableColumns';
import './ViewAllWorks.css';

const navigationPath = [
  {
    level: 0,
    title: 'Dashboard',
    icon: HomeOutlined,
    route: '/dashboard',
  },
  {
    level: 1,
    title: 'Work Contracts',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'View All Works',
    icon: ProfileTwoTone,
  },
];

const ViewAllWorks = ({ history }) => {
  const [ state, setState ] = useState({
    data: [],
    tableLoading: true,
  });

  useEffect(() => {
    const getAllWorksList = async function () {
      const response = await Services[Constants.WORKS_MGMT.GET_WORKS]();
      if (response.code !== Constants.SUCCESS) {
        setState((prevState) => ({
          ...prevState,
          data: [],
          tableLoading: false,
        }));

        message.error(`${response.reason} [${response.debugCode}]`);
        return;
      }

      setState((prevState) => ({
        ...prevState,
        data: response.data,
        tableLoading: false,
      }));
    };

    getAllWorksList();

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  const newWork = () => {
    history.push('add_new_work');
  };

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Table
        columns={Columns({
          handlers: {
          },
        })}
        dataSource={state.data}
        bordered
        title={() => (
          <TableTitle
            title="List Of Works"
            button={{
              icon: PlaylistAddOutlinedIcon,
              type: 'primary',
              label: 'New Work',
              onClick: () => newWork(),
            }}
          />
        )}
        className="allWorks_Table"
        pagination={{
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} ${total > 1 ? 'items' : 'item'}`,
        }}
        loading={{
          indicator: (<LoadingOutlined />),
          size: 'large',
          tip: 'Loading Data...',
          spinning: state.tableLoading,
        }}
      />
    </div>
  );
};

ViewAllWorks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ViewAllWorks;