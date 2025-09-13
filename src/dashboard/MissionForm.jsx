import { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import api from "services";
import { Button } from "components";

const MissionForm = ({ onSuccess }) => {
  const [error, setError] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    targets: [{ name: "", country: "", notes: "" }],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    targets: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Target name is required"),
          country: Yup.string().required("Country is required"),
          notes: Yup.string(),
        })
      )
      .min(1, "At least 1 target required")
      .max(3, "Maximum 3 targets allowed"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setError(null);
    api
      .post("missions/", values)
      .then((res) => {
        resetForm();
        if (onSuccess) onSuccess(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data || "Failed to create mission");
      });
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form className="flex flex-col gap-4">
            {/* Mission Title */}
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border rounded"
              />
              {touched.title && errors.title && (
                <div className="text-red-500 text-sm mt-1">{errors.title}</div>
              )}
            </div>

            {/* Mission Description */}
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border rounded"
              />
              {touched.description && errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.description}
                </div>
              )}
            </div>

            {/* Targets */}
            <FieldArray name="targets">
              {(arrayHelpers) => (
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Targets</h3>
                  {values.targets.map((target, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded flex flex-col gap-2 relative"
                    >
                      <input
                        type="text"
                        name={`targets[${index}].name`}
                        placeholder="Target Name"
                        value={target.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border rounded"
                      />
                      {errors.targets?.[index]?.name &&
                        touched.targets?.[index]?.name && (
                          <div className="text-red-500 text-sm">
                            {errors.targets[index].name}
                          </div>
                        )}

                      <input
                        type="text"
                        name={`targets[${index}].country`}
                        placeholder="Country"
                        value={target.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border rounded"
                      />
                      {errors.targets?.[index]?.country &&
                        touched.targets?.[index]?.country && (
                          <div className="text-red-500 text-sm">
                            {errors.targets[index].country}
                          </div>
                        )}

                      <textarea
                        name={`targets[${index}].notes`}
                        placeholder="Notes"
                        value={target.notes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border rounded"
                      />

                      {/* Remove target */}
                      {values.targets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add new target */}
                  {values.targets.length < 3 && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        arrayHelpers.push({ name: "", country: "", notes: "" })
                      }
                    >
                      + Add Target
                    </Button>
                  )}
                </div>
              )}
            </FieldArray>

            <Button type="submit" variant="primary">
              Create Mission
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MissionForm;
