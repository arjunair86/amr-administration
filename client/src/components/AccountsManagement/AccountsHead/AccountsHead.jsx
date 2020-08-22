import { AppstoreAddOutlined, HomeOutlined, MoneyCollectTwoTone, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Table, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import NavigationPath from '../../NavigationPath/NavigationPath';
import TableTitle from '../../TableTitle/TableTitle';
import './AccountsHead.css';
import Columns from './models/TableColumns';
import NewAccountHeadForm from './NewAccountHeadForm';
import Services from './services/entry';
import Constants from '../../../constants/Constants';

const navigationPath = [
  {
    level: 0,
    title: 'Dashboard',
    icon: HomeOutlined,
    route: '/dashboard',
  },
  {
    level: 1,
    title: 'Accounts Management',
    icon: UserOutlined,
  },
  {
    level: 2,
    title: 'Accounts Head',
    icon: MoneyCollectTwoTone,
  },
];

const AccountsHead = () => {
  const [ state, setState ] = useState({
    data: [],
    visible: false,
    newAccountHeadLoading: false,
    modalSubmit: false,
    tableLoading: true,
  });

  const formRef = useRef(null);
  const firstInputRef = useRef(null);

  const newAccountHead = () => {
    setState((prevState) => ({
      ...prevState,
      visible: true,
    }));
  };

  useEffect(() => {
    Services[Constants.ACCOUNTS_MGMT.GET_ACCOUNT_HEADS]().then((response) => {
      setState((prevState) => ({
        ...prevState,
        data: response.data,
        tableLoading: false,
      }));
    }).catch(() => {
      setState((prevState) => ({
        ...prevState,
        data: [],
        tableLoading: false,
      }));
    });

    /* Empty array means, this hook is run only once when the component is mounted */
  }, []);

  const submitNewAccountForm = async (values) => {
    setState((prevState) => ({
      ...prevState,
      modalSubmit: true,
    }));

    Services[Constants.ACCOUNTS_MGMT.CREATE_ACCOUNT_HEAD](values).then((response) => {
      setState((prevState) => ({
        ...prevState,
        tableLoading: true,
        modalSubmit: false,
      }));

      formRef.current.resetFields();
      firstInputRef.current.focus();

      message.success('New Account Head Added Successfully');

      setState((prevState) => {
        const newData = prevState.data.slice(0);
        newData.push(response.data);

        return ({
          ...prevState,
          data: newData,
          tableLoading: false,
        });
      });
    }).catch(() => {
      setState((prevState) => ({
        ...prevState,
        tableLoading: false,
      }));

      message.error('Failed To Create Account Head');
    });
  };

  return (
    <div>
      <NavigationPath path={navigationPath} />
      <Table
        columns={Columns}
        dataSource={state.data}
        bordered
        title={() => (
          <TableTitle
            title="List Of Account Heads"
            button={{
              icon: AppstoreAddOutlined,
              type: 'primary',
              label: 'New Account Head',
              onClick: newAccountHead,
            }}
          />
        )}
        className="accountsHead_Table"
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
      <NewAccountHeadForm parentFormRef={formRef} firstInputRef={firstInputRef} onSubmit={submitNewAccountForm} state={state} setState={setState} />
    </div>
  );
};

export default AccountsHead;
