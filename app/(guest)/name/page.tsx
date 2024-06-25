const { FIRSTNAME, VERSION_NUMBER, SECRET } = process.env;

const NamePage = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-auto">
            <h2 className="text-lg font-semibold mb-4">Environment Variables</h2>
            <p><strong>FIRSTNAME:</strong> {FIRSTNAME}</p>
            <p><strong>VERSION_NUMBER:</strong> {VERSION_NUMBER}</p>
            <p><strong>SECRET:</strong> {SECRET}</p>
        </div>
    )
}

export default NamePage