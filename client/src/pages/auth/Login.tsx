import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../utils/providers/authProvider';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password too short').required('Required'),
});

interface LoginValues {
    email: string;
    password: string;
}

export default function Login() {
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const initialValues: LoginValues = { email: '', password: '' };

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center">
                    <img className='w-24' src="/logo.png" alt="" />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800">Welcome back</h2>
                <p className='text-gray-800 text-center'>Enter your credentials to continue</p>
                <p></p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setError(null);
                        try {
                            await login(values.email, values.password);
                            toast.success('Login successfull')
                            navigate('/')
                        } catch (error) {
                            setError('Login failed. Please check your credentials.');
                            toast.error("Login failed. Please check your credentials.")
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                <a href='#' className='text-sm mt-2 text-gray-700 text-center float-right hover:underline'>Forgot password?</a>
                                <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
                            </div>

                            {error && <div className="text-sm text-red-600">{error}</div>}

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="w-5 h-5 mr-2 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                                <p className='text-sm mt-2 text-gray-700 text-center'>Don't have account? <Link to="/auth/register" className='text-blue-600 hover:underline'>Register</Link></p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Toaster
                toastOptions={{
                    position: "top-center"
                }} />
        </div>
    );
}