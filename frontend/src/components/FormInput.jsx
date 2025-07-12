const FormInput = ({ label, type, value, onChange, placeholder, error }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
      required
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default FormInput;
