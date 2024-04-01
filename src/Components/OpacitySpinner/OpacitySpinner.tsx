export default function OpacitySpinner({
  children,
  isLoading = false,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <>
      {!isLoading ? (
        <div className="disable-opacity-spinner-loader-container">
          <div className="spinner-loader"></div>
          <div className="opacity-spinner-child">{children}</div>
        </div>
      ) : (
        <div className="opacity-spinner-loader-container">
          <div className="spinner-loader"></div>
          <div className="opacity-spinner-child">{children}</div>
        </div>
      )}
    </>
  );
}
