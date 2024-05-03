import { useEffect } from 'react';

import { Checkbox, Form, Input, InputNumber } from 'antd';

import { useAppSelector } from '../../../../hooks';

import {
  ExercisesType,
  DrawerType,
  getDataTestIdWithIndex,
  calendarTestId,
} from '../../../../constants';

type DrawerFormComponentType = {
  index: number;
  formData: ExercisesType;
  onChange: (index: number, data: ExercisesType) => void;
  isOpenDrawer: boolean;
};

export const DrawerFormComponent: React.FC<DrawerFormComponentType> = ({
  index,
  formData,
  onChange,
  isOpenDrawer,
}) => {
  const [form] = Form.useForm();

  const { typeDrawer } = useAppSelector((state) => state.userExercises.drawer);

  const handleFormChange = () => {
    const formValue = form.getFieldsValue();

    const newFormData = {
      name: formValue.name,
      replays: formValue.replays,
      weight: formValue.weight,
      approaches: formValue.approaches,
      isImplementation: formValue.isImplementation,
    };

    onChange(index, newFormData);
  };

  useEffect(() => {
    if (!isOpenDrawer) {
      form.resetFields();
    }
  }, [isOpenDrawer, form, formData]);

  useEffect(() => {
    form.setFieldsValue({
      name: formData.name,
      replays: formData.replays,
      weight: formData.weight,
      approaches: formData.approaches,
      isImplementation: formData.isImplementation,
    });
  }, [formData, form]);

  return (
    <Form
      form={form}
      name={`form-add-${index}`}
      onValuesChange={handleFormChange}
      style={{ height: '100px' }}>
      <div className="exercises-name">
        <Form.Item
          name="name"
          style={{
            width: `${typeDrawer !== DrawerType.UpdateFuture ? '100%' : 'calc(100% - 40px)'}`,
          }}>
          <Input
            data-test-id={getDataTestIdWithIndex(
              calendarTestId.modalActionDrawer.inputExercise,
              index
            )}
          />
        </Form.Item>

        {(typeDrawer === DrawerType.UpdateFuture || typeDrawer === DrawerType.ModalUpdate) && (
          <div className="checkbox">
            <Form.Item name="isImplementation" valuePropName="checked">
              <Checkbox
                data-test-id={getDataTestIdWithIndex(
                  calendarTestId.modalActionDrawer.checkboxExercise,
                  index
                )}></Checkbox>
            </Form.Item>
          </div>
        )}
      </div>
      <div className="exercises-settings">
        <Form.Item
          name="approaches"
          label="Подходы, раз"
          className="exercises-settings__first-item"
          labelAlign="left">
          <InputNumber
            placeholder="1"
            data-test-id={getDataTestIdWithIndex(
              calendarTestId.modalActionDrawer.inputApproach,
              index
            )}
            addonBefore={'+'}
          />
        </Form.Item>
        <div className="exercises-settings__items">
          <Form.Item name="weight" label="Вес, кг" labelAlign="left">
            <InputNumber
              data-test-id={getDataTestIdWithIndex(
                calendarTestId.modalActionDrawer.inputWeight,
                index
              )}
              placeholder="0"
            />
          </Form.Item>
          <p>X</p>
          <Form.Item name="replays" label="Количество" labelAlign="left">
            <InputNumber
              data-test-id={getDataTestIdWithIndex(
                calendarTestId.modalActionDrawer.inputQuantity,
                index
              )}
              placeholder="1"
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
