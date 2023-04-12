import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authLogin } from 'redux/auth/authOperation';
import { selectToken } from 'redux/auth/authSelectors';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectToken);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  console.log('navigate', navigate);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      const user = {
        email: values.email,
        password: values.password,
      };
      console.log(user);
      dispatch(authLogin(user));
    },
  });
  return (
    <div>
      <div className="d-flex justify-content-center flex-column">
        <h2 className="mb-3 d-flex justify-content-center">Login</h2>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-4 d-flex justify-content-center">
            <Form.Label className="w-50">
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-4 d-flex justify-content-center">
            <Form.Label className="w-50">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
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
              <Button variant="primary" type="submit">
                Sign in
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
