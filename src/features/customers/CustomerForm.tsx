import { useDispatch } from "react-redux";
import { addNewCustomer, updateExistingCustomer } from "./customerSlice";
import { useImperativeHandle, forwardRef, useState, useEffect } from "react";
import TextField from "../../components/TextField";
import type { AppDispatch } from "../../types/appType";
import type Customer from "../../types/customerType";

export interface CustomerFormHandle {
  submit: () => boolean;
}

interface CustomerFormProps {
  customerToEdit?: Customer;
}

const CustomerForm = forwardRef<CustomerFormHandle, CustomerFormProps>(
  ({ customerToEdit }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [domicile, setDomicile] = useState("");
    const [gender, setGender] = useState<"Pria" | "Wanita">("Pria");
    const [errors, setErrors] = useState({
      name: "",
      domicile: "",
    });

    useEffect(() => {
      if (customerToEdit) {
        setName(customerToEdit.name);
        setDomicile(customerToEdit.domicile);
        setGender(customerToEdit.gender);
      } else {
        setName("");
        setDomicile("");
        setGender("Pria");
      }
    }, [customerToEdit]);

    const validate = () => {
      const newErrors = {
        name: "",
        domicile: "",
      };
      let isValid = true;
      if (!name) {
        newErrors.name = "Name is required";
        isValid = false;
      }
      if (!domicile) {
        newErrors.domicile = "Domicile is required";
        isValid = false;
      }
      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = () => {
      if (!validate()) {
        return false;
      }

      if (customerToEdit) {
        dispatch(
          updateExistingCustomer({
            ...customerToEdit,
            name,
            domicile,
            gender,
          })
        );
      } else {
        dispatch(
          addNewCustomer({
            name,
            domicile,
            gender,
          })
        );
      }
      return true;
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <div className="sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e)}
              error={errors.name}
            />

            <TextField
              label="Domicile"
              name="domicile"
              value={domicile}
              onChange={(e) => setDomicile(e)}
              error={errors.domicile}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-2 flex items-center">
              <input
                id="gender-male"
                name="gender"
                type="radio"
                value="Male"
                checked={gender === "Pria"}
                onChange={() => setGender("Pria")}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="gender-male"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="gender-female"
                name="gender"
                type="radio"
                value="Female"
                checked={gender === "Wanita"}
                onChange={() => setGender("Wanita")}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="gender-female"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Female
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CustomerForm;
