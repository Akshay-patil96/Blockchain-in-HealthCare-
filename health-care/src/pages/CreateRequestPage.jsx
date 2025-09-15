import React, { useState } from "react";
import UploadRecordsPage from "./UploadRecordsPage";

const CreateRequestPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    disease: "",
    goalAmount: "",
    city: "",
    age: "",
    altNumber: "",
    isPatient: "",
    hospitalName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for specific fields
    if (name === "altNumber" && value.length > 10) return; // max 10 digits
    if (name === "goalAmount" && parseInt(value) < 0) return; // no negative goal
    if (name === "age" && (parseInt(value) < 0 || parseInt(value) > 100)) return; // age 0-100 only


    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error on typing
  };

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.disease) newErrors.disease = "Disease is required";
    if (!formData.goalAmount) newErrors.goalAmount = "Goal Amount is required";
    if (formData.goalAmount && parseInt(formData.goalAmount) < 5000)
      newErrors.goalAmount = "Goal Amount must be at least 5000";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.age) newErrors.age = "Patient Age is required";
    if (!formData.altNumber)
      newErrors.altNumber = "Alternate Number is required";
    if (!formData.isPatient) newErrors.isPatient = "Please select an option";
    if (formData.isPatient && !formData.hospitalName)
      newErrors.hospitalName = "Hospital Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1) {
      if (!validateStep1()) {
        return; // stop if validation fails
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl grid md:grid-cols-2 gap-8">
        
        {/* Left Side Illustration / Image */}
        <div className="flex flex-col justify-center items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
                alt="Fundraiser Illustration"
                className="w-40 h-40 mb-4"
          />
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800">
                Dear {formData.name || "Friend"},
              </h2>
              <p className="text-gray-600 mt-2">
                Let's get your fundraiser started.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800">
                Dear {formData.name || "Friend"},
              </h2>
              <p className="text-gray-600 mt-2">
                Please upload hospital documents
              </p>
            </>
          )}
        </div>

        {/* Right Side Form */}
        <div>
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                  step === 1 ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                1
              </div>
              <div className="w-16 h-[2px] bg-gray-300"></div>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                  step === 2 ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                2
              </div>
            </div>
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4">
                Patient Details
              </h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name*"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    placeholder="Disease*"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  {errors.disease && (
                    <p className="text-red-500 text-sm">{errors.disease}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="goalAmount"
                    value={formData.goalAmount}
                    onChange={handleChange}
                    placeholder="Goal Amount*"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  {errors.goalAmount && (
                    <p className="text-red-500 text-sm">{errors.goalAmount}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City Name*"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Patient Age*"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm">{errors.age}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="altNumber"
                    value={formData.altNumber}
                    onChange={handleChange}
                    placeholder="Alternate Number"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  {errors.altNumber && (
                    <p className="text-red-500 text-sm">{errors.altNumber}</p>
                  )}
                </div>

                {/* Patient Status */}
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="isPatient"
                      value="Admitted"
                      checked={formData.isPatient === "Admitted"}
                      onChange={handleChange}
                    />{" "}
                    Admitted
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isPatient"
                      value="Not Admitted"
                      checked={formData.isPatient === "Not Admitted"}
                      onChange={handleChange}
                    />{" "}
                    Not Admitted
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isPatient"
                      value="Home Treatment"
                      checked={formData.isPatient === "Home Treatment"}
                      onChange={handleChange}
                    />{" "}
                    Under Home treatment
                  </label>
                </div>
                {errors.isPatient && (
                  <p className="text-red-500 text-sm">{errors.isPatient}</p>
                )}

                {/* Conditional Hospital Name Field */}
                {formData.isPatient && (
                  <div>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      placeholder="Hospital Name*"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.hospitalName && (
                      <p className="text-red-500 text-sm">
                        {errors.hospitalName}
                      </p>
                    )}
                  </div>
                )}
              </form>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextStep}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <UploadRecordsPage formData={formData} prevStep={prevStep} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRequestPage;
