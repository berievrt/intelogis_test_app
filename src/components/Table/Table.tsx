import { Table, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMarkers,
  getRequests,
  RootState,
  setActiveRoute,
  updateRequests,
} from '../../store/slice';

import type { Claim, Marker } from '../../../types/common';

const DataTable: React.FC = () => {
  const { requests, activeRoute, markers } = useSelector(
    (state: RootState) => state?.main
  );
  const dispatch = useDispatch();

  const columns: ColumnsType<Claim> = [
    {
      title: 'Номер',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      width: 100,
    },
    {
      title: 'Откуда',
      dataIndex: 'from',
      key: 'from',
      render: (from: Marker, row) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Select
            style={{ width: 200 }}
            defaultValue={from.address}
            onSelect={(value: string) => {
              dispatch(
                updateRequests({
                  id: row.id,
                  date: row.date,
                  from: JSON.parse(value),
                  to: row.to,
                })
              );
              dispatch(
                setActiveRoute({
                  id: row.id,
                  from: JSON.parse(value),
                })
              );
            }}
          >
            {markers.map((item) => (
              <Select.Option key={item.long + item.lat} value={JSON.stringify(item)}>{item.address}</Select.Option>
            ))}
          </Select>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Куда',
      dataIndex: 'to',
      key: 'to',
      render: (to: Claim['to'], row) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Select
            onSelect={(value: string) => {
              dispatch(
                updateRequests({
                  id: row.id,
                  date: row.date,
                  from: row.from,
                  to: JSON.parse(value),
                })
              );
              dispatch(
                setActiveRoute({
                  id: row.id,
                  to: JSON.parse(value),
                })
              );
            }}
            style={{ width: 200 }}
            defaultValue={to.address}
          >
            {markers.map((item) => (
              <Select.Option key={item.long + item.lat} value={JSON.stringify(item)}>{item.address}</Select.Option>
            ))}
          </Select>
        </div>
      ),
      width: 200,
    },
  ];

  const clickHandler = (row: Claim) => {
    dispatch(
      setActiveRoute({
        id: row.id,
        from: {
          long: row.from.long,
          lat: row.from.lat,
          address: row.from.address,
        },
        to: {
          long: row.to.long,
          lat: row.to.lat,
          address: row.to.address,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(getRequests());
    dispatch(getMarkers());
  }, []);

  return (
    <Table
      rowClassName={(row) =>
        row.id === activeRoute.id ? 'row-dark' : 'row-light'
      }
      rowKey={'id'}
      columns={columns}
      dataSource={requests}
      scroll={{ x: true }}
      pagination={{ position: ['bottomCenter'] }}
      onRow={(row) => ({
        onClick: () => clickHandler(row),
      })}
    />
  );
};

export default DataTable;
