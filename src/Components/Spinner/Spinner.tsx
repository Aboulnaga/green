export default function Spinner({
  children,
  isLoading = false,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <>
      {!isLoading ? (
        children
      ) : (
        <div className="spinner-loader-container">
          <div className="spinner-loader"></div>
        </div>
      )}
    </>
  );
}
