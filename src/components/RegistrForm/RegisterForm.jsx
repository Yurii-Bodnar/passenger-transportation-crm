import { useFormik } from 'formik';
import { Button, Form, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authRegister } from 'redux/auth/authOperation';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 2) {
    errors.name = 'Must be 2 characters or more';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 10) {
    errors.password = 'Must be 10 characters or more';
  }
  return errors;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      console.log(user);
      dispatch(authRegister(user));
      navigate('/login');
    },
  });
  return (
    <div>
      <div className="d-flex justify-content-center flex-column">
        <h2 className="mb-3 d-flex justify-content-center">Register</h2>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-4 d-flex justify-content-center ">
            <Form.Label className="w-50">
              <Form.Control
                id="name"
                type="text"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-4 d-flex justify-content-center ">
            <Form.Label className="w-50">
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-4 d-flex justify-content-center ">
            <Form.Label className="w-50">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </Form.Label>
          </Form.Group>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <p style={{ margin: '0' }}>Do you have an account?</p>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </div>
            <div className="d-grid w-25">
              {(formik.errors.name && formik.touched.name) ||
              (formik.errors.email && formik.touched.email) ||
              (formik.errors.password && formik.touched.password) ? (
                <Button variant="primary" type="submit" disabled>
                  {' '}
                  Register
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  Register
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
