import { useUserQuery } from "@/service/fetchDataUser.service";

export default function Home() {
  const { data, isLoading, isError } = useUserQuery();

  return (
    <div className="">
      {isLoading ? (
        <div className="">Loading...</div>
      ) : isError ? (
        <div className="">Error while get data from server</div>
      ) : (
        <ul>
          {data?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
