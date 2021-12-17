import { FormInstance, Form, Modal } from 'antd';
import { useRef, useEffect } from 'react';

interface ModalFormProps {
  title: string;
  visible: boolean;
  onSubmit: (values: any) => void;
  onSubmitFailed?: (values: any) => void;
  onCancel: (error: any) => void;
  items: ModalFormItem[];
  okButtonTitle?: string;
  cancelButtonTitle?: string;
}
interface ModalFormItem {
  name: string;
  label: string;
  rules?: any;
  child: JSX.Element;
}

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }: { form: FormInstance; visible: boolean }) => {
  const prevVisibleRef = useRef<boolean>();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const ModalForm: React.FC<ModalFormProps> = ({ title, visible, onSubmit, onCancel, onSubmitFailed, items, okButtonTitle, cancelButtonTitle }) => {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onDone = () => {
    form.submit();
  };

  return (
    <Modal title={title} visible={visible} onOk={onDone} onCancel={onCancel} okText={okButtonTitle ? okButtonTitle : 'OK'} cancelText={cancelButtonTitle ? cancelButtonTitle : 'Cancel'}>
      <Form form={form} layout='vertical' name='userForm' onFinish={onSubmit} onFinishFailed={onSubmitFailed}>
        {items.map((item: ModalFormItem) => {
          return (
            <Form.Item name={item.name} label={item.label} rules={item.rules}>
              {item.child}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default ModalForm;
