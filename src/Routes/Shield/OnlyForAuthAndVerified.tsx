import useQueryCurrentUser from "../../Hooks/useQueryCurrentUser";
export default function OnlyForAuthAndVerified({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: currentUser } = useQueryCurrentUser();
  const isVerified = currentUser?.is_verified;

  return (
    <>
      {isVerified ? (
        children
      ) : (
        <div>
          <p> Private area </p>
        </div>
      )}
    </>
  );
}
