import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authLogin } from 'redux/auth/authOperation';
import { selectToken } from 'redux/auth/authSelectors';

const validate = values => {
  const errors = {};
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectToken);
  const isError = useSelector(state => state.auth.error);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      const user = {
        email: values.email,
        password: values.password,
      };
      console.log(user);
      dispatch(authLogin(user));
      console.log(authLogin(user));
    },
  });
  return (
    <div>
      <div className="d-flex justify-content-center flex-column">
        <h2 className="mb-3 d-flex justify-content-center">Login</h2>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-4 d-flex justify-content-center ">
            <Form.Label className="w-50">
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-4 d-flex justify-content-center position-relative">
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
              <p style={{ margin: '0' }}>Don`t have an account?</p>
              <Nav.Link as={Link} to="/registration">
                Register
              </Nav.Link>
            </div>
            <div className="d-grid w-25">
              {(formik.errors.password && formik.touched.password) ||
              (formik.errors.email && formik.touched.email) ? (
                <Button variant="primary" type="submit" disabled>
                  Sign in
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
