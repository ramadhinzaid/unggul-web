import { useDispatch } from "react-redux";
import { addNewStock, updateExistingStock } from "./stockSlice";
import { useImperativeHandle, forwardRef, useState, useEffect } from "react";
import TextField from "../../components/TextField";
import type { AppDispatch } from "../../types/appType";
import type Stock from "../../types/stockType";

export interface StockFormHandle {
  submit: () => void;
}

interface StockFormProps {
  stockToEdit?: Stock;
}

const StockForm = forwardRef<StockFormHandle, StockFormProps>(
  ({ stockToEdit }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
      if (stockToEdit) {
        setCode(stockToEdit.code);
        setName(stockToEdit.name);
        setCategory(stockToEdit.category);
        setPrice(stockToEdit.price);
      } else {
        setCode("");
        setName("");
        setCategory("");
        setPrice(0);
      }
    }, [stockToEdit]);

    const handleSubmit = () => {
      if (stockToEdit) {
        dispatch(
          updateExistingStock({
            ...stockToEdit,
            code,
            name,
            category,
            price,
          })
        );
      } else {
        dispatch(
          addNewStock({
            code,
            name,
            category,
            price,
          })
        );
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <div className="sm:rounded-md sm:overflow-hidden">
        <div className="bg-white space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <TextField
              label="Code"
              name="code"
              value={code}
              onChange={(e) => setCode(e)}
            />
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e)}
            />

            <TextField
              label="Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e)}
            />

            <TextField
              label="Price"
              name="price"
              value={price.toString()}
              onChange={(e) => setPrice(Number(e))}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default StockForm;
