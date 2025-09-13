import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "components";
import { createCat } from "@/services/cats";
import axios from "axios";

const CatForm = ({ onSuccess }) => {
  const [error, setError] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/breeds")
      .then((res) => {
        setBreeds(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load breeds");
      })
      .finally(() => setLoadingBreeds(false));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      years_of_experience: "",
      breed: "",
      salary: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      years_of_experience: Yup.number()
        .required("Experience is required")
        .min(0, "Must be positive")
        .max(50, "Seems unrealistic"),
      breed: Yup.string().required("Breed is required"),
      salary: Yup.number()
        .required("Salary is required")
        .min(1, "Salary must be positive"),
    }),
    onSubmit: (values, { resetForm, setErrors }) => {
      setError(null);
      createCat(values)
        .then((res) => {
          resetForm();
          if (onSuccess) onSuccess(res.data);
        })
        .catch((err) => {
          console.error(err);

          if (err.response?.data && typeof err.response.data === "object") {
            setErrors(err.response.data); // assumes { breed: "error msg", ... }
          } else {
            setError(err.response?.data || "Failed to create cat");
          }
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 p-4 border rounded shadow"
    >
      {error && <div className="text-red-500">{error}</div>}

      {/* Name */}
      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>

      {/* Experience */}
      <div>
        <label className="block font-semibold mb-1">Years of Experience</label>
        <input
          type="number"
          name="years_of_experience"
          value={formik.values.years_of_experience}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
        />
        {formik.touched.years_of_experience &&
          formik.errors.years_of_experience && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.years_of_experience}
            </div>
          )}
      </div>

      {/* Breed (Select) */}
      <div>
        <label className="block font-semibold mb-1">Breed</label>
        {loadingBreeds ? (
          <div className="text-gray-500 text-sm">Loading breeds...</div>
        ) : (
          <select
            name="breed"
            value={formik.values.breed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a breed</option>
            {breeds.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        )}
        {formik.touched.breed && formik.errors.breed && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.breed}</div>
        )}
      </div>

      {/* Salary */}
      <div>
        <label className="block font-semibold mb-1">Salary</label>
        <input
          type="number"
          name="salary"
          value={formik.values.salary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border rounded"
        />
        {formik.touched.salary && formik.errors.salary && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.salary}
          </div>
        )}
      </div>

      <Button type="submit" variant="primary">
        Create Cat
      </Button>
    </form>
  );
};

export default CatForm;
