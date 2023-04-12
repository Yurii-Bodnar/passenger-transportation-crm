import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authRegister } from 'redux/auth/authOperation';

//   const validate = values => {
//     const errors = {};
//     if (!values.name) {
//       errors.name = 'Required';
//     } else if (values.name.length > 15) {
//       errors.firstName = 'Must be 15 characters or less';
//     }

//     if (!values.lastName) {
//       errors.lastName = 'Required';
//     } else if (values.lastName.length > 20) {
//       errors.lastName = 'Must be 20 characters or less';
//     }

//     if (!values.email) {
//       errors.email = 'Required';
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//     ) {
//       errors.email = 'Invalid email address';
//     }

//     return errors;
//   };

const RegisterForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: values => {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      console.log(user);
      dispatch(authRegister(user));
    },
  });
  return (
    <div>
      <h2>Register</h2>
      <Form validated={true} onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Form.Label>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
