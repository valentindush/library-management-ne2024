import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import DataTable from '../components/ui/Table';
import { Column } from '../components/ui/types';
import { Button, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { FaSpinner } from 'react-icons/fa';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
}

// Sample employee data
const employees: Employee[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 32, email: 'john@example.com', phone: '555-1234', address: '123 Main St' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 28, email: 'jane@example.com', phone: '555-5678', address: '456 Oak Ave' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 45, email: 'bob@example.com', phone: '555-9012', address: '789 Elm Rd' },
];

const colums: Column[] = [
  { key: "id", header: "Id", sortable: true },
  { key: "firstName", header: "First Name", sortable: true },
  { key: "lastName", header: "Last Name", sortable: true },
  { key: "age", header: "Age", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "phone", header: "Phone", sortable: true },
  { key: "address", header: "Address", sortable: true },
]

interface FormValues {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: string;
}


const EmployeesPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState("")

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    address: '',
    age: 0,
    email: '',
    phone: ''
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Name must be at least three characters")
      .max(50, "Name is too long")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Name must be at least three characters")
      .max(50, "Name is too long")
      .required("Last name is required"),
    age: Yup.number().required("Age is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Invalid phone number format")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  return (
    <div>
      <div className="pb-4 flex items-center justify-between">
        <h2 className='text-xl font-bold text-gray-800'>Employees</h2>
        <Button onClick={open} leftSection={<IconPlus size={14} />} variant='filled'>Add new</Button>
      </div>
      <div className="">
        <DataTable
          data={employees}
          columns={colums}
          pagination={{
            limit: 10,
            page: 1,
          }}
        />
      </div>
      <Modal centered size={"lg"} opened={opened} onClose={close} title="New Employee">
        <div className="p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => { }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-sm text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <Field
                      type="number"
                      name="age"
                      placeholder="Enter age"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage name="age" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage name="phone" component="div" className="text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <Field
                      type="text"
                      name="address"
                      placeholder="Enter address"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage name="address" component="div" className="text-sm text-red-600" />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeesPage;