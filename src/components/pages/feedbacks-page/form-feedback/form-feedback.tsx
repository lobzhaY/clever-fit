import { useEffect } from 'react';

import { Form, Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { changeFormValidate } from '../../../../redux';

import { PostFeedbackType, requiredRule, FeedbackFormText } from '../../../../constants';

import './form-feedback.scss';

export const FormFeedbackComponent: React.FC<{
  submitFeedback: (val: PostFeedbackType) => void;
}> = ({ submitFeedback }) => {
  const { isOpen, repeatFeedback } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = () => {
    const val = form.getFieldsValue();
    if (!val.rating) {
      val.rating = 0;
    }
    submitFeedback(val);
  };

  useEffect(() => {
    if (isOpen && repeatFeedback.isRepeat) {
      form.setFieldsValue({
        ...repeatFeedback.repeatVal,
      });
    }
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form, repeatFeedback.isRepeat, repeatFeedback.repeatVal]);

  const checkDisabledField = () => {
    form
      .validateFields(['rating'])
      .then(() => {
        dispatch(changeFormValidate({ formValidate: false }));
      })
      .catch(() => {
        dispatch(changeFormValidate({ formValidate: true }));
      });
  };

  return (
    <div className="form-feedback-content">
      <Form
        form={form}
        name="feedback"
        onFieldsChange={onFinish}
        validateTrigger={['onChange']}
        className="form">
        <FormItem
          className="rate"
          name="rating"
          rules={[requiredRule]}
          validateTrigger={['onChange']}>
          <Rate
            onChange={checkDisabledField}
            character={({ index = 0 }) =>
              index <= form.getFieldValue(['rating']) - 1 ? <StarFilled /> : <StarOutlined />
            }
          />
        </FormItem>

        <Form.Item className="text-area" name="message" validateTrigger={['onChange']}>
          <TextArea placeholder={FeedbackFormText.placeholder} rows={2} />
        </Form.Item>
      </Form>
    </div>
  );
};
