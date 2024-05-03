import { useEffect, useState } from 'react';

import { Badge, Button, PaginationProps, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { openDrawer, updateData } from '../../../../redux';

import { PopoverInviteComponent } from './popover/popover-component';

import { getItemByPeriod } from '../utils/period-select';

import {
  PostPutExerciseType,
  colorStatusBadge,
  TrainingListKeys,
  DrawerType,
  workoutsTestId,
  tableTitle,
  getColorStatusBadge,
  getDataTestIdWithIndex,
  buttonsTitle,
} from '../../../../constants';

import styles from './my-trainings.module.scss';

type MyTrainingsType = {
  showButtonCreate: boolean;
};

export const MyTrainingsComponent: React.FC<MyTrainingsType> = ({ showButtonCreate }) => {
  const dispatch = useAppDispatch();
  const { userExercises } = useAppSelector((state) => state.userExercises);

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [dataTable, setDataTable] = useState<PostPutExerciseType[]>();
  const [isOpenCeil, setIsOpenCeil] = useState('');

  useEffect(() => {
    if (userExercises) {
      setDataTable(userExercises);
    }
  }, [userExercises]);

  const onChangePage: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleUpdateTraining = (item: PostPutExerciseType) => {
    dispatch(
      openDrawer({
        activeSelect: colorStatusBadge[item.name as TrainingListKeys],
        typeDrawer: DrawerType.ModalUpdate,
      })
    );
    dispatch(updateData({ trainingId: item._id }));
  };

  const handleCreateTraining = () => {
    dispatch(
      openDrawer({
        typeDrawer: DrawerType.ModalCreate,
      })
    );
  };

  const handleOpenPopover = (id: string) => {
    setOpen(true);
    setIsOpenCeil(id);
  };

  return (
    <>
      <div className={styles.myTrainingsWrapper}>
        <div className={styles.tableWrapper}>
          <Table
            dataSource={dataTable}
            pagination={{
              onChange: (page) => {
                onChangePage(page, 12);
              },
              pageSize: 10,
              total: dataTable?.length,
              current: currentPage,
              position: ['none', 'bottomLeft'],
              showSizeChanger: false,
            }}
            size="small"
            data-test-id={workoutsTestId.myTraining.table}
            style={{ columnGap: '10px' }}>
            <Column
              className={styles.cell}
              title={() => <p>{tableTitle.typeTrainings}</p>}
              key="id"
              render={(text: PostPutExerciseType) => (
                <div className={styles.exerciseCell}>
                  <Badge
                    color={getColorStatusBadge(text.name as TrainingListKeys).color}
                    text={getColorStatusBadge(text.name as TrainingListKeys).content}
                  />
                  <PopoverInviteComponent
                    open={open}
                    isOpenCeil={isOpenCeil}
                    setOpen={setOpen}
                    setIsOpenCeil={setIsOpenCeil}
                    text={text}
                  />
                  <Button onClick={() => handleOpenPopover(text._id as string)}>
                    <DownOutlined />
                  </Button>
                </div>
              )}
            />
            <Column
              title={() => <p>{tableTitle.periodTrainings}</p>}
              key="id"
              render={(text) => (
                <span className={styles.periodCell}>{getItemByPeriod(text.parameters.period)}</span>
              )}
              sorter={(a: PostPutExerciseType, b: PostPutExerciseType) => {
                if (a.parameters && b.parameters) {
                  return a.parameters.period - b.parameters.period;
                } else {
                  return 0;
                }
              }}
              showSorterTooltip={false}
            />
            <Column
              render={(text, _, index) => (
                <Button
                  disabled={text.isImplementation}
                  data-test-id={getDataTestIdWithIndex(workoutsTestId.myTraining.iconUpdate, index)}
                  className={styles.buttonEdit}>
                  <EditOutlined />
                </Button>
              )}
              onCell={(record: PostPutExerciseType) => {
                return {
                  onClick: () => {
                    handleUpdateTraining(record);
                  },
                };
              }}
            />
          </Table>
        </div>
        <div className={styles.myTrainingActiveWrapper}>
          <Button
            type="primary"
            onClick={handleCreateTraining}
            disabled={showButtonCreate}
            data-test-id={workoutsTestId.myTraining.buttonNew}>
            <PlusOutlined />
            <span>{buttonsTitle}</span>
          </Button>
        </div>
      </div>
    </>
  );
};
