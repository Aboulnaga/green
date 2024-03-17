export type FormErrorType = {
  error: string;
  path: string;
}[];
export default function FormErrorMsg({
  userClass,
  errors,
  path,
}: {
  userClass: string;
  errors: FormErrorType | false;
  path: string;
}) {
  const mapErrors = (errors: FormErrorType) => {
    return errors.map(error => {
      if (error.path === path) {
        return (
          <div key={error.error} className={`${userClass} form-error`}>
            <p>{error.error}</p>

            <div className="form-error-icon">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.57465 2.21667L1.51632 14C1.37079 14.252 1.29379 14.5378 1.29298 14.8288C1.29216 15.1198 1.36756 15.4059 1.51167 15.6588C1.65579 15.9116 1.86359 16.1223 2.11441 16.2699C2.36523 16.4175 2.65032 16.4968 2.94132 16.5H17.058C17.349 16.4968 17.6341 16.4175 17.8849 16.2699C18.1357 16.1223 18.3435 15.9116 18.4876 15.6588C18.6317 15.4059 18.7071 15.1198 18.7063 14.8288C18.7055 14.5378 18.6285 14.252 18.483 14L11.4247 2.21667C11.2761 1.97176 11.0669 1.76927 10.8173 1.62874C10.5677 1.48821 10.2861 1.41438 9.99965 1.41438C9.71321 1.41438 9.43159 1.48821 9.18199 1.62874C8.93238 1.76927 8.72321 1.97176 8.57465 2.21667V2.21667Z"
                  stroke="#EA4B48"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 6.5V9.83333"
                  stroke="#EA4B48"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 13.1667H10.0083"
                  stroke="#EA4B48"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        );
      }
    });
  };
  return <>{errors && mapErrors(errors)}</>;
}
