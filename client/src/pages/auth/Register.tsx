import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../utils/providers/authProvider';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password too short').required('Required'),
    role: Yup.string().oneOf(['ADMIN', 'USER']).required('Required'),
});

interface RegisterValues {
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
}

export default function Register() {
    const { register } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const initialValues: RegisterValues = {email: '', password: '', role: 'USER' };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Create an account</h2>
                <p className='text-gray-800 text-center'>Enter your details to register</p>
                <p></p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setError(null);
                        try {
                            await register(values.email, values.password, values.role);
                            toast.success('Registration successful');
                            navigate('/');
                        } catch (error: any) {
                            toast.error(error.message)
                            setError(error.message);
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
                                <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <Field
                                    as="select"
                                    name="role"
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </Field>
                                <ErrorMessage name="role" component="div" className="text-sm text-red-600" />
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
                                            Registering...
                                        </>
                                    ) : (
                                        'Register'
                                    )}
                                </button>
                                <p className='text-sm mt-2 text-gray-700 text-center'>
                                    Already have an account? <Link to="/auth/login" className='text-blue-600 hover:underline'>Login</Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Toaster
                toastOptions={{
                    position: "top-center"
                }}
            />
        </div>
    );
}